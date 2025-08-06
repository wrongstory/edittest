import { useEffect } from "react";
import type { UnsafeWindow } from "../types/unsafe-window";

export default function TinyCDN() {
  useEffect(() => {
    const scriptId = "tinymce-cdn";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://cdn.tiny.cloud/1/jb1mj3hs7c195leqdf517l3e727902xim88ty3xuzsucbttl/tinymce/6/tinymce.min.js";
      script.referrerPolicy = "origin";
      script.onload = initTiny;
      document.body.appendChild(script);
    } else {
      initTiny();
    }

    function initTiny() {
      const w = window as UnsafeWindow;
      if (w.tinymce?.get("tiny-editor")) {
        w.tinymce.remove("#tiny-editor");
      }
      w.tinymce?.init({
        selector: "#tiny-editor",
        height: 500,
        plugins: "image code codesample link lists table",
        toolbar:
          "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code codesample",
        codesample_languages: [
          { text: "HTML/XML", value: "markup" },
          { text: "JavaScript", value: "javascript" },
          { text: "TypeScript", value: "typescript" },
          { text: "CSS", value: "css" },
          { text: "Python", value: "python" },
          { text: "Java", value: "java" },
        ],
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        content_style: `
            pre[class*="language-"] {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 1em;
            border-radius: 6px;
            overflow: auto;
            }
        `,
      });
    }

    return () => {
      const w = window as UnsafeWindow;
      if (w.tinymce?.get("tiny-editor")) {
        w.tinymce.remove("#tiny-editor");
      }

      const container = document.querySelector(".tinymce-container");
      if (container) {
        container.innerHTML = `
          <textarea id="tiny-editor" aria-label="TinyMCE Editor" class="min-h-[300px] border border-gray-300 p-2 rounded-md"></textarea>
        `;
      }
    };
  }, []);

  return (
    <div className="tinymce-container">
      <textarea
        id="tiny-editor"
        aria-label="TinyMCE Editor"
        className="min-h-[300px] border border-gray-300 p-2 rounded-md"
      />
    </div>
  );
}
