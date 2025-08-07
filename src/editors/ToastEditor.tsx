import { useEffect, useRef } from "react";
import Editor from "@toast-ui/editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";

type EditorOptions = ConstructorParameters<typeof Editor>[0];

export default function ToastEditor() {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      const options: EditorOptions = {
        el: editorContainerRef.current,
        height: "500px",
        initialEditType: "wysiwyg",
        previewStyle: "vertical",
        plugins: [colorSyntax],
      };

      editorInstanceRef.current = new Editor(options);
    }

    return () => {
      editorInstanceRef.current?.destroy();
      editorInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={editorContainerRef}
      className="toast-editor-wrapper"
      aria-label="TOAST UI Editor"
    />
  );
}
