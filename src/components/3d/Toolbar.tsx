"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Download, Moon, Sun, Home } from "lucide-react"; // Home icon add kiya
import toast from "react-hot-toast";

export default function Toolbar() {
  const { lightingTheme, setLightingTheme, showRoof, setShowRoof } = useEditorStore();

  const handleDownloadRender = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return toast.error("Canvas not found!");
    try {
      const imageURL = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = `NexProp-Render-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("HD Render Downloaded!");
    } catch (error) {
      toast.error("Failed to export render.");
    }
  };

  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-3">
      
      {/* NAYA: Roof Toggle Button */}
      <button
        onClick={() => setShowRoof(!showRoof)}
        className={`backdrop-blur-md p-3 rounded-xl shadow-lg border transition-colors flex items-center justify-center ${showRoof ? 'bg-indigo-100 border-indigo-300' : 'bg-white/90 border-gray-100 hover:bg-gray-50'}`}
        title="Toggle Roof"
      >
        <Home className={`w-5 h-5 ${showRoof ? 'text-indigo-700' : 'text-gray-700'}`} />
      </button>

      {/* Day / Night Toggle */}
      <button
        onClick={() => setLightingTheme(lightingTheme === 'day' ? 'night' : 'day')}
        className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center"
        title="Toggle Lighting"
      >
        {lightingTheme === 'day' ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-amber-500" />}
      </button>

      {/* Download Render */}
      <button
        onClick={handleDownloadRender}
        className="bg-indigo-600/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-indigo-500 hover:bg-indigo-700 transition-colors text-white font-medium flex items-center gap-2"
      >
        <Download className="w-5 h-5" />
        <span className="hidden md:inline text-sm">Download Render</span>
      </button>
    </div>
  );
}