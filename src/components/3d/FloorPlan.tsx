"use client";
import { useEditorStore } from "@/store/useEditorStore";
import { Grid } from "@react-three/drei";

export default function FloorPlan() {
  const { wallColor, floorTexture, plotSize, showRoof, layoutType } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 30;
  const length = parseInt(lStr) || 50;

  // ================= 100% BULLETPROOF MATH =================
  const zFront = length / 2;
  const dPark = length * 0.15;
  const dLiv = length * 0.30;
  const dKit = length * 0.20;
  const dBed = length * 0.25;
  const dBalc = length * 0.10;

  const w1 = zFront - dPark; // Parking to Living
  const w2 = w1 - dLiv;      // Living to Kitchen
  const w3 = w2 - dKit;      // Kitchen to Bed
  const w4 = w3 - dBed;      // Bed to Balcony
  const zBack = w4 - dBalc;  // End of plot

  const floorMat = floorTexture === "wood" ? { color: "#8b5a2b", roughness: 0.85 } :
                   floorTexture === "concrete" ? { color: "#6b7280", roughness: 0.7 } :
                   { color: "#f1f5f9", roughness: 0.15 };

  return (
    <group>
      <Grid position={[0, -0.49, 0]} args={[width + 40, length + 40]} cellSize={1} cellColor="#cbd5e1" sectionSize={5} sectionColor="#6366f1" fadeDistance={length + 40} />
      
      {/* ================= ZONED FLOOR SLABS ================= */}
      {/* 1. Garden / Parking Floor (Concrete & Grass) */}
      <mesh receiveShadow position={[0, -0.48, zFront - dPark / 2]}>
        <boxGeometry args={[width, 1, dPark]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} />
      </mesh>

      {/* 2. Main House Floor */}
      <mesh receiveShadow position={[0, -0.48, w1 - (dLiv + dKit + dBed) / 2]}>
        <boxGeometry args={[width, 1, dLiv + dKit + dBed]} />
        <meshStandardMaterial {...floorMat} metalness={0.1} />
      </mesh>

      {/* 3. Balcony Floor (Wooden Deck) */}
      <mesh receiveShadow position={[0, -0.48, w4 - dBalc / 2]}>
        <boxGeometry args={[width, 1, dBalc]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
      </mesh>

      {/* Roof */}
      {showRoof && (
        <mesh castShadow receiveShadow position={[0, 6.2, 0]}>
          <boxGeometry args={[width + 1, 0.4, length + 1]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      )}

      {/* ================= OUTER BOUNDARIES & GATES ================= */}
      <mesh castShadow receiveShadow position={[-width / 2 + 0.25, 3, 0]}><boxGeometry args={[0.5, 6, length]} /><meshStandardMaterial color={wallColor} /></mesh>
      <mesh castShadow receiveShadow position={[width / 2 - 0.25, 3, 0]}><boxGeometry args={[0.5, 6, length]} /><meshStandardMaterial color={wallColor} /></mesh>
      
      {/* Front Boundary Wall & Gate */}
      <mesh castShadow receiveShadow position={[-width * 0.2, 3, zFront - 0.25]}><boxGeometry args={[width * 0.6, 6, 0.5]} /><meshStandardMaterial color={wallColor} /></mesh>
      <mesh castShadow position={[width * 0.35, 2, zFront - 1]} rotation={[0, -Math.PI / 4, 0]}><boxGeometry args={[width * 0.3, 4, 0.1]} /><meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} /></mesh>

      {/* Back Boundary (Balcony Glass Railing) */}
      <mesh castShadow receiveShadow position={[0, 1.5, zBack + 0.25]}>
        <boxGeometry args={[width, 3, 0.2]} />
        <meshStandardMaterial color="#bae6fd" transparent opacity={0.4} metalness={0.8} />
      </mesh>

      {/* ================= INTERIOR PARTITIONS ================= */}
      {layoutType !== 'studio' && (
        <>
          {/* Wall 1: Parking to Living (Door on Left) */}
          <mesh castShadow receiveShadow position={[width * 0.15, 3, w1]}><boxGeometry args={[width * 0.7, 6, 0.4]} /><meshStandardMaterial color={wallColor} /></mesh>

          {/* Wall 2: Living to Kitchen (Open Center Archway) */}
          <mesh castShadow receiveShadow position={[-width * 0.35, 3, w2]}><boxGeometry args={[width * 0.3, 6, 0.4]} /><meshStandardMaterial color={wallColor} /></mesh>
          <mesh castShadow receiveShadow position={[width * 0.35, 3, w2]}><boxGeometry args={[width * 0.3, 6, 0.4]} /><meshStandardMaterial color={wallColor} /></mesh>

          {/* Wall 3: Kitchen to Bed (Center Wall, Doors on Extreme Left & Right) */}
          <mesh castShadow receiveShadow position={[0, 3, w3]}>
            <boxGeometry args={[width * 0.6, 6, 0.4]} />
            <meshStandardMaterial color={wallColor} />
          </mesh>

          {/* Wall 4: Bed to Balcony (Sliding Glass Doors) */}
          <mesh castShadow receiveShadow position={[0, 3, w4]}>
            <boxGeometry args={[width, 6, 0.2]} />
            <meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} metalness={0.9} roughness={0} />
          </mesh>
        </>
      )}

      {/* 2BHK Center Divider */}
      {layoutType === '2bhk' && (
        <mesh castShadow receiveShadow position={[0, 3, w3 - dBed / 2]}>
          <boxGeometry args={[0.4, 6, dBed]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      )}
    </group>
  );
}