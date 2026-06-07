"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Bathroom() {
  const { plotSize } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  // Anchor inside the newly created Bathroom Partition (Back-Left)
  const anchorX = -(width / 2) + (width * 0.15); 
  const anchorZ = -(length / 2) + 2; // Near the back wall

  return (
    <group position={[anchorX, 0, anchorZ]}>
      
      {/* 1. Modern Western Commode */}
      <group position={[-2, 0, 0]}>
        {/* Commode Base */}
        <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.7, 0.6, 1.2, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* Water Tank */}
        <mesh castShadow receiveShadow position={[0, 1.5, -0.8]}>
          <boxGeometry args={[1.8, 1.2, 0.6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* Toilet Seat Cover */}
        <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.1, 32]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
        </mesh>
      </group>

      {/* 2. Wash Basin & Mirror */}
      <group position={[2, 0, 0]}>
        {/* Basin Cabinet */}
        <mesh castShadow receiveShadow position={[0, 1.2, -0.5]}>
          <boxGeometry args={[2.5, 2.4, 1.5]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        {/* White Basin Sink */}
        <mesh castShadow receiveShadow position={[0, 2.45, -0.2]}>
          <boxGeometry args={[2, 0.2, 1.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        {/* Wall Mirror */}
        <mesh castShadow receiveShadow position={[0, 4, -1.2]}>
          <boxGeometry args={[2, 2.5, 0.1]} />
          <meshStandardMaterial color="#e0f2fe" roughness={0} metalness={1} />
        </mesh>
      </group>

    </group>
  );
}