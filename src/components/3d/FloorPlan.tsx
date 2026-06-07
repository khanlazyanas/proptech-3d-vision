"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Grid } from "@react-three/drei";

export default function FloorPlan() {
  const { wallColor, floorTexture, plotSize, showRoof, layoutType } = useEditorStore();

  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  const bedRoomEnd = -(length / 2) + (length * 0.35); 
  const kitchenEnd = bedRoomEnd + (length * 0.30);    

  const getFloorMaterial = () => {
    switch (floorTexture) {
      case "wood": return { color: "#8b5a2b", roughness: 0.85, metalness: 0.1 };
      case "concrete": return { color: "#6b7280", roughness: 0.7, metalness: 0.2 };
      case "marble": default: return { color: "#f1f5f9", roughness: 0.15, metalness: 0.25 };
    }
  };
  const floorMat = getFloorMaterial();

  return (
    <group>
      <Grid position={[0, -0.49, 0]} args={[width + 40, length + 40]} cellSize={1} cellThickness={1} cellColor="#cbd5e1" sectionSize={5} sectionThickness={1.5} sectionColor="#6366f1" fadeDistance={Math.max(width, length) + 40} />

      {/* Main Floor Slab */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[width, 1, length]} />
        <meshStandardMaterial {...floorMat} />
      </mesh>

      {/* Roof */}
      {showRoof && (
        <mesh castShadow receiveShadow position={[0, 6.2, 0]}>
          <boxGeometry args={[width + 1, 0.4, length + 1]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
        </mesh>
      )}

      {/* BOUNDARY WALLS */}
      <mesh castShadow receiveShadow position={[-width / 2 + 0.25, 3, 0]}><boxGeometry args={[0.5, 6, length]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>
      <mesh castShadow receiveShadow position={[width / 2 - 0.25, 3, 0]}><boxGeometry args={[0.5, 6, length]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>
      <mesh castShadow receiveShadow position={[0, 3, -length / 2 + 0.25]}><boxGeometry args={[width, 6, 0.5]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>
      <mesh castShadow receiveShadow position={[-width * 0.15, 3, length / 2 - 0.25]}><boxGeometry args={[width * 0.7, 6, 0.5]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>

      {/* ================= DYNAMIC LAYOUT ENGINE ================= */}
      
      {/* Show these dividers ONLY if NOT a Studio */}
      {layoutType !== 'studio' && (
        <>
          <mesh castShadow receiveShadow position={[width * 0.15, 3, bedRoomEnd]}><boxGeometry args={[width * 0.7, 6, 0.4]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>
          <mesh castShadow receiveShadow position={[-width * 0.15, 3, kitchenEnd]}><boxGeometry args={[width * 0.7, 6, 0.4]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>
        </>
      )}

      {/* 2 BHK Feature: Split the bedroom zone in half vertically */}
      {layoutType === '2bhk' && (
        <mesh castShadow receiveShadow position={[0, 3, -(length / 2) + (length * 0.35) / 2]}>
          <boxGeometry args={[0.4, 6, length * 0.35]} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
      )}

      {/* Bathroom Partition (Present in all layouts, but anchored properly) */}
      <group position={[-width / 2 + (width * 0.3), 0, -length / 2 + (length * 0.15)]}>
        <mesh castShadow receiveShadow position={[0, 3, length * 0.075]}><boxGeometry args={[width * 0.3, 6, 0.3]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>
        <mesh castShadow receiveShadow position={[width * 0.15, 3, -length * 0.075]}><boxGeometry args={[0.3, 6, length * 0.15]} /><meshStandardMaterial color={wallColor} roughness={0.9} /></mesh>
      </group>
    </group>
  );
}