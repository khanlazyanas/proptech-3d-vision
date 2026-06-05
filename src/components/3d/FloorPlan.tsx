"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Grid } from "@react-three/drei";

export default function FloorPlan() {
  const { wallColor, floorTexture } = useEditorStore();

  // Function to simulate real materials using physics properties
  const getFloorMaterial = () => {
    switch (floorTexture) {
      case "wood":
        return { color: "#8b5a2b", roughness: 0.9, metalness: 0.1 };
      case "concrete":
        return { color: "#7a7a7a", roughness: 0.8, metalness: 0.2 };
      case "marble":
      default:
        return { color: "#f8f9fa", roughness: 0.1, metalness: 0.3 }; // Smooth & slightly reflective
    }
  };

  const floorMat = getFloorMaterial();

  return (
    <group>
      {/* 3D Blueprint Grid - Professional Architectural Touch */}
      <Grid 
        position={[0, -0.49, 0]} 
        args={[20, 70]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#6b7280" 
        sectionSize={5} 
        sectionThickness={1.5} 
        sectionColor="#4f46e5" 
        fadeDistance={50} 
        fadeStrength={1} 
      />

      {/* Base Plot (Floor) */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[20, 1, 70]} />
        <meshStandardMaterial 
          color={floorMat.color} 
          roughness={floorMat.roughness} 
          metalness={floorMat.metalness} 
        />
      </mesh>

      {/* Sample Wall */}
      <mesh castShadow receiveShadow position={[0, 2.5, -34]}>
        <boxGeometry args={[20, 5, 2]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
    </group>
  );
}