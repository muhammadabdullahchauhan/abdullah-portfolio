import { useEffect, useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/interaction/Reveal";
import { API_FLOW } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** Animated request lifecycle: a data packet travelling through the system. */
export function ApiFlowDiagram({ steps = API_FLOW }: { steps?: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    timer.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % steps.length);
    }, 900);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [steps.length]);

  return (
    <ol className="relative mx-auto grid max-w-3xl gap-0">
      {steps.map((step, i) => {
        const active = i === activeIndex;
        return (
          <li key={step} className="relative">
            <div
              className={cn(
                "glass flex items-center justify-between rounded-xl px-5 py-3.5 transition-all duration-500",
                active && "border-cyan/60",
              )}
              style={{
                transform: active ? "translateX(10px) scale(1.02)" : "none",
                boxShadow: active
                  ? "0 24px 60px -34px color-mix(in oklab, var(--cyan) 90%, transparent)"
                  : undefined,
                background: active
                  ? "color-mix(in oklab, var(--electric) 14%, var(--surface-glass))"
                  : undefined,
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.18em]">{step}</span>
              <span
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  active ? "bg-cyan" : "bg-border",
                )}
                style={
                  active
                    ? { boxShadow: "0 0 16px 4px color-mix(in oklab, var(--cyan) 70%, transparent)" }
                    : undefined
                }
              />
            </div>
            {i < steps.length - 1 && (
              <div className="relative mx-auto h-6 w-px overflow-hidden bg-border/70">
                <span
                  className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan transition-all duration-500"
                  style={{
                    top: active ? "100%" : "-20%",
                    opacity: active ? 1 : 0,
                    boxShadow: "0 0 14px 3px color-mix(in oklab, var(--cyan) 70%, transparent)",
                  }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function ApiArchitecture() {
  return (
    <Section id="architecture" className="overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-25 blur-[150px]"
        style={{ background: "radial-gradient(circle, var(--electric), transparent 65%)" }}
      />
      <SectionHeading
        align="center"
        eyebrow="API Architecture"
        title="HOW MY APPLICATIONS COMMUNICATE"
        highlight="COMMUNICATE"
        description="A single request, traced end to end — from a click in the browser to a document in MongoDB and back into the UI."
      />
      <Reveal preset="clip" className="mt-14">
        <ApiFlowDiagram />
      </Reveal>
    </Section>
  );
}
