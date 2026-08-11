import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

export default function CanvasShell({
  children,
  cameraPosition = [0, 0, 8],
  fov = 45,
  dpr = [1, 1.75],
}: {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  dpr?: [number, number];
}) {
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: cameraPosition, fov }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} color="#8fd8ff" />
      <pointLight position={[-6, -3, 4]} intensity={30} color="#a78bfa" distance={22} />
      {children}
    </Canvas>
  );
}
