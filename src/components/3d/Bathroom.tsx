"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Bathroom() {
  const { plotSize, wallColor } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 30;
  const length = parseInt(lStr) || 50;

  // Strictly Top-Right Corner
  const bathWidth = Math.min(width * 0.25, 8); 
  const bathLength = Math.min(length * 0.15, 8);
  const startX = width / 2 - bathWidth / 2;
  const startZ = -length / 2 + bathLength / 2;

  return (
    <group position={[startX, 0, startZ]}>
      {/* Bathroom Walls */}
      <mesh castShadow receiveShadow position={[-bathWidth / 2, 3, 0]}><boxGeometry args={[0.3, 6, bathLength]} /><meshStandardMaterial color={wallColor} /></mesh>
      <mesh castShadow receiveShadow position={[0, 3, bathLength / 2]}><boxGeometry args={[bathWidth, 6, 0.3]} /><meshStandardMaterial color={wallColor} /></mesh>

      {/* Toilet */}
      <group position={[-1, 0, -bathLength / 2 + 1.5]}>
        <mesh castShadow position={[0, 0.6, 0]}><cylinderGeometry args={[0.7, 0.6, 1.2, 32]} /><meshStandardMaterial color="#ffffff" /></mesh>
        <mesh castShadow position={[0, 1.5, -0.6]}><boxGeometry args={[1.5, 1.2, 0.5]} /><meshStandardMaterial color="#ffffff" /></mesh>
      </group>

      {/* Washbasin against left bath wall */}
      <group position={[-bathWidth / 2 + 1, 0, bathLength / 2 - 1.5]}>
        <mesh castShadow position={[0, 1.2, 0]}><boxGeometry args={[1.5, 2.4, 1.5]} /><meshStandardMaterial color="#475569" /></mesh>
        <mesh castShadow position={[0, 2.45, 0]}><boxGeometry args={[1.2, 0.2, 1.2]} /><meshStandardMaterial color="#ffffff" /></mesh>
      </group>
    </group>
  );
}