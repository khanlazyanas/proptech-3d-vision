"use client";

export default function Furniture() {
  return (
    // Bed ko piche wale Master Bedroom (Z = -25, X = 2) me perfect locate kiya hai
    <group position={[2, 0, -26]} rotation={[0, 0, 0]}> 
      
      {/* Bed Wooden Base */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[10, 0.8, 12]} />
        <meshStandardMaterial color="#4a2c11" roughness={0.7} />
      </mesh>

      {/* Luxury Mattress */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[9.5, 0.5, 11.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Pillows */}
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