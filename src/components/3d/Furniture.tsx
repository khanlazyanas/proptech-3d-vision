"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Furniture() {
  const { plotSize } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  // Center of the Bedroom Zone
  const bedRoomEnd = -(length / 2) + (length * 0.35);
  const bedZ = -(length / 2) + 6; // Fixed near the back wall

  return (
    <group position={[0, 0, bedZ]}> 
      {/* Bedroom Rug */}
      <mesh receiveShadow position={[0, 0.01, 2]}>
        <boxGeometry args={[14, 0.05, 14]} />
        <meshStandardMaterial color="#94a3b8" roughness={1} />
      </mesh>

      {/* Bed Base */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[8, 0.8, 10]} />
        <meshStandardMaterial color="#291A10" roughness={0.7} />
      </mesh>
      {/* Mattress */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[7.6, 0.5, 9.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      {/* Headboard */}
      <mesh castShadow receiveShadow position={[0, 2, -4.5]}>
        <boxGeometry args={[8, 2.5, 0.5]} />
        <meshStandardMaterial color="#291A10" roughness={0.7} />
      </mesh>
      {/* Pillows */}
      <mesh castShadow position={[-1.5, 1.3, -3.5]}>
        <boxGeometry args={[2.5, 0.3, 1.5]} />
        <meshStandardMaterial color="#cbd5e1" roughness={1} />
      </mesh>
      <mesh castShadow position={[1.5, 1.3, -3.5]}>
        <boxGeometry args={[2.5, 0.3, 1.5]} />
        <meshStandardMaterial color="#cbd5e1" roughness={1} />
      </mesh>

      {/* Side Tables */}
      <mesh castShadow receiveShadow position={[-5, 0.8, -4]}>
        <boxGeometry args={[1.5, 1.6, 1.5]} />
        <meshStandardMaterial color="#291A10" roughness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[5, 0.8, -4]}>
        <boxGeometry args={[1.5, 1.6, 1.5]} />
        <meshStandardMaterial color="#291A10" roughness={0.7} />
      </mesh>
    </group>
  );
}