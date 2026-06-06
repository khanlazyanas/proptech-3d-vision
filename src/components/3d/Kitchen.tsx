"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Kitchen() {
  const { plotSize } = useEditorStore();
  
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  // Anchor Math: Left-Middle Wall
  const anchorX = -(width / 2) + 4; // 4 units away from left wall
  const anchorZ = -(length / 6);    // Slightly towards the back

  return (
    <group position={[anchorX, 0, anchorZ]}>
      <mesh castShadow receiveShadow position={[0, 1.5, -4]}>
        <boxGeometry args={[6, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.75, -4]}>
        <boxGeometry args={[5.5, 1.5, 11.5]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
      </mesh>
      <mesh castShadow receiveShadow position={[6, 1.5, 0]}>
        <boxGeometry args={[4, 0.15, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
      </mesh>
      <mesh castShadow receiveShadow position={[6, 0.75, 0]}>
        <boxGeometry args={[3.5, 1.5, 7.5]} />
        <meshStandardMaterial color="#333333" roughness={0.8} />
      </mesh>
    </group>
  );
}