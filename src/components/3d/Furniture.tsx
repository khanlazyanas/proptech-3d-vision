"use client";

export default function Furniture() {
  return (
    <group position={[0, 0, -25]}> {/* Bed ko deewar ke paas place kiya hai */}
      
      {/* Bed Frame (Wooden Base) */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[12, 1, 16]} /> {/* 12ft wide, 16ft long proportion */}
        <meshStandardMaterial color="#3E2723" roughness={0.8} />
      </mesh>

      {/* Mattress (White/Cream) */}
      <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
        <boxGeometry args={[11, 0.5, 15]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.9} />
      </mesh>

      {/* Pillow 1 */}
      <mesh castShadow receiveShadow position={[-2.5, 1.6, -6]}>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color="#e2e8f0" roughness={1} />
      </mesh>

      {/* Pillow 2 */}
      <mesh castShadow receiveShadow position={[2.5, 1.6, -6]}>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color="#e2e8f0" roughness={1} />
      </mesh>
      
    </group>
  );
}