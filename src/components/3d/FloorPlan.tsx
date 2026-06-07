"use client";
import { useEditorStore } from "@/store/useEditorStore";
import { Grid } from "@react-three/drei";

export default function FloorPlan() {
  const { wallColor, floorTexture, plotSize, showRoof, layoutType } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 30;
  const length = parseInt(lStr) || 50;

  // Exact Zone Boundaries (Z-Axis)
  const zBackWall = -length / 2;
  const zBedEnd = -length / 2 + length * 0.35; // Bedroom finishes at 35%
  const zKitchenEnd = -length / 2 + length * 0.65; // Kitchen finishes at 65%
  const zFrontWall = length / 2;

  const floorMat = floorTexture === "wood" ? { color: "#8b5a2b", roughness: 0.85 } :
                   floorTexture === "concrete" ? { color: "#6b7280", roughness: 0.7 } :
                   { color: "#f1f5f9", roughness: 0.15 };

  return (
    <group>
      <Grid position={[0, -0.49, 0]} args={[width + 40, length + 40]} cellSize={1} cellColor="#cbd5e1" sectionSize={5} sectionColor="#6366f1" fadeDistance={Math.max(width, length) + 40} />
      
      {/* Main Floor */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[width, 1, length]} />
        <meshStandardMaterial {...floorMat} metalness={0.2} />
      </mesh>

      {/* Roof */}
      {showRoof && (
        <mesh castShadow receiveShadow position={[0, 6.2, 0]}>
          <boxGeometry args={[width + 1, 0.4, length + 1]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
        </mesh>
      )}

      {/* 4 OUTER BOUNDARY WALLS */}
      <mesh castShadow receiveShadow position={[-width / 2 + 0.25, 3, 0]}><boxGeometry args={[0.5, 6, length]} /><meshStandardMaterial color={wallColor} /></mesh>
      <mesh castShadow receiveShadow position={[width / 2 - 0.25, 3, 0]}><boxGeometry args={[0.5, 6, length]} /><meshStandardMaterial color={wallColor} /></mesh>
      <mesh castShadow receiveShadow position={[0, 3, zBackWall + 0.25]}><boxGeometry args={[width, 6, 0.5]} /><meshStandardMaterial color={wallColor} /></mesh>
      {/* Front wall with entrance on the Right */}
      <mesh castShadow receiveShadow position={[-width * 0.15, 3, zFrontWall - 0.25]}><boxGeometry args={[width * 0.7, 6, 0.5]} /><meshStandardMaterial color={wallColor} /></mesh>

      {/* DYNAMIC ROOM PARTITIONS */}
      {layoutType !== 'studio' && (
        <>
          {/* Bed/Kitchen Wall (Door on Left) */}
          <mesh castShadow receiveShadow position={[width * 0.15, 3, zBedEnd]}><boxGeometry args={[width * 0.7, 6, 0.4]} /><meshStandardMaterial color={wallColor} /></mesh>
          {/* Kitchen/Living Wall (Door on Right) */}
          <mesh castShadow receiveShadow position={[-width * 0.15, 3, zKitchenEnd]}><boxGeometry args={[width * 0.7, 6, 0.4]} /><meshStandardMaterial color={wallColor} /></mesh>
        </>
      )}

      {/* 2 BHK Center Divider */}
      {layoutType === '2bhk' && (
        <mesh castShadow receiveShadow position={[0, 3, zBackWall + (length * 0.35) / 2]}>
          <boxGeometry args={[0.4, 6, length * 0.35]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      )}
    </group>
  );
}