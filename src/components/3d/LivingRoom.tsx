"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function LivingRoom() {
  const { plotSize } = useEditorStore();
  
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  // Anchor Math: Front-Right Area
  const anchorX = (width / 2) - 8;  // Near right wall
  const anchorZ = (length / 2) - 12; // Near front entrance

  return (
    <group position={[anchorX, 0, anchorZ]}>
      <mesh castShadow receiveShadow position={[2, 0.6, 6]}>
        <boxGeometry args={[10, 0.8, 3.5]} />
        <meshStandardMaterial color="#64748b" roughness={1} />
      </mesh>
      <mesh castShadow receiveShadow position={[2, 1.6, 7.25]}>
        <boxGeometry args={[10, 1.5, 1]} />
        <meshStandardMaterial color="#475569" roughness={1} />
      </mesh>
      <mesh castShadow receiveShadow position={[5.5, 0.6, 2]}>
        <boxGeometry args={[3, 0.8, 6]} />
        <meshStandardMaterial color="#64748b" roughness={1} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.8, 1.5]}>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} roughness={0} metalness={0.9} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.4, 1.5]}>
        <cylinderGeometry args={[1.5, 1.5, 0.8, 32]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
      </mesh>
    </group>
  );
}