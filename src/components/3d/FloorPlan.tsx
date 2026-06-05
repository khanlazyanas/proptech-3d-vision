"use client";

import { useEditorStore } from "@/store/useEditorStore";

export default function FloorPlan() {
  // Zustand se real-time state fetch kar rahe hain
  const { wallColor } = useEditorStore();

  return (
    <group>
      {/* Base Plot (Zameen) - 20x70 feet proportion */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        {/* BoxGeometry args: [width, height, depth] */}
        <boxGeometry args={[20, 1, 70]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Ek basic deewar (Wall) demo ke liye */}
      <mesh castShadow receiveShadow position={[0, 2.5, -34]}>
        <boxGeometry args={[20, 5, 2]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
    </group>
  );
}