import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer } from "@/hooks/use-environment";

type Props = {
  children: ReactNode;
  className?: string | undefined;
  intensity?: number;
  cursor?: string | undefined;
  glare?: boolean;
};

/** 3D tilt surface with cursor-following lighting. */
export function TiltCard({ children, className, intensity = 10, cursor, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !fine) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1100px) rotateY(${(px - 0.5) * intensity * 2}deg) rotateX(${(0.5 - py) * intensity * 2}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      data-cursor={cursor}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "group relative rounded-2xl transition-transform duration-300 ease-out will-change-transform",
        className,
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--cyan) 16%, transparent), transparent 60%)",
          }}
        />
      )}
      {children}
    </div>
  );
}
