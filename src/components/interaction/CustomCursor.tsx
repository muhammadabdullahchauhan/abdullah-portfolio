import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/hooks/use-environment";

type CursorMode = "default" | "button" | "project" | "tech" | "link" | "scene";

const LABELS: Record<CursorMode, string> = {
  default: "",
  button: "",
  project: "VIEW PROJECT",
  tech: "EXPLORE",
  link: "",
  scene: "",
};

export function CustomCursor() {
  const fine = useFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("cursor-none-desktop");
    return () => document.documentElement.classList.remove("cursor-none-desktop");
  }, [fine]);

  useEffect(() => {
    if (!fine) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const next = (el?.getAttribute("data-cursor") as CursorMode | undefined) ?? "default";
      setMode((prev) => (prev === next ? prev : next));
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [fine]);

  if (!fine) return null;

  const label = LABELS[mode];
  const size = label ? 92 : mode === "button" ? 56 : mode === "link" ? 48 : 34;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 250ms ease" }}
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-cyan/60 text-[9px] tracking-[0.22em] text-cyan"
        style={{
          width: size,
          height: size,
          transition: "width 260ms cubic-bezier(.2,.8,.2,1), height 260ms cubic-bezier(.2,.8,.2,1), background 260ms",
          background: label
            ? "color-mix(in oklab, var(--electric) 16%, transparent)"
            : "transparent",
          backdropFilter: label ? "blur(4px)" : undefined,
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </div>
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-cyan"
        style={{ boxShadow: "0 0 14px 3px color-mix(in oklab, var(--cyan) 70%, transparent)" }}
      />
    </div>
  );
}
