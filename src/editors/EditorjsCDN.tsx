import { useEffect, useRef } from "react";
import type { UnsafeWindow } from "../types/unsafe-window";

// 👉 직접 명시적으로 타입 선언 (CDN 기반이므로 전역 EditorJS 사용)
type EditorInstance = {
  isReady: Promise<void>;
  destroy?: () => void;
  save: () => Promise<unknown>;
};

export default function EditorJSCDN() {
  const editorRef = useRef<EditorInstance | null>(null);

  useEffect(() => {
    const editorScript = document.createElement("script");
    editorScript.src = "https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest";
    document.body.appendChild(editorScript);

    const codeToolScript = document.createElement("script");
    codeToolScript.src = "https://cdn.jsdelivr.net/npm/@editorjs/code@2.9.0";
    document.body.appendChild(codeToolScript);

    const imageToolScript = document.createElement("script");
    imageToolScript.src = "https://cdn.jsdelivr.net/npm/@editorjs/image@2.8.1";
    document.body.appendChild(imageToolScript);

    const interval = setInterval(() => {
      const w = window as UnsafeWindow;

      if (
        w.EditorJS &&
        w.CodeTool &&
        w.ImageTool &&
        document.querySelector("#editorjs-container")
      ) {
        clearInterval(interval);

        const EditorJSConstructor = w.EditorJS as new (
          config: Record<string, unknown>
        ) => EditorInstance;

        const editor = new EditorJSConstructor({
          holder: "editorjs-container",
          autofocus: true,
          tools: {
            code: w.CodeTool,
            image: {
              class: w.ImageTool,
              config: {
                uploader: {
                  uploadByFile(file: File) {
                    return new Promise((resolve) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        resolve({
                          success: 1,
                          file: {
                            url: reader.result,
                          },
                        });
                      };
                      reader.readAsDataURL(file);
                    });
                  },
                  uploadByUrl(url: string) {
                    return Promise.resolve({
                      success: 1,
                      file: {
                        url,
                      },
                    });
                  },
                },
              },
            },
          },
        });

        editorRef.current = editor;

        editor.isReady
          .then(() => {
            console.log("Editor.js is ready.");
          })
          .catch((error) => {
            console.error("Editor.js initialization failed:", error);
          });
      }
    }, 300);

    return () => {
      clearInterval(interval);
      editorRef.current?.destroy?.();
      const container = document.querySelector("#editorjs-container");
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div
      id="editorjs-container"
      className="min-h-[300px] border border-gray-300 p-2"
    />
  );
}
