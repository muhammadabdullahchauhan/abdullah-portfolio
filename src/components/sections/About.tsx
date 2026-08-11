import { useState } from "react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/interaction/Reveal";
import { cn } from "@/lib/utils";

const LAYERS = [
  {
    id: "user",
    label: "USER",
    detail: "Real people on real devices — the interface has to be fast, clear and accessible.",
  },
  {
    id: "react",
    label: "REACT / NEXT.JS",
    detail: "Component architecture, routing, state management and rendering strategy.",
  },
  {
    id: "rest",
    label: "REST API",
    detail: "Typed request/response contracts, status semantics, validation and versioning.",
  },
  {
    id: "express",
    label: "EXPRESS.JS",
    detail: "Routes, middleware, controllers, auth guards and centralized error handling.",
  },
  {
    id: "node",
    label: "NODE.JS",
    detail: "Service layer and business logic, async I/O, integrations and background work.",
  },
  {
    id: "mongo",
    label: "MONGODB",
    detail: "Schema design, indexes, relations by reference, aggregation and Atlas hosting.",
  },
];

const HIGHLIGHTS = [
  "Component architecture",
  "REST API development",
  "Authentication",
  "Database integration",
  "Responsive UI",
  "Performance",
  "Reusable systems",
  "Modern workflows",
];

/** Signature visual: the full-stack pipeline as an interactive layered stack. */
export function ArchitectureStack({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="relative mx-auto w-full max-w-lg"
      style={{ perspective: "1400px" }}
      onPointerLeave={() => setActive(null)}
    >
      <div style={{ transformStyle: "preserve-3d", transform: "rotateX(46deg) rotateZ(-32deg)" }}>
        {LAYERS.map((layer, i) => {
          const isActive = active === layer.id;
          const dim = active !== null && !isActive;
          return (
            <div
              key={layer.id}
              data-cursor="tech"
              onPointerEnter={() => setActive(layer.id)}
              className="relative"
              style={{ marginTop: i === 0 ? 0 : compact ? -14 : -18 }}
            >
              <div
                className={cn(
                  "glass flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-500",
                  isActive && "border-cyan/60",
                )}
                style={{
                  transform: `translateZ(${isActive ? 90 : 0}px) translateY(${i * (compact ? 46 : 58)}px)`,
                  opacity: dim ? 0.28 : 1,
                  boxShadow: isActive
                    ? "0 30px 80px -30px color-mix(in oklab, var(--cyan) 70%, transparent)"
                    : "0 18px 50px -34px oklch(0 0 0)",
                  background: isActive
                    ? "color-mix(in oklab, var(--electric) 16%, var(--surface-glass))"
                    : undefined,
                }}
              >
                <span className="font-mono text-[11px] tracking-[0.2em]">{layer.label}</span>
                <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
              </div>
              {i < LAYERS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 block w-px"
                  style={{
                    height: compact ? 46 : 58,
                    top: "100%",
                    transform: `translateY(${i * (compact ? 46 : 58)}px)`,
                    background:
                      "linear-gradient(to bottom, color-mix(in oklab, var(--cyan) 70%, transparent), transparent)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div
        className="mt-8 min-h-[76px] rounded-xl border border-border/60 p-4 transition-opacity duration-300"
        style={{ marginTop: (LAYERS.length - 1) * (compact ? 46 : 58) + 40 }}
        aria-live="polite"
      >
        <p className="font-mono text-[10px] tracking-[0.2em] text-cyan">
          {active ? LAYERS.find((l) => l.id === active)?.label : "HOVER A LAYER"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {active
            ? LAYERS.find((l) => l.id === active)?.detail
            : "Every layer of the application lifecycle, from interface to persistence."}
        </p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <Section id="about">
      <div className="grid items-start gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="About"
            title="ENGINEERING WITH PURPOSE"
            highlight="PURPOSE"
            description={
              <>
                I&apos;m Muhammad Abdullah Chauhan, a MERN Stack Software Engineer focused on
                building modern, scalable and user-friendly web applications.
              </>
            }
          />
          <Reveal preset="up" delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              I work across the full web application lifecycle — from the interface a user touches,
              through the frontend architecture, the API contract, the backend services, the
              database schema, and finally deployment. That end-to-end view is what keeps systems
              coherent instead of stitched together.
            </p>
          </Reveal>

          <Reveal preset="up" delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {HIGHLIGHTS.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-border/70 bg-secondary/40 px-3.5 py-1.5 text-xs text-muted-foreground"
                >
                  {h}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal preset="up" delay={0.4}>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { k: "Focus", v: "Full-Stack" },
                { k: "Core", v: "MERN" },
                { k: "Ships", v: "Production" },
              ].map((s) => (
                <div key={s.k} className="glass rounded-xl px-4 py-4">
                  <p className="eyebrow">{s.k}</p>
                  <p className="mt-2 font-display text-lg font-semibold">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal preset="scale" className="lg:pt-6">
          <ArchitectureStack />
        </Reveal>
      </div>
    </Section>
  );
}
