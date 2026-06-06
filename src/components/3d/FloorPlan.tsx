"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Grid } from "@react-three/drei";

export default function FloorPlan() {
  const { wallColor, floorTexture, plotSize } = useEditorStore();

  // 1. Dynamic Math: String "20x70" ko numbers (20 aur 70) me convert kar rahe hain
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

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
      {/* Dynamic Grid: Plot ke size se humesha 20ft bada rahega */}
      <Grid 
        position={[0, -0.49, 0]} 
        args={[width + 20, length + 20]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#cbd5e1" 
        sectionSize={5} 
        sectionThickness={1.5} 
        sectionColor="#6366f1" 
        fadeDistance={Math.max(width, length) + 20} 
      />

      {/* Dynamic Floor Slab */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[width, 1, length]} />
        <meshStandardMaterial 
          color={floorMat.color} 
          roughness={floorMat.roughness} 
          metalness={floorMat.metalness} 
        />
      </mesh>

      {/* ================= DYNAMIC BOUNDARY WALLS ================= */}
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

      {/* Front Wall (With Entrance Gap) */}
      <mesh castShadow receiveShadow position={[-width * 0.2, 3, length / 2 - 0.25]}>
        {/* Entrance chhod kar baaki ki front deewar */}
        <boxGeometry args={[width * 0.6, 6, 0.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.9} />
      </mesh>
      
    </group>
  );
}