"use client";
import { useEditorStore } from "@/store/useEditorStore";
import { Grid } from "@react-three/drei";

export default function FloorPlan() {
  const { wallColor, floorTexture, plotSize, showRoof } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 30;
  const length = parseInt(lStr) || 50;

  // Exact Z-Axis Zoning (Front to Back)
  const zFront = length / 2;
  const zParkingEnd = zFront - (length * 0.15); // 15% Parking
  const zLivingEnd = zParkingEnd - (length * 0.30); // 30% Living/Dining
  const zKitchenEnd = zLivingEnd - (length * 0.20); // 20% Kitchen/Utility/Bath
  const zBedEnd = zKitchenEnd - (length * 0.25); // 25% Bedrooms
  const zBack = -length / 2; // Last 10% is Balcony

  const floorMat = floorTexture === "wood" ? { color: "#8b5a2b", roughness: 0.85 } :
                   floorTexture === "concrete" ? { color: "#6b7280", roughness: 0.7 } :
                   { color: "#f1f5f9", roughness: 0.15 };

  return (
    <group>
      <Grid position={[0, -0.49, 0]} args={[width + 40, length + 40]} cellSize={1} cellColor="#cbd5e1" sectionSize={5} sectionColor="#6366f1" fadeDistance={length + 40} />
      
      {/* Floor Slab */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[width, 1, length]} />
        <meshStandardMaterial {...floorMat} metalness={0.1} />
      </mesh>

      {/* Roof */}
      {showRoof && (
        <mesh castShadow receiveShadow position={[0, 6.2, 0]}>
          <boxGeometry args={[width + 1, 0.4, length + 1]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      )}

      {/* OUTER BOUNDARY (With Entrance & Balcony Openings) */}
      <mesh castShadow receiveShadow position={[-width / 2 + 0.25, 3, 0]}><boxGeometry args={[0.5, 6, length]} /><meshStandardMaterial color={wallColor} /></mesh>
      <mesh castShadow receiveShadow position={[width / 2 - 0.25, 3, 0]}><boxGeometry args={[0.5, 6, length]} /><meshStandardMaterial color={wallColor} /></mesh>
      
      {/* Front Boundary (Main Gate Open on Right) */}
      <mesh castShadow receiveShadow position={[-width * 0.2, 3, zFront - 0.25]}>
        <boxGeometry args={[width * 0.6, 6, 0.5]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      {/* Black Iron Main Gate */}
      <mesh castShadow position={[width * 0.25, 2, zFront - 0.25]}>
        <boxGeometry args={[width * 0.3, 4, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Back Boundary (Balcony Wall - Half Height) */}
      <mesh castShadow receiveShadow position={[0, 1.5, zBack + 0.25]}>
        <boxGeometry args={[width, 3, 0.5]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* ================= INTERIOR ZONING WALLS ================= */}
      {/* 1. Parking to Living (Main Door on Left) */}
      <mesh castShadow receiveShadow position={[width * 0.15, 3, zParkingEnd]}>
        <boxGeometry args={[width * 0.7, 6, 0.4]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* 2. Living to Kitchen/Utility (Arch/Open Passage in Center) */}
      <mesh castShadow receiveShadow position={[-width * 0.35, 3, zLivingEnd]}><boxGeometry args={[width * 0.3, 6, 0.4]} /><meshStandardMaterial color={wallColor} /></mesh>
      <mesh castShadow receiveShadow position={[width * 0.35, 3, zLivingEnd]}><boxGeometry args={[width * 0.3, 6, 0.4]} /><meshStandardMaterial color={wallColor} /></mesh>

      {/* 3. Kitchen to Bedroom (Doors on Sides) */}
      <mesh castShadow receiveShadow position={[0, 3, zKitchenEnd]}>
        <boxGeometry args={[width * 0.5, 6, 0.4]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* 4. Bedroom to Balcony (Glass Sliding Doors) */}
      <mesh castShadow receiveShadow position={[0, 3, zBedEnd]}>
        <boxGeometry args={[width, 6, 0.2]} />
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} metalness={1} />
      </mesh>

      {/* Center Divider for 2BHK (From Kitchen to Balcony) */}
      <mesh castShadow receiveShadow position={[0, 3, (zKitchenEnd + zBack) / 2]}>
        <boxGeometry args={[0.4, 6, Math.abs(zKitchenEnd - zBack)]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
    </group>
  );
}