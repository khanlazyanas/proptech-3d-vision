"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Furniture() {
  const { plotSize } = useEditorStore();
  
  // Math: Extract dimensions
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  // Anchor Math: Back-Right Corner
  const anchorX = (width / 2) - 6;   // 6 units away from right wall
  const anchorZ = -(length / 2) + 7; // 7 units away from back wall

  return (
    <group position={[anchorX, 0, anchorZ]} rotation={[0, 0, 0]}> 
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[10, 0.8, 12]} />
        <meshStandardMaterial color="#4a2c11" roughness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[9.5, 0.5, 11.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh castShadow receiveShadow position={[-2, 1.3, -4.5]}>
        <boxGeometry args={[2.5, 0.2, 1.8]} />
        <meshStandardMaterial color="#cbd5e1" roughness={1} />
      </mesh>
      <mesh castShadow receiveShadow position={[2, 1.3, -4.5]}>
        <boxGeometry args={[2.5, 0.2, 1.8]} />
        <meshStandardMaterial color="#cbd5e1" roughness={1} />
      </mesh>
    </group>
  );
}