"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Kitchen() {
  const { plotSize } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  // Center of the Kitchen Zone
  const bedRoomEnd = -(length / 2) + (length * 0.35);
  const kitchenEnd = bedRoomEnd + (length * 0.30);
  const centerZ = (bedRoomEnd + kitchenEnd) / 2;

  // Scale kitchen slightly based on plot width
  const scale = width > 30 ? 1.5 : 1;

  return (
    <group position={[0, 0, centerZ]}>
      {/* Main Back Counter Base */}
      <mesh castShadow receiveShadow position={[0, 0.75 * scale, -2 * scale]}>
        <boxGeometry args={[10 * scale, 1.5 * scale, 3 * scale]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
      </mesh>
      {/* Main Back Counter Slab (Granite) */}
      <mesh castShadow receiveShadow position={[0, 1.55 * scale, -2 * scale]}>
        <boxGeometry args={[10.5 * scale, 0.15 * scale, 3.5 * scale]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Front Island Base */}
      <mesh castShadow receiveShadow position={[0, 0.75 * scale, 4 * scale]}>
        <boxGeometry args={[8 * scale, 1.5 * scale, 2.5 * scale]} />
        <meshStandardMaterial color="#333333" roughness={0.8} />
      </mesh>
      {/* Front Island Slab */}
      <mesh castShadow receiveShadow position={[0, 1.55 * scale, 4 * scale]}>
        <boxGeometry args={[8.5 * scale, 0.15 * scale, 3 * scale]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Refrigerator (Stainless Steel) */}
      <mesh castShadow receiveShadow position={[-6 * scale, 2.5 * scale, -2 * scale]}>
        <boxGeometry args={[3 * scale, 5 * scale, 3 * scale]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}