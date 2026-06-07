"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function LivingRoom() {
  const { plotSize } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 30;
  const length = parseInt(lStr) || 50;

  // Front Zone Anchors
  const zKitchenEnd = -length / 2 + length * 0.65;
  const zCenter = zKitchenEnd + (length * 0.15); // Middle of living room

  return (
    <group position={[0, 0, zCenter]}>
      
      {/* TV Mounted exactly on Left Wall */}
      <group position={[-width / 2 + 0.5, 0, 0]}>
        <mesh castShadow position={[0.5, 0.6, 0]}><boxGeometry args={[1, 1.2, 8]} /><meshStandardMaterial color="#1e293b" /></mesh>
        <mesh castShadow position={[0.2, 3.5, 0]}><boxGeometry args={[0.2, 3.5, 6]} /><meshStandardMaterial color="#000000" metalness={0.9} /></mesh>
      </group>

      {/* Sofa Centered facing Left TV */}
      <group position={[width * 0.1, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow position={[0, 0.6, 0]}><boxGeometry args={[10, 0.8, 3.5]} /><meshStandardMaterial color="#64748b" /></mesh>
        <mesh castShadow position={[0, 1.6, 1.25]}><boxGeometry args={[10, 1.5, 1]} /><meshStandardMaterial color="#475569" /></mesh>
        {/* L-Shape chaise */}
        <mesh castShadow position={[-3.5, 0.6, -3]}><boxGeometry args={[3, 0.8, 6]} /><meshStandardMaterial color="#64748b" /></mesh>
      </group>

      {/* Center Table */}
      <group position={[width * 0.1 - 4, 0, 0]}>
        <mesh castShadow position={[0, 1, 0]}><cylinderGeometry args={[2, 2, 0.1, 32]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.5} /></mesh>
        <mesh castShadow position={[0, 0.5, 0]}><cylinderGeometry args={[1, 1, 1, 32]} /><meshStandardMaterial color="#8b5a2b" /></mesh>
      </group>

    </group>
  );
}