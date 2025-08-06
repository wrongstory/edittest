export type UnsafeWindow = typeof window & {
  ClassicEditor?: {
    create: (
      el: HTMLElement,
      config?: Record<string, unknown>
    ) => Promise<unknown>;
  };
  toastui?: {
    Editor: new (args: {
      el: HTMLElement;
      height?: string;
      initialEditType?: string;
      previewStyle?: string;
      [key: string]: unknown;
    }) => unknown;
  };
  tinymce?: {
    init: (config: Record<string, unknown>) => void;
    get: (id: string) => unknown;
    remove: (selectorOrInstance: string | unknown) => void;
  };
  EditorJS?: new (config: Record<string, unknown>) => unknown;

  CodeTool?: unknown;
  ImageTool?: unknown;
  Prism?: {
    highlightAll: () => void;
  };
};
