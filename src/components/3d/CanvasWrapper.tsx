"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import FloorPlan from "./FloorPlan";
import { Suspense } from "react";

export default function CanvasWrapper() {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50">
      <Canvas
        shadows
        // Camera ko isometric angle ke liye set kiya hai
        camera={{ position: [40, 40, 40], fov: 35 }} 
      >
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[20, 30, 10]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
          />
          <Environment preset="city" /> {/* Professional reflection maps */}

          {/* Core 3D Model */}
          <FloorPlan />

          {/* Shadows niche zameen par aayengi */}
          <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={100} blur={2} />

          {/* Mouse se zoom aur rotate karne ke controls */}
          <OrbitControls 
            makeDefault 
            maxPolarAngle={Math.PI / 2 - 0.05} // Zameen ke niche dekhna block kiya hai
            minDistance={20}
            maxDistance={150}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}