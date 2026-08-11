import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { use3DTier, useHydrated } from "@/hooks/use-environment";
import { cn } from "@/lib/utils";

const CanvasShell = lazy(() => import("./CanvasShell"));

type Props = {
  children: ReactNode;
  className?: string | undefined;
  fallback?: ReactNode | undefined;
  cameraPosition?: [number, number, number];
  fov?: number;
};

/**
 * Client-only, viewport-gated WebGL surface.
 * Skips rendering entirely for reduced-motion users and only mounts when visible.
 */
export function Scene3D({ children, className, fallback, cameraPosition, fov }: Props) {
  const hydrated = useHydrated();
  const tier = use3DTier();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "150px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const enabled = hydrated && tier !== "off" && inView;

  return (
    <div ref={ref} className={cn("relative", className)} aria-hidden>
      {enabled ? (
        <Suspense fallback={fallback ?? null}>
          <CanvasShell
            dpr={tier === "full" ? [1, 1.75] : [1, 1.25]}
            {...(cameraPosition ? { cameraPosition } : {})}
            {...(fov ? { fov } : {})}
          >
            {children}
          </CanvasShell>
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
