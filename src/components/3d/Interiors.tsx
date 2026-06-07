"use client";
import { useEditorStore } from "@/store/useEditorStore";

export default function Interiors() {
  // NAYA: layoutType ko store se fetch kiya
  const { plotSize, lightingTheme, layoutType } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 30;
  const length = parseInt(lStr) || 50;

  // Zone Coordinates
  const zFront = length / 2;
  const zParkingEnd = zFront - (length * 0.15);
  const zLivingEnd = zParkingEnd - (length * 0.30);
  const zKitchenEnd = zLivingEnd - (length * 0.20);
  const zBedEnd = zKitchenEnd - (length * 0.25);

  const lightInt = lightingTheme === 'night' ? 1.5 : 0;

  // Dynamic Bed Positioning (1BHK/Studio me center, 2BHK me left)
  const masterBedX = layoutType === '2bhk' ? -width / 4 : 0;

  return (
    <group>
      {/* ================= 1. PARKING & LOBBY ================= */}
      <group position={[width * 0.25, 0, zFront - 4]}>
        <mesh castShadow position={[0, 1, 0]}><boxGeometry args={[1, 1.5, 4]} /><meshStandardMaterial color="#ef4444" /></mesh>
        
        {/* FIX: Rotation ab <mesh> tag ke andar hai, <cylinderGeometry> me nahi */}
        <mesh castShadow position={[0, 0.4, -1.5]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        <mesh castShadow position={[0, 0.4, 1.5]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* ================= 2. LIVING & DINING ================= */}
      <group position={[0, 0, zParkingEnd - 6]}>
        {/* Ceiling Light */}
        <pointLight position={[0, 5, 0]} intensity={lightInt} color="#fcd34d" distance={20} />
        <mesh position={[0, 5.8, 0]}><cylinderGeometry args={[0.5, 0.5, 0.2]} /><meshStandardMaterial color="#ffffff" emissive="#fcd34d" emissiveIntensity={lightInt} /></mesh>

        {/* L-Sofa (Left Side) */}
        <mesh castShadow position={[-width/2 + 2, 0.6, 0]}><boxGeometry args={[3, 0.8, 8]} /><meshStandardMaterial color="#64748b" /></mesh>
        {/* TV Unit (Center Wall) */}
        <mesh castShadow position={[0, 3, 5.8]}><boxGeometry args={[6, 3, 0.2]} /><meshStandardMaterial color="#000000" /></mesh>

        {/* Dining Space (Right Side) */}
        <group position={[width/2 - 4, 0, 0]}>
          <mesh castShadow position={[0, 1.5, 0]}><boxGeometry args={[4, 0.2, 6]} /><meshStandardMaterial color="#8b5a2b" /></mesh>
          <mesh castShadow position={[0, 0.75, 0]}><boxGeometry args={[3.5, 1.5, 5.5]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
          <mesh castShadow position={[-2.5, 1, 0]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
          <mesh castShadow position={[2.5, 1, 0]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
        </group>
      </group>

      {/* ================= 3. KITCHEN & UTILITY / BATH ================= */}
      <group position={[0, 0, zLivingEnd - 5]}>
        {/* Kitchen Setup (Right Side) */}
        <group position={[width/4, 0, 0]}>
          <mesh castShadow position={[0, 1.5, -2]}><boxGeometry args={[width/2 - 1, 0.2, 3]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
          <mesh castShadow position={[0, 0.75, -2]}><boxGeometry args={[width/2 - 1.5, 1.5, 2.5]} /><meshStandardMaterial color="#8b5a2b" /></mesh>
          <mesh castShadow position={[width/4 - 2, 2.5, -2]}><boxGeometry args={[2.5, 5, 2.5]} /><meshStandardMaterial color="#94a3b8" metalness={0.8} /></mesh>
        </group>

        {/* Utility / Wash Area (Left Side) */}
        <group position={[-width/4, 0, 0]}>
          <mesh castShadow position={[-2, 1.5, -2]}><boxGeometry args={[2, 3, 2]} /><meshStandardMaterial color="#f8fafc" /></mesh>
          <mesh castShadow position={[2, 0.6, -2]}><cylinderGeometry args={[0.7, 0.6, 1.2]} /><meshStandardMaterial color="#ffffff" /></mesh>
        </group>
      </group>

      {/* ================= 4. BEDROOMS & ATTACHED BATH ================= */}
      <group position={[0, 0, zKitchenEnd - 6]}>
        
        {/* Master Bed */}
        <group position={[masterBedX, 0, 0]}>
          <mesh castShadow position={[0, 0.5, 0]}><boxGeometry args={[6, 1, 8]} /><meshStandardMaterial color="#291A10" /></mesh>
          <mesh castShadow position={[0, 1.2, 0]}><boxGeometry args={[5.5, 0.4, 7.5]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <pointLight position={[0, 5, 0]} intensity={lightInt} color="#e0f2fe" distance={15} />
        </group>
        
        {/* Guest Bed (Sirf 2BHK mode mein render hoga) */}
        {layoutType === '2bhk' && (
          <group position={[width/4, 0, 0]}>
            <mesh castShadow position={[0, 0.5, 0]}><boxGeometry args={[6, 1, 8]} /><meshStandardMaterial color="#291A10" /></mesh>
            <mesh castShadow position={[0, 1.2, 0]}><boxGeometry args={[5.5, 0.4, 7.5]} /><meshStandardMaterial color="#fca5a5" /></mesh>
            <pointLight position={[0, 5, 0]} intensity={lightInt} color="#e0f2fe" distance={15} />
          </group>
        )}
        
      </group>
    </group>
  );
}