import CanvasWrapper from "@/components/3d/CanvasWrapper";
import Sidebar from "@/components/editor/Sidebar";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden flex bg-gray-50 font-sans">
      {/* 3D Viewer Area - Takes remaining space */}
      <div className="flex-1 h-full relative cursor-grab active:cursor-grabbing">
        {/* Floating Header */}
        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            NexProp 3D
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Interactive Architectural Planner</p>
        </div>
        
        {/* Core WebGL Render */}
        <CanvasWrapper />
      </div>

      {/* Editor Sidebar */}
      <Sidebar />
    </main>
  );
}