import { useEffect } from "react";
import type { UnsafeWindow } from "../types/unsafe-window";

export default function ToastCDN() {
  useEffect(() => {
    const cssId = "toastui-css";
    const jsId = "toastui-js";

    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href =
        "https://uicdn.toast.com/editor/latest/toastui-editor.min.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById(jsId)) {
      const script = document.createElement("script");
      script.id = jsId;
      script.src =
        "https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js";
      script.onload = initToast;
      document.body.appendChild(script);
    } else {
      initToast();
    }

    function initToast() {
      const w = window as UnsafeWindow;
      const ToastEditorConstructor = w.toastui?.Editor as
        | (new (args: Record<string, unknown>) => unknown)
        | undefined;

      if (ToastEditorConstructor) {
        new ToastEditorConstructor({
          el: document.querySelector("#toast-editor") as HTMLElement,
          height: "500px",
          initialEditType: "wysiwyg",
          previewStyle: "vertical",
        });
      }
    }

    return () => {
      const wrapper = document.querySelector("#toast-editor");
      if (wrapper) wrapper.innerHTML = "";
    };
  }, []);

  return <div id="toast-editor" aria-label="TOAST UI Editor" />;
}
