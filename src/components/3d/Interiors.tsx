"use client";
import { useEditorStore } from "@/store/useEditorStore";
import { Text } from "@react-three/drei";

export default function Interiors() {
  const { plotSize, lightingTheme, layoutType } = useEditorStore();
  const [wStr, lStr] = plotSize.split("x");
  const width = parseInt(wStr) || 30;
  const length = parseInt(lStr) || 50;

  // ================= THE ARCHITECTURAL MATRIX =================
  const zFront = length / 2;
  const dPark = length * 0.15;
  const dLiv = length * 0.30;
  const dKit = length * 0.20;
  const dBed = length * 0.25;
  const dBalc = length * 0.10;

  const w1 = zFront - dPark;
  const w2 = w1 - dLiv;
  const w3 = w2 - dKit;
  const w4 = w3 - dBed;

  const cPark = zFront - dPark / 2;
  const cLiv = w1 - dLiv / 2;
  const cKit = w2 - dKit / 2;
  const cBed = w3 - dBed / 2;
  const cBalc = w4 - dBalc / 2;

  const lightInt = lightingTheme === 'night' ? 1.8 : 0;
  const lampInt = lightingTheme === 'night' ? 2.5 : 0;
  const masterBedX = layoutType === '2bhk' ? -width / 4 + 1 : 0;

  // Premium Blueprint Specification Labels (Hidden in Night Mode for Cinematic Feel)
  const RoomLabel = ({ name, w, l, pos }: { name: string, w: number, l: number, pos: [number, number, number] }) => (
    lightingTheme !== 'night' && (
      <Text
        position={pos}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={width > 30 ? 1.5 : 1.1}
        color="rgba(148, 163, 184, 0.4)"  // ✅ Replaced opacity with RGBA color
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        fontWeight="900"
        depthTest={false}
      >
        {`${name.toUpperCase()}\n${Math.round(w)}' x ${Math.round(l)}'`}
      </Text>
    )
  );

  // ================= ULTRA-REALISTIC DOOR COMPONENT =================
  const ArchitecturalDoor = ({ pos, rotation = [0, 0, 0], swingInvert = false }: { pos: [number, number, number], rotation?: [number, number, number], swingInvert?: boolean }) => {
    const swingAngle = swingInvert ? -Math.PI / 2.5 : Math.PI / 2.5; // 72 degrees open
    const hingeX = swingInvert ? 1.4 : -1.4;

    return (
      <group position={pos} rotation={rotation}>
        {/* Frame */}
        <mesh position={[-1.5, 3, 0]}><boxGeometry args={[0.2, 6, 0.4]} /><meshStandardMaterial color="#1c1917" roughness={0.9} /></mesh>
        <mesh position={[1.5, 3, 0]}><boxGeometry args={[0.2, 6, 0.4]} /><meshStandardMaterial color="#1c1917" roughness={0.9} /></mesh>
        <mesh position={[0, 5.9, 0]}><boxGeometry args={[3.2, 0.2, 0.4]} /><meshStandardMaterial color="#1c1917" roughness={0.9} /></mesh>
        
        {/* Door Leaf (Swung Open) */}
        <group position={[hingeX, 0, 0]} rotation={[0, swingAngle, 0]}>
          <mesh position={[-hingeX, 2.9, 0]}><boxGeometry args={[2.8, 5.6, 0.1]} /><meshStandardMaterial color="#3f3f46" roughness={0.5} /></mesh>
          {/* Gold Handles */}
          <mesh position={[-hingeX + (swingInvert ? -1.1 : 1.1), 3, 0.12]}><cylinderGeometry args={[0.02, 0.02, 0.5]} /><meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} /></mesh>
          <mesh position={[-hingeX + (swingInvert ? -1.1 : 1.1), 3, -0.12]}><cylinderGeometry args={[0.02, 0.02, 0.5]} /><meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} /></mesh>
        </group>
      </group>
    );
  };

  return (
    <group>
      {/* ================= ENTRYWAYS & CIRCULATION ================= */}
      {layoutType !== 'studio' && (
        <>
          <ArchitecturalDoor pos={[-width * 0.2, 0, w1]} />
          <ArchitecturalDoor pos={[-width / 2 + 2, 0, w3]} />
          {layoutType === '2bhk' && <ArchitecturalDoor pos={[width / 2 - 2, 0, w3]} swingInvert={true} />}
        </>
      )}

      {/* ================= 1. FRONT ZONE: PARKING & GARDEN ================= */}
      <group position={[0, 0, cPark]}>
        <RoomLabel name="Front Garden & Driveway" w={width} l={dPark} pos={[0, 0.02, dPark/3]} />
        
        {/* LUSH BOTANICAL GARDEN */}
        <group position={[-width/2 + 4, 0, 0]}>
          <mesh castShadow position={[0, 0.2, 0]}><boxGeometry args={[6, 0.4, dPark - 2]} /><meshStandardMaterial color="#27272a" roughness={0.9} /></mesh>
          <mesh receiveShadow position={[0, 0.41, 0]}><boxGeometry args={[5.6, 0.05, dPark - 2.4]} /><meshStandardMaterial color="#1c1917" /></mesh>
          
          {/* Modern Tree */}
          <mesh castShadow position={[1.5, 1, 1]}><cylinderGeometry args={[0.1, 0.1, 2]} /><meshStandardMaterial color="#451a03" /></mesh>
          <mesh castShadow position={[1.5, 2.5, 1]}><sphereGeometry args={[1.2, 16, 16]} /><meshStandardMaterial color="#166534" roughness={0.8} /></mesh>

          {/* Bushes & Flowers */}
          <group position={[-1.5, 0.4, -0.5]}>
            <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.03, 0.03, 0.8]} /><meshStandardMaterial color="#4ade80" /></mesh>
            <mesh position={[0, 0.8, 0]}><sphereGeometry args={[0.3, 16, 16]} /><meshStandardMaterial color="#f43f5e" roughness={0.3} /></mesh>
          </group>
          <group position={[1.5, 0.4, -1.5]}>
            <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.03, 0.03, 1]} /><meshStandardMaterial color="#4ade80" /></mesh>
            <mesh position={[0, 1, 0]}><sphereGeometry args={[0.3, 16, 16]} /><meshStandardMaterial color="#eab308" roughness={0.3} /></mesh>
          </group>
          <mesh castShadow position={[-0.5, 0.7, 0.8]}><sphereGeometry args={[0.6, 16, 16]} /><meshStandardMaterial color="#15803d" roughness={0.8} /></mesh>
        </group>

        {/* ULTRA-PREMIUM EXECUTIVE SEDAN */}
        <group position={[width/4 - 1, 0, 0]}>
          {/* Chassis */}
          <mesh castShadow position={[0, 0.6, 0]}><boxGeometry args={[2.5, 0.6, 5.2]} /><meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} /></mesh>
          <mesh castShadow position={[0, 1.25, -0.2]}><boxGeometry args={[2, 0.6, 2.6]} /><meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} /></mesh>
          <mesh position={[0, 1.26, -0.2]}><boxGeometry args={[2.02, 0.52, 2.62]} /><meshStandardMaterial color="#020617" metalness={1} roughness={0} /></mesh>
          {/* Spoiler */}
          <mesh castShadow position={[0, 1.0, -2.4]}><boxGeometry args={[2.4, 0.1, 0.4]} /><meshStandardMaterial color="#0f172a" metalness={0.9} /></mesh>
          
          {/* Alloy Wheels */}
          {[-1.3, 1.3].map((x) => [-1.6, 1.6].map((z) => (
            <group key={`${x}-${z}`} position={[x, 0.4, z]} rotation={[0, 0, Math.PI / 2]}>
              <mesh castShadow><cylinderGeometry args={[0.45, 0.45, 0.35, 32]} /><meshStandardMaterial color="#18181b" roughness={0.8} /></mesh>
              <mesh position={[0, 0.18, 0]}><cylinderGeometry args={[0.25, 0.25, 0.02, 16]} /><meshStandardMaterial color="#a1a1aa" metalness={1} /></mesh>
            </group>
          )))}
          {/* LED Lights */}
          <mesh position={[-0.8, 0.75, 2.61]}><boxGeometry args={[0.4, 0.15, 0.05]} /><meshStandardMaterial color="#fef08a" emissive="#ffffff" emissiveIntensity={lightInt} /></mesh>
          <mesh position={[0.8, 0.75, 2.61]}><boxGeometry args={[0.4, 0.15, 0.05]} /><meshStandardMaterial color="#fef08a" emissive="#ffffff" emissiveIntensity={lightInt} /></mesh>
          <mesh position={[-0.8, 0.75, -2.61]}><boxGeometry args={[0.4, 0.15, 0.05]} /><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={lightInt} /></mesh>
          <mesh position={[0.8, 0.75, -2.61]}><boxGeometry args={[0.4, 0.15, 0.05]} /><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={lightInt} /></mesh>
        </group>
      </group>

      {/* ================= 2. RECEPTION ZONE: LIVING & DINING ================= */}
      <group position={[0, 0, cLiv]}>
        <RoomLabel name="Executive Lounge" w={width} l={dLiv} pos={[0, 0.02, -dLiv/3]} />
        <pointLight position={[0, 5, 0]} intensity={lightInt} color="#fef08a" distance={30} />
        
        {/* Media Center Wall Console */}
        <group position={[0, 0, dLiv/2 - 0.3]}>
          <mesh castShadow position={[0, 3, 0]}><boxGeometry args={[9, 4.5, 0.15]} /><meshStandardMaterial color="#27272a" roughness={0.7} /></mesh>
          <mesh position={[0, 3.2, 0.1]}><boxGeometry args={[7, 3, 0.1]} /><meshStandardMaterial color="#020617" roughness={0.2} metalness={0.8} /></mesh>
          {/* Floating Shelf with Soundbar & Decor */}
          <mesh castShadow position={[0, 1.2, 0.4]}><boxGeometry args={[7, 0.1, 0.8]} /><meshStandardMaterial color="#d4d4d8" /></mesh>
          <mesh castShadow position={[0, 1.3, 0.4]}><boxGeometry args={[4, 0.15, 0.2]} /><meshStandardMaterial color="#18181b" /></mesh> {/* Soundbar */}
          <mesh castShadow position={[2, 1.4, 0.4]}><boxGeometry args={[0.5, 0.3, 0.4]} /><meshStandardMaterial color="#fcd34d" /></mesh> {/* Book */}
          {/* Cinematic LED Glow */}
          <mesh position={[0, 3.2, -0.05]}><boxGeometry args={[7.2, 3.2, 0.1]} /><meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={lampInt * 0.5} /></mesh>
        </group>

        {/* Premium Sectional Sofa */}
        <group position={[-width/2 + 5, 0, -1]}>
          <mesh receiveShadow position={[1, 0.01, 1]}><boxGeometry args={[8, 0.02, 8]} /><meshStandardMaterial color="#f1f5f9" roughness={1} /></mesh>
          <mesh castShadow position={[0, 0.5, 1]}><boxGeometry args={[3.2, 0.7, 6.2]} /><meshStandardMaterial color="#475569" roughness={0.9} /></mesh>
          <mesh castShadow position={[-1.2, 1.4, 1]}><boxGeometry args={[0.8, 1.5, 6.2]} /><meshStandardMaterial color="#334155" roughness={0.9} /></mesh>
          {/* Armrests */}
          <mesh castShadow position={[0, 1, 3.7]}><boxGeometry args={[3.2, 0.8, 0.8]} /><meshStandardMaterial color="#475569" /></mesh>
          <mesh castShadow position={[0, 1, -1.7]}><boxGeometry args={[3.2, 0.8, 0.8]} /><meshStandardMaterial color="#475569" /></mesh>
          
          <mesh position={[-0.6, 1.1, -1]} rotation={[0, 0, 0.2]}><boxGeometry args={[0.4, 0.8, 0.8]} /><meshStandardMaterial color="#f43f5e" /></mesh>
          <mesh position={[-0.6, 1.1, 2]} rotation={[0, 0, -0.2]}><boxGeometry args={[0.4, 0.8, 0.8]} /><meshStandardMaterial color="#eab308" /></mesh>
          
          {/* Glass Specular Coffee Table */}
          <mesh castShadow position={[2.8, 0.7, 1]}><cylinderGeometry args={[1.4, 1.4, 0.08, 32]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.2} metalness={1} roughness={0} /></mesh>
          <mesh position={[2.8, 0.35, 1]}><cylinderGeometry args={[0.8, 0.8, 0.7, 32]} /><meshStandardMaterial color="#111827" /></mesh>
        </group>

        {/* Abstract Canvas Art */}
        <group position={[-width/2 + 0.1, 4, -1]}>
          <mesh castShadow><boxGeometry args={[0.1, 2.5, 4.5]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh position={[0.06, 0, 0]}><boxGeometry args={[0.02, 2.3, 4.3]} /><meshStandardMaterial color="#0f172a" /></mesh>
          <mesh position={[0.08, -0.2, 0.5]} rotation={[0.2, 0, 0]}><boxGeometry args={[0.02, 1.5, 0.8]} /><meshStandardMaterial color="#fbbf24" metalness={0.8} /></mesh>
        </group>

        {/* Indoor Plant */}
        <group position={[-width/2 + 1.5, 0, 2.5]}>
          <mesh castShadow position={[0, 0.5, 0]}><cylinderGeometry args={[0.4, 0.3, 1, 32]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh castShadow position={[0, 1.5, 0]}><sphereGeometry args={[0.8, 16, 16]} /><meshStandardMaterial color="#15803d" /></mesh>
        </group>

        {/* 6-Seater Modern Dining Suite */}
        <group position={[width/2 - 4.5, 0, 0]}>
          {/* Glass Top */}
          <mesh castShadow position={[0, 1.45, 0]}><boxGeometry args={[3.8, 0.05, 5.6]} /><meshStandardMaterial color="#bae6fd" transparent opacity={0.6} metalness={0.9} roughness={0.1} /></mesh>
          <mesh castShadow position={[0, 1.4, 0]}><boxGeometry args={[3.6, 0.1, 5.4]} /><meshStandardMaterial color="#18181b" roughness={0.5} /></mesh>
          <mesh position={[0, 0.7, 0]}><boxGeometry args={[2.8, 1.4, 4.2]} /><meshStandardMaterial color="#71717a" metalness={0.9} /></mesh>
          {[-2.2, 2.2].map((x) => [-1.6, 0, 1.6].map((z) => (
            <group key={`${x}-${z}`} position={[x, 0, z]}>
              <mesh castShadow position={[0, 0.6, 0]}><boxGeometry args={[0.8, 1.2, 0.8]} /><meshStandardMaterial color="#e4e4e7" /></mesh>
              <mesh castShadow position={[0, 1.4, 0]}><boxGeometry args={[0.2, 0.8, 0.8]} /><meshStandardMaterial color="#d4d4d8" /></mesh>
            </group>
          )))}
        </group>
      </group>

      {/* ================= 3. UTILITY ZONE: KITCHEN & SANITARY AREA ================= */}
      <group position={[0, 0, cKit]}>
        <pointLight position={[0, 5, 0]} intensity={lightInt} color="#e0f2fe" distance={20} />

        {/* DETAILED MODULAR KITCHEN STUDIO */}
        <group position={[width/2 - 3.2, 0, 0]}>
          <RoomLabel name="Modular Kitchen" w={width/2 - 2} l={dKit} pos={[-1, 0.02, 0]} />
          
          <mesh castShadow position={[0, 1.45, 0]}><boxGeometry args={[3.8, 0.15, dKit - 0.4]} /><meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.1} /></mesh>
          <mesh castShadow position={[0, 0.65, 0]}><boxGeometry args={[3.6, 1.3, dKit - 0.6]} /><meshStandardMaterial color="#1e293b" roughness={0.8} /></mesh>
          <mesh castShadow position={[-1.8, 1.45, dKit/2 - 1.7]}><boxGeometry args={[3.6, 0.15, 3]} /><meshStandardMaterial color="#09090b" metalness={0.8} /></mesh>
          <mesh castShadow position={[-1.8, 0.65, dKit/2 - 1.7]}><boxGeometry args={[3.2, 1.3, 2.6]} /><meshStandardMaterial color="#1e293b" /></mesh>

          {/* Cooktop & Chimney */}
          <group position={[-1.8, 1.55, dKit/2 - 1.7]}>
            <mesh><boxGeometry args={[1.6, 0.04, 2]} /><meshStandardMaterial color="#18181b" /></mesh>
            <mesh position={[-0.4, 0.04, 0.4]}><cylinderGeometry args={[0.22, 0.22, 0.05, 16]} /><meshStandardMaterial color="#000" /></mesh>
            <mesh position={[0.4, 0.04, -0.4]}><cylinderGeometry args={[0.22, 0.22, 0.05, 16]} /><meshStandardMaterial color="#000" /></mesh>
          </group>
          <mesh castShadow position={[-1.8, 4.6, dKit/2 - 1.7]}><boxGeometry args={[2, 0.2, 2.2]} /><meshStandardMaterial color="#71717a" metalness={0.9} /></mesh>
          <mesh castShadow position={[-1.8, 5.6, dKit/2 - 1.7]}><boxGeometry args={[0.8, 1.8, 0.8]} /><meshStandardMaterial color="#71717a" metalness={0.9} /></mesh>

          {/* Built-in Microwave */}
          <group position={[0.5, 2.2, dKit/2 - 0.6]}>
            <mesh castShadow><boxGeometry args={[1.2, 0.8, 0.8]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
            <mesh position={[0, 0, -0.41]}><boxGeometry args={[1, 0.6, 0.02]} /><meshStandardMaterial color="#000000" metalness={1} /></mesh>
          </group>

          {/* Sink & Faucet */}
          <mesh position={[0.8, 1.46, -1]}><boxGeometry args={[1.4, 0.16, 1.8]} /><meshStandardMaterial color="#52525b" metalness={0.9} roughness={0.2} /></mesh>
          <mesh position={[0.8, 1.8, -1.7]} rotation={[0.2, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 0.5]} /><meshStandardMaterial color="#e4e4e7" metalness={1} /></mesh>

          {/* Double-Door Fridge */}
          <group position={[1.2, 2.6, -dKit/2 + 1.8]}>
            <mesh castShadow><boxGeometry args={[2.4, 5.2, 2.4]} /><meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} /></mesh>
            <mesh position={[-0.1, 0, -1.21]}><boxGeometry args={[0.05, 2, 0.05]} /><meshStandardMaterial color="#18181b" metalness={1} /></mesh>
            <mesh position={[0.1, 0, -1.21]}><boxGeometry args={[0.05, 2, 0.05]} /><meshStandardMaterial color="#18181b" metalness={1} /></mesh>
          </group>
        </group>

        {/* DETAILED SANITARY MASTER BATHROOM */}
        <group position={[-width/2 + 3.2, 0, 0]}>
          <RoomLabel name="Luxury Bath" w={width/2 - 2} l={dKit} pos={[1, 0.02, 0]} />
          
          <mesh castShadow position={[-0.8, 3, -dKit/2 + 2.2]}><boxGeometry args={[3.2, 6, 3.2]} /><meshStandardMaterial color="#bae6fd" transparent opacity={0.2} metalness={0.9} roughness={0} /></mesh>
          <mesh position={[-2, 5.2, -dKit/2 + 2.2]} rotation={[0, 0, -Math.PI / 6]}><cylinderGeometry args={[0.08, 0.08, 0.4]} /><meshStandardMaterial color="#94a3b8" metalness={1} /></mesh>

          <mesh castShadow position={[-0.6, 1.4, dKit/2 - 1.8]}><boxGeometry args={[2.6, 0.2, 1.8]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh castShadow position={[-0.6, 1.6, dKit/2 - 1.8]}><cylinderGeometry args={[0.6, 0.5, 0.25, 32]} /><meshStandardMaterial color="#ffffff" roughness={0.1} /></mesh>
          <mesh position={[-1.8, 3.8, dKit/2 - 1.8]}><boxGeometry args={[0.06, 2.4, 1.6]} /><meshStandardMaterial color="#e0f2fe" metalness={1} roughness={0} /></mesh>

          <mesh castShadow position={[1.4, 0.6, dKit/2 - 1.8]}><cylinderGeometry args={[0.65, 0.55, 1.2, 32]} /><meshStandardMaterial color="#ffffff" roughness={0.1} /></mesh>
          <mesh castShadow position={[1.4, 1.6, dKit/2 - 1.1]}><boxGeometry args={[1.3, 1.4, 0.45]} /><meshStandardMaterial color="#ffffff" roughness={0.1} /></mesh>
        </group>
      </group>

      {/* ================= 4. PRIVACY ZONE: MASTER & GUEST BEDROOMS ================= */}
      <group position={[0, 0, cBed]}>
        
        {/* PRIVACY MASTER BEDROOM MODULE */}
        <group position={[masterBedX, 0, 0]}>
          <RoomLabel name="Master Suite" w={layoutType === '2bhk' ? width/2 - 1 : width} l={dBed} pos={[0, 0.02, 1.5]} />
          <mesh receiveShadow position={[0, 0.02, -0.2]}><boxGeometry args={[8.5, 0.02, 8.5]} /><meshStandardMaterial color="#94a3b8" roughness={1} /></mesh>
          
          <mesh castShadow position={[0, 2.2, -dBed/2 + 0.4]}><boxGeometry args={[7.2, 3.2, 0.6]} /><meshStandardMaterial color="#0f172a" roughness={0.8} /></mesh>
          <mesh position={[0, 2.2, -dBed/2 + 0.15]}><boxGeometry args={[7.4, 3.4, 0.1]} /><meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={lampInt * 0.4} /></mesh>
          
          <mesh castShadow position={[0, 0.5, -dBed/2 + 4.5]}><boxGeometry args={[6.4, 0.9, 8.2]} /><meshStandardMaterial color="#1c1917" /></mesh>
          <mesh castShadow position={[0, 1.1, -dBed/2 + 4.5]}><boxGeometry args={[6.1, 0.5, 7.8]} /><meshStandardMaterial color="#ffffff" roughness={0.9} /></mesh>

          {/* DUAL SIDE TABLES & LAMPS */}
          {[-3.8, 3.8].map((xSide) => (
            <group key={xSide} position={[xSide, 0, -dBed/2 + 0.8]}>
              <mesh castShadow position={[0, 0.5, 0]}><boxGeometry args={[1.1, 1, 1.1]} /><meshStandardMaterial color="#1c1917" /></mesh>
              <mesh position={[0, 1.3, 0]}><cylinderGeometry args={[0.25, 0.35, 0.5, 16]} /><meshStandardMaterial color="#fef08a" emissive="#fcd34d" emissiveIntensity={lampInt} /></mesh>
              <pointLight position={[0, 1.6, 0]} intensity={lampInt} color="#fcd34d" distance={8} />
            </group>
          ))}
          <pointLight position={[0, 5, 0]} intensity={lightInt * 0.4} color="#fbcfe8" distance={15} />

          {/* Massive Luxury Wardrobe */}
          <group position={[4.5, 3.5, -dBed/2 + 3]}>
            <mesh castShadow><boxGeometry args={[1.5, 7, 3]} /><meshStandardMaterial color="#1e293b" roughness={0.5} /></mesh>
            <mesh position={[-0.76, 0, -0.5]}><boxGeometry args={[0.02, 3, 0.05]} /><meshStandardMaterial color="#cbd5e1" metalness={1} /></mesh>
            <mesh position={[-0.76, 0, 0.5]}><boxGeometry args={[0.02, 3, 0.05]} /><meshStandardMaterial color="#cbd5e1" metalness={1} /></mesh>
          </group>
        </group>

        {/* PRIVACY GUEST BEDROOM MODULE */}
        {layoutType === '2bhk' && (
          <group position={[width/4 + 1, 0, 0]}>
            <RoomLabel name="Guest Room" w={width/2 - 1} l={dBed} pos={[0, 0.02, 1.5]} />
            <mesh receiveShadow position={[0, 0.02, -0.2]}><boxGeometry args={[8.5, 0.02, 8.5]} /><meshStandardMaterial color="#d4d4d8" roughness={1} /></mesh>

            <mesh castShadow position={[0, 2, -dBed/2 + 0.4]}><boxGeometry args={[6.8, 2.8, 0.5]} /><meshStandardMaterial color="#3f3f46" /></mesh>
            <mesh position={[0, 2, -dBed/2 + 0.15]}><boxGeometry args={[7, 3, 0.1]} /><meshStandardMaterial color="#fdba74" emissive="#fed7aa" emissiveIntensity={lampInt * 0.3} /></mesh>
            
            <mesh castShadow position={[0, 0.45, -dBed/2 + 4.5]}><boxGeometry args={[6.2, 0.8, 8.2]} /><meshStandardMaterial color="#18181b" /></mesh>
            <mesh castShadow position={[0, 1.05, -dBed/2 + 4.5]}><boxGeometry args={[5.9, 0.5, 7.8]} /><meshStandardMaterial color="#f8fafc" roughness={0.9} /></mesh>

            {[-3.6, 3.6].map((xSide) => (
              <group key={xSide} position={[xSide, 0, -dBed/2 + 0.8]}>
                <mesh castShadow position={[0, 0.45, 0]}><boxGeometry args={[1, 0.9, 1]} /><meshStandardMaterial color="#18181b" /></mesh>
                <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.2, 0.3, 0.4, 16]} /><meshStandardMaterial color="#fef08a" emissive="#fed7aa" emissiveIntensity={lampInt} /></mesh>
                <pointLight position={[0, 1.5, 0]} intensity={lampInt} color="#fed7aa" distance={8} />
              </group>
            ))}
            <pointLight position={[0, 5, 0]} intensity={lightInt * 0.4} color="#e0f2fe" distance={15} />

            {/* Guest Wardrobe */}
            <group position={[3.5, 3.5, -dBed/2 + 3]}>
              <mesh castShadow><boxGeometry args={[1.5, 7, 3]} /><meshStandardMaterial color="#0369a1" roughness={0.5} /></mesh>
              <mesh position={[-0.76, 0, 0]}><boxGeometry args={[0.02, 3, 0.05]} /><meshStandardMaterial color="#bae6fd" metalness={1} /></mesh>
            </group>
          </group>
        )}
      </group>

      {/* ================= 5. REAR ZONE: OPEN BALCONY DECK ================= */}
      <group position={[0, 0, cBalc]}>
        <RoomLabel name="Balcony Deck" w={width} l={dBalc} pos={[0, 0.02, 0]} />
        
        <mesh castShadow position={[0, 1.2, 0]}><cylinderGeometry args={[0.9, 0.9, 0.06, 32]} /><meshStandardMaterial color="#18181b" metalness={0.8} /></mesh>
        <mesh castShadow position={[0, 0.6, 0]}><cylinderGeometry args={[0.08, 0.08, 1.2, 16]} /><meshStandardMaterial color="#18181b" metalness={0.9} /></mesh>
        <mesh castShadow position={[-1.8, 0.6, 0]}><boxGeometry args={[0.9, 1.2, 0.9]} /><meshStandardMaterial color="#dc2626" roughness={0.5} /></mesh>
        <mesh castShadow position={[1.8, 0.6, 0]}><boxGeometry args={[0.9, 1.2, 0.9]} /><meshStandardMaterial color="#dc2626" roughness={0.5} /></mesh>
      </group>

    </group>
  );
}