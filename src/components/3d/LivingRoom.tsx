"use client";

export default function LivingRoom() {
  return (
    // Living Room Zone: Z axis par 10 se aage
    <group position={[0, 0, 22]}>
      
      {/* 1. Main Sofa Seat (Fabric Grey) */}
      <mesh castShadow receiveShadow position={[2, 0.6, 6]}>
        <boxGeometry args={[10, 0.8, 3.5]} />
        <meshStandardMaterial color="#64748b" roughness={1} />
      </mesh>

      {/* 2. Sofa Backrest */}
      <mesh castShadow receiveShadow position={[2, 1.6, 7.25]}>
        <boxGeometry args={[10, 1.5, 1]} />
        <meshStandardMaterial color="#475569" roughness={1} />
      </mesh>

      {/* 3. Sofa L-Extension (Right side chaise) */}
      <mesh castShadow receiveShadow position={[5.5, 0.6, 2]}>
        <boxGeometry args={[3, 0.8, 6]} />
        <meshStandardMaterial color="#64748b" roughness={1} />
      </mesh>

      {/* 4. Center Coffee Table (Glass Top) */}
      <mesh castShadow receiveShadow position={[0, 0.8, 1.5]}>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 32]} />
        {/* Transparent glass effect */}
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} roughness={0} metalness={0.9} />
      </mesh>

      {/* 5. Center Table Wooden Base */}
      <mesh castShadow receiveShadow position={[0, 0.4, 1.5]}>
        <cylinderGeometry args={[1.5, 1.5, 0.8, 32]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
      </mesh>

      {/* 6. Wall-Mounted Huge TV (Left Wall) */}
      <mesh castShadow receiveShadow position={[-9.4, 3, 3]}>
        <boxGeometry args={[0.2, 4.5, 8]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} />
      </mesh>
      
    </group>
  );
}