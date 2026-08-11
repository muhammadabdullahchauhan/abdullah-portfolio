import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ring({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.035, 16, 120]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} toneMapped={false} />
    </mesh>
  );
}

function PortalParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 420;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 1.6 + Math.random() * 2.6;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = Math.sin(a) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
  }
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.12;
    ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a5b4fc" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/** Contact: a cursor-reactive portal that pulls the visitor through. */
export function PortalScene() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += (state.pointer.x * 0.4 - g.rotation.y) * 0.06;
    g.rotation.x += (-state.pointer.y * 0.3 - g.rotation.x) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh>
        <circleGeometry args={[1.9, 64]} />
        <meshBasicMaterial color="#0b1220" transparent opacity={0.85} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.9, 2.05, 96]} />
        <meshBasicMaterial color="#38bdf8" toneMapped={false} />
      </mesh>
      <Ring radius={2.5} tilt={0.4} speed={0.18} color="#7c3aed" />
      <Ring radius={3.1} tilt={-0.5} speed={-0.13} color="#22d3ee" />
      <Ring radius={3.7} tilt={0.85} speed={0.09} color="#3b82f6" />
      <PortalParticles />
    </group>
  );
}
