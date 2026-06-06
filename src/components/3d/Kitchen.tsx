"use client";

export default function Kitchen() {
  return (
    // Kitchen Zone: Z axis par -15 aur 10 ke beech mein
    <group position={[-5, 0, -2]}>
      
      {/* 1. Main Kitchen Counter (Black Granite Slab) */}
      <mesh castShadow receiveShadow position={[0, 1.5, -8]}>
        <boxGeometry args={[6, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* 2. Base Cabinets (Teak Wood under the slab) */}
      <mesh castShadow receiveShadow position={[0, 0.75, -8]}>
        <boxGeometry args={[5.5, 1.5, 11.5]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
      </mesh>

      {/* 3. Kitchen Island / Breakfast Counter (Samne ki taraf) */}
      <mesh castShadow receiveShadow position={[6, 1.5, -4]}>
        <boxGeometry args={[4, 0.15, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
      </mesh>

      {/* 4. Island Base (Dark Grey) */}
      <mesh castShadow receiveShadow position={[6, 0.75, -4]}>
        <boxGeometry args={[3.5, 1.5, 7.5]} />
        <meshStandardMaterial color="#333333" roughness={0.8} />
      </mesh>
    </group>
  );
}