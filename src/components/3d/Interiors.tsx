"use client";
import { useEditorStore } from "@/store/useEditorStore";
import { Text } from "@react-three/drei";

// ================= 1. GLOBAL COMPONENTS (VERCEL ERROR FIX) =================
// Ye components function ke bahar hone chahiye warna Vercel par R3F crash ho jata hai.

const RoomLabel = ({ name, w, l, pos, isNight }: { name: string, w: number, l: number, pos: [number, number, number], isNight: boolean }) => (
  !isNight ? (
    <Text
      position={pos}
      rotation={[-Math.PI / 2, 0, 0]}
      fontSize={w > 30 ? 1.5 : 1.1}
      color="#94a3b8"
      anchorX="center"
      anchorY="middle"
      material-transparent={true}
      material-opacity={0.5}
      material-depthTest={false}
      letterSpacing={0.15}
      fontWeight="900"
    >
      {`${name.toUpperCase()}\n${Math.round(w)}' x ${Math.round(l)}'`}
    </Text>
  ) : null
);

const ArchitecturalDoor = ({ pos, rotation = [0, 0, 0], swingInvert = false }: { pos: [number, number, number], rotation?: [number, number, number], swingInvert?: boolean }) => {
  const swingAngle = swingInvert ? -Math.PI / 2.2 : Math.PI / 2.2; 
  const hingeX = swingInvert ? 1.4 : -1.4;

  return (
    <group position={pos} rotation={rotation}>
      {/* Luxury Wood Frame */}
      <mesh position={[-1.5, 3, 0]}><boxGeometry args={[0.2, 6, 0.4]} /><meshStandardMaterial color="#1c1917" roughness={0.9} /></mesh>
      <mesh position={[1.5, 3, 0]}><boxGeometry args={[0.2, 6, 0.4]} /><meshStandardMaterial color="#1c1917" roughness={0.9} /></mesh>
      <mesh position={[0, 5.9, 0]}><boxGeometry args={[3.2, 0.2, 0.4]} /><meshStandardMaterial color="#1c1917" roughness={0.9} /></mesh>
      
      {/* Door Leaf */}
      <group position={[hingeX, 0, 0]} rotation={[0, swingAngle, 0]}>
        <mesh position={[-hingeX, 2.9, 0]}><boxGeometry args={[2.8, 5.6, 0.12]} /><meshStandardMaterial color="#292524" roughness={0.6} /></mesh>
        {/* Designer Grooves */}
        <mesh position={[-hingeX, 2.9, 0.07]}><boxGeometry args={[2.5, 5.2, 0.02]} /><meshStandardMaterial color="#3f3f46" roughness={0.8} /></mesh>
        {/* Vertical Chrome Handles */}
        <mesh position={[-hingeX + (swingInvert ? -1.1 : 1.1), 3, 0.15]}><boxGeometry args={[0.04, 1.5, 0.04]} /><meshPhysicalMaterial color="#e4e4e7" metalness={1} roughness={0.2} /></mesh>
        <mesh position={[-hingeX + (swingInvert ? -1.1 : 1.1), 3, -0.15]}><boxGeometry args={[0.04, 1.5, 0.04]} /><meshPhysicalMaterial color="#e4e4e7" metalness={1} roughness={0.2} /></mesh>
      </group>
    </group>
  );
};

const SplitAC = ({ pos, rot, isNight }: { pos: [number, number, number], rot: [number, number, number], isNight: boolean }) => (
  <group position={pos} rotation={rot}>
    <mesh castShadow><boxGeometry args={[3.2, 0.9, 0.8]} /><meshPhysicalMaterial color="#f8fafc" roughness={0.1} clearcoat={1} /></mesh>
    <mesh position={[0, 0.45, 0]}><boxGeometry args={[3.2, 0.1, 0.8]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
    <mesh position={[0, -0.2, 0.41]}><boxGeometry args={[3.2, 0.05, 0.02]} /><meshStandardMaterial color="#94a3b8" metalness={1} /></mesh>
    <mesh position={[0, -0.4, 0.2]} rotation={[0.2, 0, 0]}><boxGeometry args={[3, 0.1, 0.4]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
    <mesh position={[1, -0.1, 0.41]}><boxGeometry args={[0.4, 0.2, 0.02]} /><meshStandardMaterial color="#000" /></mesh>
    {/* Digital Temperature Glow */}
    <mesh position={[1, -0.1, 0.42]}><boxGeometry args={[0.2, 0.1, 0.01]} /><meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={isNight ? 2 : 0} /></mesh>
  </group>
);


// ================= 2. MAIN INTERIOR COMPONENT =================

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

  const isNight = lightingTheme === 'night';
  const lightInt = isNight ? 2 : 0;
  const lampInt = isNight ? 3 : 0;
  const screenGlow = isNight ? 2.5 : 0.5;

  return (
    <group>
      {/* Global Illumination */}
      <ambientLight intensity={isNight ? 0.2 : 1.2} />

      {/* ================= ENTRYWAYS (Perfectly Aligned Flow) ================= */}
      {layoutType !== 'studio' && (
        <>
          <ArchitecturalDoor pos={[-width * 0.25, 0, w1]} /> {/* Main Living Entry */}
          <ArchitecturalDoor pos={[-width * 0.25, 0, w3]} /> {/* Master Bed Entry */}
          {layoutType === '2bhk' && <ArchitecturalDoor pos={[width * 0.25, 0, w3]} swingInvert={true} />} {/* Guest Bed Entry */}
        </>
      )}

      {/* ================= 1. FRONT ZONE: PARKING & GARDEN ================= */}
      <group position={[0, 0, cPark]}>
        <RoomLabel name="Driveway & Garden" w={width} l={dPark} pos={[0, 0.05, dPark/3]} isNight={isNight} />
        
        {/* Luxury Compound Sliding Gate (Front Boundary Alignment) */}
        <group position={[0, 0, dPark/2 - 0.2]}>
          <mesh castShadow position={[-width/2 + 0.5, 2.5, 0]}><boxGeometry args={[1, 5, 1]} /><meshStandardMaterial color="#1c1917" /></mesh>
          <mesh castShadow position={[width/2 - 0.5, 2.5, 0]}><boxGeometry args={[1, 5, 1]} /><meshStandardMaterial color="#1c1917" /></mesh>
          <group position={[width/4, 2, 0]}>
            <mesh><boxGeometry args={[width/2 - 1, 4, 0.2]} /><meshPhysicalMaterial color="#0f172a" metalness={0.9} roughness={0.2} /></mesh>
            {[-3, -1.5, 0, 1.5, 3].map(x => (
              <mesh key={x} position={[x, 0, 0.15]}><boxGeometry args={[0.1, 4, 0.05]} /><meshPhysicalMaterial color="#fbbf24" metalness={1} roughness={0.1} /></mesh>
            ))}
          </group>
        </group>

        {/* LUSH BOTANICAL GARDEN */}
        <group position={[-width/2 + 4, 0, 0]}>
          <mesh castShadow position={[0, 0.2, 0]}><boxGeometry args={[6, 0.4, dPark - 2]} /><meshStandardMaterial color="#27272a" roughness={0.9} /></mesh>
          <mesh receiveShadow position={[0, 0.41, 0]}><boxGeometry args={[5.6, 0.05, dPark - 2.4]} /><meshStandardMaterial color="#1c1917" /></mesh>
          
          {/* Stone Entrance Pathway */}
          {[0, 1.5, 3].map((z) => (
             <group key={z} position={[2, 0.42, z - 1.5]}>
               <mesh><boxGeometry args={[1.5, 0.06, 1]} /><meshStandardMaterial color="#94a3b8" roughness={0.9} /></mesh>
               <mesh position={[1, 0.2, 0]}><cylinderGeometry args={[0.05, 0.05, 0.4]} /><meshStandardMaterial color="#18181b" /></mesh>
               <mesh position={[1, 0.4, 0]}><sphereGeometry args={[0.06, 16, 16]} /><meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={lampInt} /></mesh>
             </group>
          ))}

          <mesh castShadow position={[0, 1, 1]}><cylinderGeometry args={[0.1, 0.1, 2]} /><meshStandardMaterial color="#451a03" /></mesh>
          <mesh castShadow position={[0, 2.5, 1]}><sphereGeometry args={[1.2, 16, 16]} /><meshStandardMaterial color="#166534" roughness={0.8} /></mesh>
          <group position={[-1.5, 0.4, -0.5]}>
            <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.03, 0.03, 0.8]} /><meshStandardMaterial color="#4ade80" /></mesh>
            <mesh position={[0, 0.8, 0]}><sphereGeometry args={[0.3, 16, 16]} /><meshStandardMaterial color="#f43f5e" roughness={0.3} /></mesh>
          </group>
          <mesh castShadow position={[-0.5, 0.7, 0.8]}><sphereGeometry args={[0.6, 16, 16]} /><meshStandardMaterial color="#15803d" roughness={0.8} /></mesh>
        </group>

        {/* Smart Home EV Wall Charger */}
        <group position={[width/4 + 2, 1.5, -dPark/2 + 0.2]}>
          <mesh castShadow><boxGeometry args={[0.6, 1, 0.2]} /><meshStandardMaterial color="#18181b" /></mesh>
          <mesh position={[0, 0.2, 0.11]}><boxGeometry args={[0.4, 0.2, 0.02]} /><meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={lampInt} /></mesh>
          <mesh position={[-0.2, -0.6, 0.05]}><cylinderGeometry args={[0.02, 0.02, 1.2]} /><meshStandardMaterial color="#3f3f46" /></mesh>
        </group>

        {/* ULTRA-PREMIUM EXECUTIVE SEDAN (Perfectly Aligned in Driveway) */}
        <group position={[width/4 - 1, 0.1, 0]}>
          {/* Main Body */}
          <mesh castShadow position={[0, 0.6, 0]}><boxGeometry args={[2.8, 0.6, 5.2]} /><meshPhysicalMaterial color="#020617" metalness={0.9} roughness={0.1} clearcoat={1} clearcoatRoughness={0.1} /></mesh>
          <mesh castShadow position={[0, 1.25, -0.2]}><boxGeometry args={[2.2, 0.6, 2.6]} /><meshPhysicalMaterial color="#0f172a" metalness={0.8} roughness={0.2} clearcoat={1} /></mesh>
          {/* Windows */}
          <mesh position={[0, 1.26, -0.2]}><boxGeometry args={[2.25, 0.52, 2.62]} /><meshPhysicalMaterial color="#000000" metalness={1} roughness={0} clearcoat={1} /></mesh>
          {/* Spoiler & Grille */}
          <mesh castShadow position={[0, 1.0, -2.4]}><boxGeometry args={[2.4, 0.1, 0.4]} /><meshStandardMaterial color="#0f172a" metalness={0.9} /></mesh> 
          <mesh position={[0, 0.6, 2.61]}><boxGeometry args={[2, 0.3, 0.05]} /><meshStandardMaterial color="#000000" /></mesh> 

          {/* Alloy Wheels */}
          {[-1.4, 1.4].map((x) => [-1.6, 1.6].map((z) => (
            <group key={`${x}-${z}`} position={[x, 0.4, z]} rotation={[0, 0, Math.PI / 2]}>
              <mesh castShadow><cylinderGeometry args={[0.45, 0.45, 0.35, 32]} /><meshStandardMaterial color="#09090b" roughness={0.9} /></mesh>
              <mesh position={[0, (x > 0 ? 0.18 : -0.18), 0]}><cylinderGeometry args={[0.25, 0.25, 0.02, 16]} /><meshPhysicalMaterial color="#cbd5e1" metalness={1} roughness={0.1} /></mesh>
            </group>
          )))}

          {/* Cinematic Headlights & Taillights */}
          <mesh position={[-0.9, 0.75, 2.61]}><boxGeometry args={[0.6, 0.15, 0.05]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={lightInt} /></mesh>
          <mesh position={[0.9, 0.75, 2.61]}><boxGeometry args={[0.6, 0.15, 0.05]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={lightInt} /></mesh>
          <pointLight position={[0, 0.75, 3.5]} intensity={lightInt * 1.5} color="#ffffff" distance={12} />
          
          <mesh position={[0, 0.75, -2.61]}><boxGeometry args={[2.6, 0.08, 0.05]} /><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={lightInt * 2} /></mesh>
        </group>
      </group>

      {/* ================= 2. RECEPTION ZONE: LIVING & DINING ================= */}
      <group position={[0, 0, cLiv]}>
        <RoomLabel name="Executive Lounge" w={width} l={dLiv} pos={[0, 0.05, -dLiv/3]} isNight={isNight} />
        <pointLight position={[0, 5, 0]} intensity={lightInt} color="#fef08a" distance={30} />
        
        <SplitAC pos={[0, 4.5, dLiv/2 - 0.5]} rot={[0, Math.PI, 0]} isNight={isNight} />

        {/* Media Center with Gaming Console */}
        <group position={[0, 0, dLiv/2 - 0.3]}>
          <mesh castShadow position={[0, 3, 0]}><boxGeometry args={[10, 5, 0.15]} /><meshStandardMaterial color="#1c1917" roughness={0.7} /></mesh>
          
          {/* OLED TV with Intense Glow */}
          <mesh position={[0, 3.2, 0.1]}><boxGeometry args={[7.5, 3.5, 0.05]} /><meshPhysicalMaterial color="#020617" emissive="#1e40af" emissiveIntensity={screenGlow} roughness={0.1} metalness={0.9} clearcoat={1} /></mesh>
          <mesh position={[0, 3.2, -0.05]}><boxGeometry args={[7.8, 3.8, 0.1]} /><meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={lampInt * 0.4} /></mesh>
          
          <mesh castShadow position={[0, 1.2, 0.4]}><boxGeometry args={[9, 0.1, 1]} /><meshStandardMaterial color="#27272a" /></mesh>
          <mesh castShadow position={[0, 1.3, 0.4]}><boxGeometry args={[5, 0.15, 0.2]} /><meshStandardMaterial color="#09090b" metalness={0.8} /></mesh> 
          
          {/* Apple HomePod & PS5 */}
          <mesh castShadow position={[-3.5, 1.4, 0.4]}><cylinderGeometry args={[0.2, 0.2, 0.4, 32]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[-3.5, 1.6, 0.4]}><cylinderGeometry args={[0.15, 0.15, 0.02, 32]} /><meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={lampInt} /></mesh>
          
          <group position={[3.5, 1.45, 0.4]}>
             <mesh><boxGeometry args={[0.3, 0.6, 0.6]} /><meshStandardMaterial color="#f8fafc" /></mesh>
             <mesh position={[0, 0, 0]}><boxGeometry args={[0.2, 0.55, 0.65]} /><meshStandardMaterial color="#000" /></mesh>
             <mesh position={[0, 0.2, 0.35]}><boxGeometry args={[0.05, 0.05, 0.05]} /><meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={lampInt} /></mesh>
          </group>
        </group>

        {/* Premium Sectional Sofa with Physical Glass Table */}
        <group position={[-width/2 + 5, 0, -1]}>
          <mesh receiveShadow position={[1, 0.01, 1]}><boxGeometry args={[8, 0.02, 8]} /><meshStandardMaterial color="#f1f5f9" roughness={1} /></mesh>
          <mesh castShadow position={[0, 0.5, 1]}><boxGeometry args={[3.2, 0.7, 6.2]} /><meshStandardMaterial color="#334155" roughness={0.9} /></mesh>
          <mesh castShadow position={[-1.2, 1.4, 1]}><boxGeometry args={[0.8, 1.5, 6.2]} /><meshStandardMaterial color="#1e293b" roughness={0.9} /></mesh>
          <mesh castShadow position={[0, 1, 3.7]}><boxGeometry args={[3.2, 0.8, 0.8]} /><meshStandardMaterial color="#334155" /></mesh>
          <mesh castShadow position={[0, 1, -1.7]}><boxGeometry args={[3.2, 0.8, 0.8]} /><meshStandardMaterial color="#334155" /></mesh>
          
          <mesh position={[-0.6, 1.1, -1]} rotation={[0.1, 0, 0.2]}><boxGeometry args={[0.4, 0.8, 0.8]} /><meshStandardMaterial color="#f43f5e" /></mesh>
          <mesh position={[-0.6, 1.1, 2]} rotation={[0.1, 0, -0.2]}><boxGeometry args={[0.4, 0.8, 0.8]} /><meshStandardMaterial color="#eab308" /></mesh>
          
          <mesh castShadow position={[2.8, 0.7, 1]}><cylinderGeometry args={[1.4, 1.4, 0.05, 32]} /><meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.1} thickness={0.5} /></mesh>
          <mesh position={[2.8, 0.35, 1]}><cylinderGeometry args={[0.8, 0.8, 0.7, 32]} /><meshStandardMaterial color="#0f172a" /></mesh>

          {/* Luxury Curved Arc Lamp */}
          <mesh castShadow position={[-2, 0.1, -3]}><cylinderGeometry args={[0.5, 0.5, 0.2, 32]} /><meshStandardMaterial color="#18181b" /></mesh>
          <mesh castShadow position={[-2, 2.5, -3]}><cylinderGeometry args={[0.04, 0.04, 5, 16]} /><meshPhysicalMaterial color="#e2e8f0" metalness={1} roughness={0.2} /></mesh>
          <mesh position={[-1, 5, -3]} rotation={[0, 0, Math.PI/4]}><cylinderGeometry args={[0.5, 0.9, 0.8, 16]} /><meshStandardMaterial color="#18181b" /></mesh>
          <mesh position={[-0.8, 4.8, -3]} rotation={[0, 0, Math.PI/4]}><sphereGeometry args={[0.4, 16, 16]} /><meshStandardMaterial color="#fef08a" emissive="#fcd34d" emissiveIntensity={lampInt} /></mesh>
        </group>

        {/* Modern Abstract Wall Art */}
        <group position={[-width/2 + 0.1, 4, -1]}>
          <mesh castShadow><boxGeometry args={[0.1, 2.5, 4.5]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh position={[0.06, 0, 0]}><boxGeometry args={[0.02, 2.3, 4.3]} /><meshStandardMaterial color="#0f172a" /></mesh>
          <mesh position={[0.08, -0.2, 0.5]} rotation={[0.2, 0, 0]}><boxGeometry args={[0.02, 1.5, 0.8]} /><meshPhysicalMaterial color="#fbbf24" metalness={1} roughness={0.2} /></mesh>
        </group>

        {/* 6-Seater Modern Dining Suite */}
        <group position={[width/2 - 4.5, 0, 0]}>
          <mesh castShadow position={[0, 1.45, 0]}><boxGeometry args={[4, 0.05, 6]} /><meshPhysicalMaterial color="#bae6fd" transmission={0.8} transparent opacity={1} roughness={0.1} thickness={0.5} /></mesh>
          <mesh castShadow position={[0, 1.4, 0]}><boxGeometry args={[3.8, 0.1, 5.8]} /><meshStandardMaterial color="#09090b" roughness={0.5} /></mesh>
          <mesh position={[0, 0.7, 0]}><boxGeometry args={[2.8, 1.4, 4.2]} /><meshPhysicalMaterial color="#3f3f46" metalness={0.9} roughness={0.1} /></mesh>
          {[-2.2, 2.2].map((x) => [-1.8, 0, 1.8].map((z) => (
            <group key={`${x}-${z}`} position={[x, 0, z]}>
              <mesh castShadow position={[0, 0.6, 0]}><boxGeometry args={[0.8, 1.2, 0.8]} /><meshStandardMaterial color="#d4d4d8" /></mesh>
              <mesh castShadow position={[0, 1.4, 0]}><boxGeometry args={[0.2, 0.8, 0.8]} /><meshStandardMaterial color="#71717a" /></mesh>
            </group>
          )))}
        </group>
      </group>

      {/* ================= 3. UTILITY ZONE: KITCHEN & SANITARY AREA ================= */}
      <group position={[0, 0, cKit]}>
        <pointLight position={[0, 5, 0]} intensity={lightInt} color="#e0f2fe" distance={20} />

        {/* DETAILED MODULAR KITCHEN STUDIO */}
        <group position={[width/2 - 3.2, 0, 0]}>
          <RoomLabel name="Kitchen" w={width/2 - 2} l={dKit} pos={[-1, 0.05, 0]} isNight={isNight} />
          
          <mesh castShadow position={[0, 1.45, 0]}><boxGeometry args={[3.8, 0.15, dKit - 0.4]} /><meshPhysicalMaterial color="#09090b" metalness={0.8} roughness={0.1} clearcoat={1} /></mesh>
          <mesh castShadow position={[0, 0.65, 0]}><boxGeometry args={[3.6, 1.3, dKit - 0.6]} /><meshStandardMaterial color="#1e293b" roughness={0.8} /></mesh>
          
          {/* L-Shape Extended Peninsula / Breakfast Bar */}
          <mesh castShadow position={[-1.8, 1.45, dKit/2 - 1.7]}><boxGeometry args={[3.6, 0.15, 3]} /><meshPhysicalMaterial color="#09090b" metalness={0.8} roughness={0.1} clearcoat={1} /></mesh>
          <mesh castShadow position={[-1.8, 0.65, dKit/2 - 1.7]}><boxGeometry args={[3.2, 1.3, 2.6]} /><meshStandardMaterial color="#1e293b" /></mesh>

          {/* Luxury Espresso Machine */}
          <group position={[-1, 1.8, dKit/2 - 1.2]}>
            <mesh castShadow><boxGeometry args={[0.6, 0.6, 0.5]} /><meshStandardMaterial color="#18181b" metalness={0.8} /></mesh>
            <mesh position={[0, 0, -0.26]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.1, 0.1, 0.05]} /><meshPhysicalMaterial color="#cbd5e1" metalness={1} roughness={0.1} /></mesh>
          </group>

          {/* Bar Stools */}
          <group position={[-2.5, 0, dKit/2 - 0.8]}>
             <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.3, 0.3, 1]} /><meshPhysicalMaterial color="#cbd5e1" metalness={1} roughness={0.1} /></mesh>
             <mesh position={[0, 1, 0]}><cylinderGeometry args={[0.4, 0.4, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
          </group>
          <group position={[-2.5, 0, dKit/2 - 2.2]}>
             <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.3, 0.3, 1]} /><meshPhysicalMaterial color="#cbd5e1" metalness={1} roughness={0.1} /></mesh>
             <mesh position={[0, 1, 0]}><cylinderGeometry args={[0.4, 0.4, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
          </group>

          {/* Kitchen Pendant Lights */}
          {[-1.8, 0].map((xP) => (
             <group key={xP} position={[xP, 5, dKit/2 - 1.7]}>
               <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.02, 0.02, 1]} /><meshStandardMaterial color="#18181b" /></mesh>
               <mesh position={[0, -1, 0]}><cylinderGeometry args={[0.2, 0.3, 0.3]} /><meshPhysicalMaterial color="#cbd5e1" metalness={1} roughness={0.1} /></mesh>
               <mesh position={[0, -1.1, 0]}><sphereGeometry args={[0.15, 16, 16]} /><meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={lampInt} /></mesh>
             </group>
          ))}

          {/* Cooktop & Chimney */}
          <group position={[-1.8, 1.55, dKit/2 - 1.7]}>
            <mesh><boxGeometry args={[1.6, 0.04, 2]} /><meshStandardMaterial color="#18181b" /></mesh>
            <mesh position={[-0.4, 0.04, 0.4]}><cylinderGeometry args={[0.22, 0.22, 0.05, 16]} /><meshStandardMaterial color="#000" /></mesh>
            <mesh position={[0.4, 0.04, -0.4]}><cylinderGeometry args={[0.22, 0.22, 0.05, 16]} /><meshStandardMaterial color="#000" /></mesh>
          </group>
          <mesh castShadow position={[-1.8, 4.6, dKit/2 - 1.7]}><boxGeometry args={[2, 0.2, 2.2]} /><meshPhysicalMaterial color="#71717a" metalness={0.9} roughness={0.1} /></mesh>
          <mesh position={[-1.8, 4.48, dKit/2 - 1.7]}><boxGeometry args={[1.8, 0.05, 2]} /><meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={lampInt * 0.5} /></mesh>
          <mesh castShadow position={[-1.8, 5.6, dKit/2 - 1.7]}><boxGeometry args={[0.8, 1.8, 0.8]} /><meshPhysicalMaterial color="#71717a" metalness={0.9} roughness={0.1} /></mesh>

          {/* Built-in Microwave */}
          <group position={[0.5, 2.2, dKit/2 - 0.6]}>
            <mesh castShadow><boxGeometry args={[1.2, 0.8, 0.8]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
            <mesh position={[0, 0, -0.41]}><boxGeometry args={[1, 0.6, 0.02]} /><meshPhysicalMaterial color="#000000" metalness={1} clearcoat={1} /></mesh>
          </group>

          {/* Sink & Faucet */}
          <mesh position={[0.8, 1.46, -1]}><boxGeometry args={[1.4, 0.16, 1.8]} /><meshPhysicalMaterial color="#52525b" metalness={0.9} roughness={0.2} /></mesh>
          <mesh position={[0.8, 1.8, -1.7]} rotation={[0.2, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 0.5]} /><meshPhysicalMaterial color="#e4e4e7" metalness={1} roughness={0.1} /></mesh>

          {/* Double-Door Fridge */}
          <group position={[1.2, 2.6, -dKit/2 + 1.8]}>
            <mesh castShadow><boxGeometry args={[2.4, 5.2, 2.4]} /><meshPhysicalMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} clearcoat={1} /></mesh>
            <mesh position={[-0.1, 0, -1.21]}><boxGeometry args={[0.05, 2, 0.05]} /><meshPhysicalMaterial color="#18181b" metalness={1} roughness={0.1} /></mesh>
            <mesh position={[0.1, 0, -1.21]}><boxGeometry args={[0.05, 2, 0.05]} /><meshPhysicalMaterial color="#18181b" metalness={1} roughness={0.1} /></mesh>
            <mesh position={[-0.6, 0.2, -1.21]}><boxGeometry args={[0.4, 0.6, 0.05]} /><meshStandardMaterial color="#000000" /></mesh>
          </group>
        </group>

        {/* DETAILED SANITARY MASTER BATHROOM */}
        <group position={[-width/2 + 3.2, 0, 0]}>
          <RoomLabel name="Luxury Bath" w={width/2 - 2} l={dKit} pos={[1, 0.05, 0]} isNight={isNight} />
          
          {/* Glass Shower Cubicle */}
          <mesh castShadow position={[-0.8, 3, -dKit/2 + 2.2]}><boxGeometry args={[3.2, 6, 3.2]} /><meshPhysicalMaterial color="#bae6fd" transmission={0.9} opacity={1} transparent metalness={0.1} roughness={0.1} thickness={0.2} /></mesh>
          <mesh position={[-2, 5.2, -dKit/2 + 2.2]} rotation={[0, 0, -Math.PI / 6]}><cylinderGeometry args={[0.08, 0.08, 0.4]} /><meshPhysicalMaterial color="#94a3b8" metalness={1} roughness={0.1} /></mesh>

          {/* PERFECT TOILET: Commode + Seat + Lid + Tank */}
          <group position={[1.4, 0, dKit/2 - 1.8]}>
             <mesh castShadow position={[0, 0.4, 0]}><cylinderGeometry args={[0.5, 0.4, 0.8, 32]} /><meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} /></mesh>
             <mesh castShadow position={[0, 0.85, 0]} rotation={[Math.PI/2, 0, 0]}><torusGeometry args={[0.5, 0.1, 16, 32]} /><meshPhysicalMaterial color="#f8fafc" roughness={0.2} /></mesh>
             <mesh castShadow position={[0, 1.4, 0.5]} rotation={[0.2, 0, 0]}><cylinderGeometry args={[0.55, 0.55, 0.05, 32]} /><meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} /></mesh>
             <mesh castShadow position={[0, 1.5, 0.7]}><boxGeometry args={[1.5, 3, 0.3]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
             <mesh position={[-0.2, 2, 0.54]}><boxGeometry args={[0.2, 0.1, 0.02]} /><meshPhysicalMaterial color="#94a3b8" metalness={1} roughness={0.2} /></mesh>
             <mesh position={[0.2, 2, 0.54]}><boxGeometry args={[0.15, 0.1, 0.02]} /><meshPhysicalMaterial color="#94a3b8" metalness={1} roughness={0.2} /></mesh>
          </group>

          {/* Floating Vanity */}
          <mesh castShadow position={[-0.6, 1.4, dKit/2 - 1.8]}><boxGeometry args={[2.6, 0.2, 1.8]} /><meshStandardMaterial color="#0f172a" /></mesh>
          <mesh castShadow position={[-0.6, 1.6, dKit/2 - 1.8]}><cylinderGeometry args={[0.6, 0.5, 0.25, 32]} /><meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} /></mesh>
          <mesh position={[-1.8, 3.8, dKit/2 - 1.8]}><boxGeometry args={[0.06, 2.4, 1.6]} /><meshPhysicalMaterial color="#e0f2fe" metalness={1} roughness={0} /></mesh>
        </group>
      </group>

      {/* ================= 4. PRIVACY ZONE: MASTER & GUEST BEDROOMS ================= */}
      <group position={[0, 0, cBed]}>
        
        {/* PRIVACY MASTER BEDROOM MODULE */}
        {/* BED PLACED AGAINST LEFT WALL TO LEAVE A 4FT OPEN CORRIDOR ON THE RIGHT */}
        <group position={[-width/4 + 1.5, 0, 0]}>
          <RoomLabel name="Master Suite" w={layoutType === '2bhk' ? width/2 - 1 : width} l={dBed} pos={[0, 0.05, 1.5]} isNight={isNight} />
          
          <SplitAC pos={[0, 4.5, -dBed/2 + 0.5]} rot={[0, 0, 0]} isNight={isNight} />

          <mesh receiveShadow position={[0, 0.02, -0.2]}><boxGeometry args={[8.5, 0.02, 8.5]} /><meshStandardMaterial color="#94a3b8" roughness={1} /></mesh>
          
          {/* Bed Assembly */}
          <mesh castShadow position={[0, 2.2, -dBed/2 + 0.4]}><boxGeometry args={[7.2, 3.2, 0.6]} /><meshStandardMaterial color="#0f172a" roughness={0.8} /></mesh>
          <mesh position={[0, 2.2, -dBed/2 + 0.15]}><boxGeometry args={[7.4, 3.4, 0.1]} /><meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={lampInt * 0.4} /></mesh>
          <group position={[0, 4.5, -dBed/2 + 0.2]}>
            <mesh><boxGeometry args={[4, 2, 0.1]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
            <mesh position={[0, 0, 0.06]}><boxGeometry args={[3.8, 1.8, 0.02]} /><meshPhysicalMaterial color="#fcd34d" metalness={1} roughness={0.2} /></mesh>
          </group>

          <mesh castShadow position={[0, 0.5, -dBed/2 + 4.5]}><boxGeometry args={[6.4, 0.9, 8.2]} /><meshStandardMaterial color="#1c1917" /></mesh>
          <mesh castShadow position={[0, 1.1, -dBed/2 + 4.5]}><boxGeometry args={[6.1, 0.4, 7.8]} /><meshStandardMaterial color="#ffffff" roughness={0.9} /></mesh>
          <mesh castShadow position={[0, 1.35, -dBed/2 + 5.5]}><boxGeometry args={[6.15, 0.15, 5.8]} /><meshStandardMaterial color="#64748b" roughness={0.9} /></mesh>
          <mesh castShadow position={[-1.5, 1.4, -dBed/2 + 1.2]} rotation={[0.2, 0, 0]}><boxGeometry args={[2.5, 0.3, 1.5]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh castShadow position={[1.5, 1.4, -dBed/2 + 1.2]} rotation={[0.2, 0, 0]}><boxGeometry args={[2.5, 0.3, 1.5]} /><meshStandardMaterial color="#ffffff" /></mesh>

          {/* Bench & Laptop */}
          <mesh castShadow position={[0, 0.6, -dBed/2 + 8.8]}><boxGeometry args={[4, 0.4, 1.2]} /><meshStandardMaterial color="#334155" /></mesh>
          <group position={[1, 0.82, -dBed/2 + 8.8]}>
             <mesh rotation={[0, -0.2, 0]}><boxGeometry args={[0.8, 0.02, 0.6]} /><meshPhysicalMaterial color="#cbd5e1" metalness={1} roughness={0.2} /></mesh>
             <mesh position={[0, 0.25, -0.3]} rotation={[0.4, -0.2, 0]}><boxGeometry args={[0.8, 0.5, 0.02]} /><meshPhysicalMaterial color="#020617" emissive="#3b82f6" emissiveIntensity={screenGlow * 0.5} /></mesh>
          </group>

          {/* Ceiling Fan */}
          <group position={[0, 5.8, -dBed/2 + 4.5]}>
            <mesh><cylinderGeometry args={[0.2, 0.2, 0.4]} /><meshStandardMaterial color="#18181b" /></mesh>
            {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((rot) => (
               <mesh key={rot} position={[Math.cos(rot)*1.2, -0.1, Math.sin(rot)*1.2]} rotation={[0, rot, 0.1]}><boxGeometry args={[2, 0.02, 0.3]} /><meshStandardMaterial color="#451a03" /></mesh>
            ))}
          </group>

          {[-3.8, 3.8].map((xSide) => (
            <group key={xSide} position={[xSide, 0, -dBed/2 + 0.8]}>
              <mesh castShadow position={[0, 0.5, 0]}><boxGeometry args={[1.1, 1, 1.1]} /><meshStandardMaterial color="#1c1917" /></mesh>
              <mesh position={[0, 1.3, 0]}><cylinderGeometry args={[0.25, 0.35, 0.5, 16]} /><meshStandardMaterial color="#fef08a" emissive="#fcd34d" emissiveIntensity={lampInt} /></mesh>
              <pointLight position={[0, 1.6, 0]} intensity={lampInt} color="#fcd34d" distance={8} />
            </group>
          ))}
          <pointLight position={[0, 5, 0]} intensity={lightInt * 0.4} color="#fbcfe8" distance={15} />

          {/* Wardrobe (Placed against the back wall, safely away from corridor) */}
          <group position={[4.5, 3.5, -dBed/2 + 3]}>
            <mesh castShadow><boxGeometry args={[1.5, 7, 3]} /><meshStandardMaterial color="#1e293b" roughness={0.5} /></mesh>
            <mesh position={[-0.76, 0, -0.5]}><boxGeometry args={[0.02, 3, 0.05]} /><meshPhysicalMaterial color="#cbd5e1" metalness={1} roughness={0.1} /></mesh>
            <mesh position={[-0.76, 0, 0.5]}><boxGeometry args={[0.02, 3, 0.05]} /><meshPhysicalMaterial color="#cbd5e1" metalness={1} roughness={0.1} /></mesh>
          </group>
        </group>

        {/* PRIVACY GUEST BEDROOM MODULE */}
        {/* BED PLACED AGAINST RIGHT WALL TO LEAVE A 4FT OPEN CORRIDOR ON THE LEFT */}
        {layoutType === '2bhk' && (
          <group position={[width/4 - 1.5, 0, 0]}>
            <RoomLabel name="Guest Room & Study" w={width/2 - 1} l={dBed} pos={[0, 0.05, 1.5]} isNight={isNight} />
            
            <SplitAC pos={[0, 4.5, -dBed/2 + 0.5]} rot={[0, 0, 0]} isNight={isNight} />

            <mesh receiveShadow position={[0, 0.02, -0.2]}><boxGeometry args={[8.5, 0.02, 8.5]} /><meshStandardMaterial color="#d4d4d8" roughness={1} /></mesh>

            <mesh castShadow position={[0, 2, -dBed/2 + 0.4]}><boxGeometry args={[6.8, 2.8, 0.5]} /><meshStandardMaterial color="#3f3f46" /></mesh>
            <mesh castShadow position={[0, 0.45, -dBed/2 + 4.5]}><boxGeometry args={[6.2, 0.8, 8.2]} /><meshStandardMaterial color="#18181b" /></mesh>
            <mesh castShadow position={[0, 1.05, -dBed/2 + 4.5]}><boxGeometry args={[5.9, 0.5, 7.8]} /><meshStandardMaterial color="#f8fafc" roughness={0.9} /></mesh>
            <mesh castShadow position={[0, 1.4, -dBed/2 + 1.2]} rotation={[0.2, 0, 0]}><boxGeometry args={[4, 0.3, 1.5]} /><meshStandardMaterial color="#ffffff" /></mesh>

            {/* Study Desk & Ultra-Wide Monitor */}
            <group position={[-2.5, 0, dBed/2 - 2]}>
              <mesh castShadow position={[0, 1.5, 0]}><boxGeometry args={[3, 0.1, 1.5]} /><meshStandardMaterial color="#18181b" /></mesh>
              <mesh castShadow position={[-1.4, 0.75, 0]}><boxGeometry args={[0.1, 1.5, 1.5]} /><meshStandardMaterial color="#18181b" /></mesh>
              <mesh castShadow position={[1.4, 0.75, 0]}><boxGeometry args={[0.1, 1.5, 1.5]} /><meshStandardMaterial color="#18181b" /></mesh>
              <mesh position={[0, 2.2, -0.5]}><boxGeometry args={[2.2, 1, 0.1]} /><meshPhysicalMaterial color="#020617" emissive="#3b82f6" emissiveIntensity={screenGlow * 0.8} clearcoat={1} /></mesh>
              <mesh position={[0, 1.6, -0.5]}><boxGeometry args={[0.2, 0.2, 0.2]} /><meshStandardMaterial color="#18181b" /></mesh>
              <mesh castShadow position={[0, 0.8, 0.5]}><boxGeometry args={[1, 0.1, 1]} /><meshStandardMaterial color="#475569" /></mesh>
              <mesh castShadow position={[0, 0.4, 0.5]}><cylinderGeometry args={[0.05, 0.05, 0.8]} /><meshPhysicalMaterial color="#94a3b8" metalness={1} roughness={0.2} /></mesh>
            </group>

            {[-3.6, 3.6].map((xSide) => (
              <group key={xSide} position={[xSide, 0, -dBed/2 + 0.8]}>
                <mesh castShadow position={[0, 0.45, 0]}><boxGeometry args={[1, 0.9, 1]} /><meshStandardMaterial color="#18181b" /></mesh>
                <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.2, 0.3, 0.4, 16]} /><meshStandardMaterial color="#fef08a" emissive="#fed7aa" emissiveIntensity={lampInt} /></mesh>
                <pointLight position={[0, 1.5, 0]} intensity={lampInt} color="#fed7aa" distance={8} />
              </group>
            ))}
            <pointLight position={[0, 5, 0]} intensity={lightInt * 0.4} color="#e0f2fe" distance={15} />

            <group position={[-3.5, 3.5, -dBed/2 + 3]}>
              <mesh castShadow><boxGeometry args={[1.5, 7, 3]} /><meshStandardMaterial color="#0369a1" roughness={0.5} /></mesh>
              <mesh position={[0.76, 0, 0]}><boxGeometry args={[0.02, 3, 0.05]} /><meshPhysicalMaterial color="#bae6fd" metalness={1} roughness={0.1} /></mesh>
            </group>
          </group>
        )}

        {/* NAYA: CLEAR BALCONY ACCESS. Center Glass sliders half open to let you walk through easily. */}
        {[-3.5, 3.5].map((x) => (
           <group key={`balcony-door-${x}`} position={[x, 3, dBed/2 - 0.2]}>
             <mesh><boxGeometry args={[2, 6, 0.05]} /><meshPhysicalMaterial color="#bae6fd" transmission={0.9} transparent roughness={0.1} /></mesh>
             <mesh position={[x > 0 ? 0.8 : -0.8, 0, 0.1]}><cylinderGeometry args={[0.2, 3, 0.1, 16]} /><meshStandardMaterial color="#f8fafc" roughness={1} /></mesh>
           </group>
        ))}
      </group>

      {/* ================= 5. REAR ZONE: OPEN BALCONY DECK ================= */}
      <group position={[0, 0, cBalc]}>
        <RoomLabel name="Balcony Deck" w={width} l={dBalc} pos={[0, 0.05, 0]} isNight={isNight} />
        <mesh castShadow position={[0, 1.2, 0]}><cylinderGeometry args={[0.9, 0.9, 0.06, 32]} /><meshPhysicalMaterial color="#18181b" metalness={0.8} roughness={0.1} /></mesh>
        <mesh castShadow position={[0, 0.6, 0]}><cylinderGeometry args={[0.08, 0.08, 1.2, 16]} /><meshPhysicalMaterial color="#18181b" metalness={0.9} roughness={0.1} /></mesh>
        <mesh castShadow position={[-1.8, 0.6, 0]}><boxGeometry args={[0.9, 1.2, 0.9]} /><meshStandardMaterial color="#dc2626" roughness={0.5} /></mesh>
        <mesh castShadow position={[1.8, 0.6, 0]}><boxGeometry args={[0.9, 1.2, 0.9]} /><meshStandardMaterial color="#dc2626" roughness={0.5} /></mesh>

        <group position={[-width/2 + 2, 0, 0]}>
           <mesh castShadow position={[0, 0.6, 0]}><cylinderGeometry args={[0.5, 0.4, 1.2, 16]} /><meshStandardMaterial color="#f1f5f9" /></mesh>
           <mesh castShadow position={[0, 2, 0]}><sphereGeometry args={[1.2, 16, 16]} /><meshStandardMaterial color="#166534" roughness={0.9} /></mesh>
        </group>
      </group>

    </group>
  );
}