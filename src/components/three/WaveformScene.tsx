import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Tone Weaver: a reactive 3D audio waveform of animated bars. */
export function WaveformScene() {
  const group = useRef<THREE.Group>(null);
  const bars = 44;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const h =
        0.35 +
        Math.abs(Math.sin(t * 2 + i * 0.35)) * 1.5 * (1 - Math.abs(i - bars / 2) / (bars * 0.9));
      mesh.scale.y += (h - mesh.scale.y) * 0.2;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + mesh.scale.y * 0.55;
    });
    g.rotation.y += (state.pointer.x * 0.5 - g.rotation.y) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.15, 0, 0]}>
      {Array.from({ length: bars }, (_, i) => (
        <mesh key={i} position={[(i - bars / 2) * 0.19, 0, 0]}>
          <boxGeometry args={[0.09, 1, 0.09]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#a78bfa" : "#22d3ee"}
            emissive={i % 3 === 0 ? "#7c3aed" : "#0ea5e9"}
            emissiveIntensity={0.6}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
