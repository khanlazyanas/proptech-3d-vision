"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import FloorPlan from "./FloorPlan";
import Interiors from "./Interiors"; // NAYA MASTER ENGINE IMPORT KIYA
import Toolbar from "./Toolbar"; 
import { useEditorStore } from "@/store/useEditorStore";
import { Suspense } from "react";

export default function CanvasWrapper() {
  const { lightingTheme } = useEditorStore();

  return (
    <div className={`w-full h-full min-h-screen transition-colors duration-700 ${lightingTheme === 'night' ? 'bg-slate-900' : 'bg-gray-50'}`}>
      
      {/* Floating Toolbar Overlay */}
      <Toolbar />

      <Canvas
        shadows
        // IMPORTANT: Ye export/download feature ko enable karta hai
        gl={{ preserveDrawingBuffer: true, antialias: true }} 
        camera={{ position: [0, 60, 80], fov: 40 }} // Camera angle better view ke liye set kiya hai
      >
        {/* Dynamic Background Color based on Theme */}
        <color attach="background" args={[lightingTheme === 'night' ? '#0f172a' : '#f8fafc']} />

        <Suspense fallback={null}>
          {/* Dynamic Cinematic Lighting */}
          <ambientLight intensity={lightingTheme === 'night' ? 0.1 : 0.6} />
          
          {lightingTheme === 'day' && (
            <directionalLight
              castShadow
              position={[30, 50, 20]}
              intensity={1.5}
              shadow-mapSize={[2048, 2048]}
              shadow-camera-far={100}
              shadow-camera-left={-50}
              shadow-camera-right={50}
              shadow-camera-top={50}
              shadow-camera-bottom={-50}
            />
          )}

          <Environment preset={lightingTheme === 'night' ? 'night' : 'city'} />

          {/* ==================================================== */}
          {/* THE UNIFIED ARCHITECTURE & INTERIORS */}
          {/* Purane 4 files hata kar ab sirf ye do files hain */}
          <FloorPlan />
          <Interiors />
          {/* ==================================================== */}

          {/* Shadows */}
          <ContactShadows 
            position={[0, -0.48, 0]} 
            opacity={lightingTheme === 'night' ? 0.9 : 0.7} 
            scale={150} 
            blur={2.5} 
            color={lightingTheme === 'night' ? '#000000' : '#333333'}
          />

          <OrbitControls 
            makeDefault 
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={20}
            maxDistance={250}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}