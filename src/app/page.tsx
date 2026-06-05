import CanvasWrapper from "@/components/3d/CanvasWrapper";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden flex relative">
      {/* 3D Viewer Area - Takes full screen for now */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        {/* Absolute position UI overlay yahan aayega future mein */}
        <div className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">NexProp 3D</h1>
          <p className="text-sm text-gray-500 font-medium">Interactive Floor Plan (20x70 ft)</p>
        </div>
        
        {/* Core WebGL Render */}
        <CanvasWrapper />
      </div>
    </main>
  );
}