"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Furniture() {
  const { plotSize, layoutType } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 30;
  const length = parseInt(lStr) || 50;

  // Anchor Z strictly against the back wall
  const bedZ = -length / 2 + 5.5; 
  
  // X Positions
  const masterBedX = layoutType === '2bhk' ? -width / 4 : -width / 4 + 2; 
  const guestBedX = width / 4 - 2; // Right side room

  const BedComponent = ({ posX, color }: { posX: number, color: string }) => (
    <group position={[posX, 0, bedZ]}> 
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}><boxGeometry args={[7.5, 0.8, 9.5]} /><meshStandardMaterial color="#291A10" /></mesh>
      <mesh castShadow receiveShadow position={[0, 1, 0]}><boxGeometry args={[7, 0.5, 9]} /><meshStandardMaterial color="#ffffff" /></mesh>
      {/* Headboard against the back wall */}
      <mesh castShadow receiveShadow position={[0, 2, -4.5]}><boxGeometry args={[7.5, 2.5, 0.5]} /><meshStandardMaterial color="#291A10" /></mesh>
      <mesh castShadow position={[-1.5, 1.3, -3.5]}><boxGeometry args={[2, 0.3, 1.2]} /><meshStandardMaterial color={color} /></mesh>
      <mesh castShadow position={[1.5, 1.3, -3.5]}><boxGeometry args={[2, 0.3, 1.2]} /><meshStandardMaterial color={color} /></mesh>
    </group>
  );

  return (
    <group>
      <BedComponent posX={masterBedX} color="#cbd5e1" />
      {layoutType === '2bhk' && <BedComponent posX={guestBedX} color="#fca5a5" />}
    </group>
  );
}