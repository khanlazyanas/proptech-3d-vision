"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function LivingRoom() {
  const { plotSize } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  // Center of the Front Living Zone
  const bedRoomEnd = -(length / 2) + (length * 0.35);
  const kitchenEnd = bedRoomEnd + (length * 0.30);
  const frontZ = kitchenEnd + ((length / 2 - kitchenEnd) / 2);

  const scale = width > 30 ? 1.2 : 1;

  return (
    <group position={[0, 0, frontZ]}>
      {/* Circular Rug */}
      <mesh receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6 * scale, 64]} />
        <meshStandardMaterial color="#e2e8f0" roughness={1} />
      </mesh>

      {/* Sofa Setup (Anchored to Right) */}
      <group position={[width / 2 - 4 * scale, 0, 0]}>
        {/* Main Seat */}
        <mesh castShadow receiveShadow position={[0, 0.6 * scale, 0]}>
          <boxGeometry args={[3.5 * scale, 0.8 * scale, 10 * scale]} />
          <meshStandardMaterial color="#64748b" roughness={1} />
        </mesh>
        {/* Backrest */}
        <mesh castShadow receiveShadow position={[1.5 * scale, 1.6 * scale, 0]}>
          <boxGeometry args={[1 * scale, 1.5 * scale, 10 * scale]} />
          <meshStandardMaterial color="#475569" roughness={1} />
        </mesh>
      </group>

      {/* Center Table */}
      <mesh castShadow receiveShadow position={[0, 1 * scale, 0]}>
        <cylinderGeometry args={[2 * scale, 2 * scale, 0.1 * scale, 32]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} roughness={0} metalness={0.9} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.5 * scale, 0]}>
        <cylinderGeometry args={[1.2 * scale, 1.2 * scale, 1 * scale, 32]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
      </mesh>

      {/* TV Setup (Anchored to Left Wall) */}
      <group position={[-width / 2 + 1, 0, 0]}>
        {/* TV Console / Cabinet */}
        <mesh castShadow receiveShadow position={[1, 0.6 * scale, 0]}>
          <boxGeometry args={[1.5 * scale, 1.2 * scale, 8 * scale]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Wall Mounted TV */}
        <mesh castShadow receiveShadow position={[0.2, 3.5 * scale, 0]}>
          <boxGeometry args={[0.2, 4 * scale, 7 * scale]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}