import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { COLLECTIONS } from "@/data/portfolio";

function Disc({
  index,
  total,
  collection,
  active,
  onHover,
}: {
  index: number;
  total: number;
  collection: (typeof COLLECTIONS)[number];
  active: boolean;
  onHover: (name: string | null) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const baseY = (total / 2 - index) * 0.85 - 0.4;

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const targetY = baseY + (active ? 0.4 : 0);
    g.position.y += (targetY - g.position.y) * 0.14;
    const s = active ? 1.12 : 1;
    g.scale.lerp(new THREE.Vector3(s, 1, s), 0.14);
  });

  return (
    <group
      ref={ref}
      position={[0, baseY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(collection.name);
      }}
      onPointerOut={() => onHover(null)}
    >
      <mesh>
        <cylinderGeometry args={[1.6, 1.6, 0.6, 60]} />
        <meshStandardMaterial
          color={active ? "#4ade80" : "#1c2333"}
          emissive={active ? "#22c55e" : "#0f766e"}
          emissiveIntensity={active ? 0.55 : 0.15}
          metalness={0.55}
          roughness={0.3}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[1.63, 1.63, 0.62, 60]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={active ? 0.35 : 0.12} />
      </mesh>
      <Html center distanceFactor={9} position={[2.6, 0, 0]}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "#d9f7ee",
            whiteSpace: "nowrap",
            textAlign: "left",
            opacity: active ? 1 : 0.45,
            transition: "opacity 200ms ease",
          }}
        >
          <strong style={{ letterSpacing: "0.16em" }}>{collection.name}</strong>
          <div
            style={{
              marginTop: 6,
              display: active ? "block" : "none",
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(94,234,212,0.25)",
              background: "rgba(8,16,20,0.9)",
              fontSize: 9,
              lineHeight: 1.7,
            }}
          >
            {collection.fields.map((f) => (
              <div key={f}>· {f}</div>
            ))}
            <div style={{ marginTop: 6, color: "#5eead4" }}>{collection.relation}</div>
          </div>
        </div>
      </Html>
    </group>
  );
}

/** Database section: a stacked MongoDB-inspired cylinder of collections. */
export function DatabaseScene() {
  const group = useRef<THREE.Group>(null);
  const [active, setActive] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (group.current && !active) group.current.rotation.y += delta * 0.22;
  });

  return (
    <group ref={group} rotation={[0.28, 0, 0]}>
      {COLLECTIONS.map((c, i) => (
        <Disc
          key={c.name}
          index={i}
          total={COLLECTIONS.length}
          collection={c}
          active={active === c.name}
          onHover={setActive}
        />
      ))}
    </group>
  );
}
