"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Furniture() {
  const { plotSize, layoutType } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 20;
  const length = parseInt(lStr) || 70;

  // Bed Z positioning is same for all
  const bedZ = -(length / 2) + 6; 
  
  // Master Bed X Position (Left side if 2BHK, otherwise Center/Right)
  const masterBedX = layoutType === '2bhk' ? -(width / 4) + 2 : 2;
  // Guest Bed X Position (Right side for 2BHK)
  const guestBedX = width / 4 + 1;

  // Standard Bed Component taaki code repeat na ho
  const BedComponent = ({ posX, color }: { posX: number, color: string }) => (
    <group position={[posX, 0, bedZ]}> 
      <mesh receiveShadow position={[0, 0.01, 2]}><boxGeometry args={[14, 0.05, 14]} /><meshStandardMaterial color="#94a3b8" roughness={1} /></mesh>
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}><boxGeometry args={[8, 0.8, 10]} /><meshStandardMaterial color="#291A10" roughness={0.7} /></mesh>
      <mesh castShadow receiveShadow position={[0, 1, 0]}><boxGeometry args={[7.6, 0.5, 9.6]} /><meshStandardMaterial color="#ffffff" roughness={0.9} /></mesh>
      <mesh castShadow receiveShadow position={[0, 2, -4.5]}><boxGeometry args={[8, 2.5, 0.5]} /><meshStandardMaterial color="#291A10" roughness={0.7} /></mesh>
      <mesh castShadow position={[-1.5, 1.3, -3.5]}><boxGeometry args={[2.5, 0.3, 1.5]} /><meshStandardMaterial color={color} roughness={1} /></mesh>
      <mesh castShadow position={[1.5, 1.3, -3.5]}><boxGeometry args={[2.5, 0.3, 1.5]} /><meshStandardMaterial color={color} roughness={1} /></mesh>
      <mesh castShadow receiveShadow position={[-5, 0.8, -4]}><boxGeometry args={[1.5, 1.6, 1.5]} /><meshStandardMaterial color="#291A10" roughness={0.7} /></mesh>
      <mesh castShadow receiveShadow position={[5, 0.8, -4]}><boxGeometry args={[1.5, 1.6, 1.5]} /><meshStandardMaterial color="#291A10" roughness={0.7} /></mesh>
    </group>
  );

  return (
    <group>
      {/* Master Bed */}
      <BedComponent posX={masterBedX} color="#cbd5e1" />
      
      {/* Spawn Guest Bed only if 2 BHK is selected */}
      {layoutType === '2bhk' && (
        <BedComponent posX={guestBedX} color="#fca5a5" /> 
      )}
    </group>
  );
}