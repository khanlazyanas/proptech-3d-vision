"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import FloorPlan from "./FloorPlan";
import Furniture from "./Furniture"; // Import the new Furniture component
import { Suspense } from "react";

export default function CanvasWrapper() {
  return (
    <div className="w-full h-full min-h-screen bg-gray-50">
      <Canvas
        shadows
        camera={{ position: [40, 40, 40], fov: 35 }} 
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[20, 30, 10]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
          />
          <Environment preset="city" />

          {/* Core 3D Models */}
          <FloorPlan />
          <Furniture /> {/* Added furniture to the scene */}

          <ContactShadows position={[0, -0.48, 0]} opacity={0.6} scale={100} blur={2.5} />

          <OrbitControls 
            makeDefault 
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={20}
            maxDistance={150}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}