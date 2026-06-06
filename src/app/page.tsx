import CanvasWrapper from "@/components/3d/CanvasWrapper";
import Sidebar from "@/components/editor/Sidebar";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden flex flex-col md:flex-row bg-gray-50 font-sans">
      
      {/* 3D Viewer Area */}
      <div className="w-full h-[50vh] md:h-full md:flex-1 relative cursor-grab active:cursor-grabbing shrink-0">
        
        {/* Floating Header with Dashboard Link */}
        <div className="absolute top-4 left-4 right-4 md:right-auto md:top-6 md:left-6 z-10 flex items-center justify-between gap-4">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-4 rounded-xl shadow-lg border border-gray-100 flex-1 md:flex-none">
            <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
              NexProp 3D
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-1 hidden md:block">
              Interactive Architectural Planner
            </p>
          </div>
          
          {/* Dashboard Navigation Button */}
          <Link 
            href="/dashboard"
            className="bg-white/90 backdrop-blur-md p-3 md:px-5 md:py-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            <LayoutDashboard className="w-5 h-5 text-indigo-600" />
            <span className="hidden md:inline">View Dashboard</span>
          </Link>
        </div>
        
        <CanvasWrapper />
      </div>

      <Sidebar />
    </main>
  );
}