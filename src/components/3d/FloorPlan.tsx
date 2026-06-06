"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Grid } from "@react-three/drei";

export default function FloorPlan() {
  const { wallColor, floorTexture, plotSize } = useEditorStore();

  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  // Mathematical Room Zones (Length division)
  const bedRoomEnd = -(length / 2) + (length * 0.35); // 35% space from back
  const kitchenEnd = bedRoomEnd + (length * 0.30);    // Next 30% space

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
      <Grid 
        position={[0, -0.49, 0]} args={[width + 40, length + 40]} 
        cellSize={1} cellThickness={1} cellColor="#cbd5e1" 
        sectionSize={5} sectionThickness={1.5} sectionColor="#6366f1" 
        fadeDistance={Math.max(width, length) + 40} 
      />

      {/* Main Floor Slab */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[width, 1, length]} />
        <meshStandardMaterial {...floorMat} />
      </mesh>

      {/* ================= 1. BOUNDARY WALLS ================= */}
      {/* Left Wall */}
      <mesh castShadow receiveShadow position={[-width / 2 + 0.25, 3, 0]}>
        <boxGeometry args={[0.5, 6, length]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      {/* Right Wall */}
      <mesh castShadow receiveShadow position={[width / 2 - 0.25, 3, 0]}>
        <boxGeometry args={[0.5, 6, length]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      {/* Back Wall */}
      <mesh castShadow receiveShadow position={[0, 3, -length / 2 + 0.25]}>
        <boxGeometry args={[width, 6, 0.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      {/* Front Wall with Entrance */}
      <mesh castShadow receiveShadow position={[-width * 0.15, 3, length / 2 - 0.25]}>
        <boxGeometry args={[width * 0.7, 6, 0.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* ================= 2. DYNAMIC INTERIOR PARTITIONS ================= */}
      
      {/* Partition 1: Bedroom & Kitchen Divider (With Door Gap on Left) */}
      <mesh castShadow receiveShadow position={[width * 0.15, 3, bedRoomEnd]}>
        <boxGeometry args={[width * 0.7, 6, 0.4]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>

      {/* Partition 2: Kitchen & Living Room Divider (With Door Gap on Right) */}
      <mesh castShadow receiveShadow position={[-width * 0.15, 3, kitchenEnd]}>
        <boxGeometry args={[width * 0.7, 6, 0.4]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
    </group>
  );
}