import CanvasWrapper from "@/components/3d/CanvasWrapper";
import Sidebar from "@/components/editor/Sidebar";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden flex flex-col md:flex-row bg-gray-50 font-sans">
      
      {/* 3D Viewer Area - Top on Mobile (50vh), Left on Desktop (Takes remaining space) */}
      <div className="w-full h-[50vh] md:h-full md:flex-1 relative cursor-grab active:cursor-grabbing shrink-0">
        
        {/* Floating Header - Responsive Padding */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-4 rounded-xl shadow-lg border border-gray-100">
          <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            NexProp 3D
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-medium mt-1 hidden md:block">
            Interactive Architectural Planner
          </p>
        </div>
        
        {/* Core WebGL Render */}
        <CanvasWrapper />
      </div>

      {/* Editor Sidebar - Bottom on Mobile (50vh), Right on Desktop (Fixed Width) */}
      <Sidebar />
    </main>
  );
}