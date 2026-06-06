"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Grid } from "@react-three/drei";

export default function FloorPlan() {
  const { wallColor, floorTexture } = useEditorStore();

  const getFloorMaterial = () => {
    switch (floorTexture) {
      case "wood":
        return { color: "#8b5a2b", roughness: 0.85, metalness: 0.1 };
      case "concrete":
        return { color: "#6b7280", roughness: 0.7, metalness: 0.2 };
      case "marble":
      default:
        return { color: "#f1f5f9", roughness: 0.15, metalness: 0.25 };
    }
  };

  const floorMat = getFloorMaterial();

  return (
    <group>
      {/* Premium Blueprint Grid */}
      <Grid 
        position={[0, -0.49, 0]} 
        args={[30, 80]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#cbd5e1" 
        sectionSize={5} 
        sectionThickness={1.5} 
        sectionColor="#6366f1" 
        fadeDistance={60} 
      />

      {/* 20x70 Main Plot Floor */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[20, 1, 70]} />
        <meshStandardMaterial 
          color={floorMat.color} 
          roughness={floorMat.roughness} 
          metalness={floorMat.metalness} 
        />
      </mesh>

      {/* ================= EXTRA PROFESSIONAL WALLS LAYOUT ================= */}
      {/* Outer Boundary Wall - Left (Length 70, Thickness 0.5, Height 6) */}
      <mesh castShadow receiveShadow position={[-9.75, 3, 0]}>
        <boxGeometry args={[0.5, 6, 70]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Outer Boundary Wall - Right */}
      <mesh castShadow receiveShadow position={[9.75, 3, 0]}>
        <boxGeometry args={[0.5, 6, 70]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Outer Boundary Wall - Back */}
      <mesh castShadow receiveShadow position={[0, 3, -34.75]}>
        <boxGeometry args={[20, 6, 0.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Outer Boundary Wall - Front (With Space for Entrance Door) */}
      <mesh castShadow receiveShadow position={[-4, 3, 34.75]}>
        <boxGeometry args={[12, 6, 0.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* INSIDE PARTITIONS (Making Real Rooms) */}
      
      {/* 1. Master Bedroom Partition Wall (At the back, Z = -15) */}
      <mesh castShadow receiveShadow position={[2, 3, -15]}>
        <boxGeometry args={[16, 6, 0.4]} /> {/* Left space open for door entrance */}
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* 2. Kitchen & Living Room Divider Wall (Z = 10) */}
      <mesh castShadow receiveShadow position={[-3, 3, 10]}>
        <boxGeometry args={[14, 6, 0.4]} /> {/* Right side kept open for modern open-kitchen look */}
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
    </group>
  );
}