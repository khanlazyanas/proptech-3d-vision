"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Kitchen() {
  const { plotSize } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 30;
  const length = parseInt(lStr) || 50;

  // Anchor to Mid Zone and Left Wall
  const zBedEnd = -length / 2 + length * 0.35; 
  const startX = -width / 2 + 1.5; // Touch left wall
  const startZ = zBedEnd + 2.5;    // Touch partition wall

  return (
    <group position={[startX, 0, startZ]}>
      {/* Side Counter (Along Left Wall) */}
      <mesh castShadow receiveShadow position={[0, 1.5, 4]}>
        <boxGeometry args={[3, 0.15, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.75, 4]}>
        <boxGeometry args={[2.8, 1.5, 9.8]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>

      {/* Fridge on the Corner */}
      <mesh castShadow receiveShadow position={[0, 2.5, -1]}>
        <boxGeometry args={[3, 5, 3]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}