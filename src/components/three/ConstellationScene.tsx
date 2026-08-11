import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { CONSTELLATION } from "@/data/portfolio";

type Item = { name: string; note: string };

// ── SimpleIcons slug mapping ─────────────────────────────────────────────────
// Maps display names → simpleicons.org slugs.
// URL format: https://cdn.simpleicons.org/{slug}/{hex_color}
function getSlug(name: string): string {
  const overrides: Record<string, string> = {
    // MERN core
    "React": "react",
    "React.js": "react",
    "Express": "express",
    "Express.js": "express",
    "Node.js": "nodedotjs",
    "Node": "nodedotjs",
    "MongoDB": "mongodb",
    // Frontend
    "Next.js": "nextdotjs",
    "TypeScript": "typescript",
    "JavaScript": "javascript",
    "Tailwind CSS": "tailwindcss",
    "Tailwind": "tailwindcss",
    "GSAP": "greensock",
    "Framer Motion": "framer",
    "HTML": "html5",
    "HTML5": "html5",
    "CSS": "css3",
    "CSS3": "css3",
    "Sass": "sass",
    "Redux": "redux",
    "Vite": "vite",
    "Webpack": "webpack",
    // Backend / DB
    "Mongoose": "mongoose",
    "REST API": "json",
    "FastAPI": "fastapi",
    "Python": "python",
    // DevOps / Tools
    "Git": "git",
    "GitHub": "github",
    "Vercel": "vercel",
    "Netlify": "netlify",
    "Figma": "figma",
    "Postman": "postman",
    "VS Code": "visualstudiocode",
    "Docker": "docker",
    "AWS": "amazonaws",
    "Firebase": "firebase",
    "npm": "npm",
    "Yarn": "yarn",
    // AI Tools
    "GitHub Copilot": "github",
    "Cursor": "cursor",
  };

  if (overrides[name]) return overrides[name];

  // Auto-generate fallback slug
  return name
    .toLowerCase()
    .replace(/\.js$/, "dotjs")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// ── TechNode ─────────────────────────────────────────────────────────────────
function TechNode({
  item,
  position,
  color,
  radius,
}: {
  item: Item;
  position: [number, number, number];
  color: string;
  radius: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  // ── Animation: identical to original (rotation + pulse + scale) ──────────
  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += delta * 0.3;
    m.rotation.y += delta * 0.4;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
    const s = (hovered ? 1.5 : 1) * pulse;
    m.scale.lerp(new THREE.Vector3(s, s, s), 0.15);
  });

  const iconPx = radius >= 0.4 ? 52 : 40;
  const slug = getSlug(item.name);

  return (
    <group position={position}>
      {/* Spinning wireframe icosahedron — ref kept here so rotation/scale
          animation from useFrame stays identical to original */}
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[radius, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={hovered ? 0.35 : 0.12}
        />
      </mesh>

      {/* Glow ring */}
      <mesh>
        <torusGeometry args={[radius * 1.1, 0.018, 8, 50]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.85 : 0.3}
        />
      </mesh>

      {/* SVG logo — frosted-glass circle + SimpleIcons CDN */}
      <Html center distanceFactor={10} position={[0, 0, 0]}>
        <div
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          style={{
            width: iconPx,
            height: iconPx,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10, 14, 24, 0.68)",
            borderRadius: "50%",
            border: `1.5px solid ${color}44`,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: `0 0 ${hovered ? 18 : 8}px ${color}55, inset 0 0 6px ${color}22`,
            transition: "box-shadow 220ms ease",
          }}
        >
          {!imgError ? (
            <img
              src={`https://cdn.simpleicons.org/${slug}`}
              alt={item.name}
              draggable={false}
              style={{
                width: "58%",
                height: "58%",
                objectFit: "contain",
                filter: `drop-shadow(0 0 ${hovered ? 8 : 4}px ${color})`,
                transition: "filter 220ms ease",
                pointerEvents: "none",
                userSelect: "none",
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            // Fallback: first 2 letters if icon not found on SimpleIcons
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: iconPx * 0.25,
                color: color,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textShadow: `0 0 8px ${color}`,
                userSelect: "none",
              }}
            >
              {item.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </Html>

      {/* Label + tooltip — unchanged from original */}
      <Html center distanceFactor={10} position={[0, radius + 0.45, 0]}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textAlign: "center",
            whiteSpace: "nowrap",
            color: hovered ? "#e2f7ff" : "rgba(226,247,255,0.6)",
            transition: "color 200ms ease",
          }}
        >
          {item.name}
          <div
            style={{
              maxWidth: 190,
              whiteSpace: "normal",
              marginTop: 6,
              padding: hovered ? "8px 10px" : 0,
              borderRadius: 10,
              border: hovered ? "1px solid rgba(125,211,252,0.25)" : "none",
              background: hovered ? "rgba(10,14,24,0.85)" : "transparent",
              color: "rgba(226,247,255,0.75)",
              fontSize: 9,
              lineHeight: 1.5,
              letterSpacing: "0.02em",
              opacity: hovered ? 1 : 0,
              height: hovered ? "auto" : 0,
              overflow: "hidden",
              transition: "opacity 200ms ease",
            }}
          >
            {item.note}
          </div>
        </div>
      </Html>
    </group>
  );
}

// ── Helpers — unchanged ──────────────────────────────────────────────────────
function ringPositions(count: number, radius: number, y: number): [number, number, number][] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return [Math.cos(a) * radius, y + Math.sin(a * 2) * 0.5, Math.sin(a) * radius];
  });
}

// ── ConstellationScene — unchanged except TechNode internals above ───────────
/** Skills: rotatable technology constellation around a MERN core. */
export function ConstellationScene() {
  const group = useRef<THREE.Group>(null);
  const inner = ringPositions(CONSTELLATION.inner.length, 2.4, 0.4);
  const outer = ringPositions(CONSTELLATION.outer.length, 4.3, -0.5);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.06;
  });

  return (
    <>
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={6}
        maxDistance={14}
        autoRotate={false}
        rotateSpeed={0.5}
      />
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#7c3aed"
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
        <Html center distanceFactor={9}>
          <span
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: "0.2em",
              color: "#e8f6ff",
            }}
          >
            MERN
          </span>
        </Html>

        {inner.map((pos, i) => (
          <group key={CONSTELLATION.inner[i]!.name}>
            <Line
              points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(...pos)]}
              color="#38bdf8"
              lineWidth={1}
              transparent
              opacity={0.35}
            />
            <TechNode item={CONSTELLATION.inner[i]!} position={pos} color="#38bdf8" radius={0.4} />
          </group>
        ))}

        {outer.map((pos, i) => {
          const anchor = inner[i % inner.length]!;
          return (
            <group key={CONSTELLATION.outer[i]!.name}>
              <Line
                points={[new THREE.Vector3(...anchor), new THREE.Vector3(...pos)]}
                color="#a78bfa"
                lineWidth={1}
                transparent
                opacity={0.22}
              />
              <TechNode item={CONSTELLATION.outer[i]!} position={pos} color="#a78bfa" radius={0.3} />
            </group>
          );
        })}
      </group>
    </>
  );
}