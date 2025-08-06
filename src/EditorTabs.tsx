import { useState } from "react";
import TinyCDN from "./editors/TinyCDN";
import ToastCDN from "./editors/ToastCDN";
import EditorJSCDN from "./editors/EditorjsCDN";

const tabs = ["tiny", "toast", "editorjs"] as const;
type TabType = (typeof tabs)[number];

export default function EditorTabs() {
  const [selectedTab, setSelectedTab] = useState<TabType>("tiny");

  return (
    <div className="p-4">
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded ${
              selectedTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="border rounded p-4">
        {selectedTab === "tiny" && <TinyCDN key="tiny" />}
        {selectedTab === "toast" && <ToastCDN key="toast" />}
        {selectedTab === "editorjs" && <EditorJSCDN key="editorjs" />}
      </div>
    </div>
  );
}
