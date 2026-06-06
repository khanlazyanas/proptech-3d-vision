"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import FloorPlan from "./FloorPlan";
import Furniture from "./Furniture"; 
import Kitchen from "./Kitchen";       // Naya import
import LivingRoom from "./LivingRoom"; // Naya import
import { Suspense } from "react";

export default function CanvasWrapper() {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50">
      <Canvas
        shadows
        camera={{ position: [50, 50, 50], fov: 35 }} 
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[20, 40, 20]}
            intensity={1.5}
            shadow-mapSize={[2048, 2048]} // Ultra-high shadow resolution
          />
          <Environment preset="city" />

          {/* House Architecture & Interiors */}
          <FloorPlan />
          <Furniture />    {/* Master Bedroom */}
          <Kitchen />      {/* Modular Kitchen */}
          <LivingRoom />   {/* Luxury Living Space */}

          {/* Professional Soft Shadows */}
          <ContactShadows position={[0, -0.48, 0]} opacity={0.7} scale={120} blur={2.5} />

          <OrbitControls 
            makeDefault 
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={20}
            maxDistance={200}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}