import { Scene3D } from "@/components/three/Scene3D";
import { WaveformScene } from "@/components/three/WaveformScene";
import type { Project } from "@/data/portfolio";

/** Per-project 3D concept art — a different metaphor for each project. */
export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  if (visual === "waveform") {
    return (
      <Scene3D
        className="h-full w-full"
        cameraPosition={[0, 0.6, 6]}
        fallback={<Placeholder label="audio waveform" />}
      >
        <WaveformScene />
      </Scene3D>
    );
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden"
      style={{ perspective: "900px" }}
    >
      {visual === "document" && <DocumentVisual />}
      {visual === "browser" && <BrowserVisual />}
      {visual === "commerce" && <CommerceVisual />}
      {visual === "care" && <CareVisual />}
      {visual === "invoice" && <InvoiceVisual />}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="eyebrow">{label}</span>
    </div>
  );
}

const sheet =
  "absolute inset-0 rounded-lg border border-cyan/25 bg-gradient-to-br from-card to-background/40";

function DocumentVisual() {
  return (
    <div
      className="relative h-40 w-32 transition-transform duration-700 group-hover:rotate-y-6"
      style={{ transformStyle: "preserve-3d", transform: "rotateX(12deg) rotateY(-18deg)" }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={sheet}
          style={{
            transform: `translateZ(${i * 22}px) translate(${i * 6}px, ${-i * 8}px)`,
            boxShadow: "0 24px 60px -30px color-mix(in oklab, var(--cyan) 80%, transparent)",
          }}
        >
          <div className="space-y-2 p-3">
            {Array.from({ length: 6 }, (_, l) => (
              <div
                key={l}
                className="h-1 rounded bg-cyan/30"
                style={{ width: `${50 + ((l * 13) % 45)}%` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BrowserVisual() {
  return (
    <div
      className="relative h-40 w-64"
      style={{ transformStyle: "preserve-3d", transform: "rotateX(14deg) rotateY(20deg)" }}
    >
      <div className="absolute inset-0 rounded-xl border border-violet/30 bg-card/80 shadow-[0_30px_70px_-35px_var(--violet)]">
        <div className="flex gap-1.5 border-b border-border/60 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-destructive/70" />
          <span className="h-2 w-2 rounded-full bg-chart-5/70" />
          <span className="h-2 w-2 rounded-full bg-chart-4/70" />
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          <div className="col-span-2 h-14 rounded bg-gradient-to-br from-electric/30 to-violet/20" />
          <div className="h-14 rounded bg-secondary/60" />
          <div className="h-3 rounded bg-secondary/60" />
          <div className="h-3 rounded bg-secondary/60" />
          <div className="h-3 rounded bg-cyan/30" />
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-xl border border-cyan/20"
        style={{ transform: "translateZ(-40px) translateY(16px) scale(0.94)" }}
      />
    </div>
  );
}

function CommerceVisual() {
  return (
    <div
      className="relative grid grid-cols-2 gap-3"
      style={{ transformStyle: "preserve-3d", transform: "rotateX(16deg) rotateY(-16deg)" }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-20 w-24 rounded-lg border border-border/70 bg-card/80"
          style={{
            transform: `translateZ(${(i % 2) * 26}px)`,
            boxShadow: "0 24px 50px -30px color-mix(in oklab, var(--violet) 80%, transparent)",
          }}
        >
          <div className="m-2 h-10 rounded bg-gradient-to-br from-cyan/25 to-violet/25" />
          <div className="mx-2 h-1.5 w-12 rounded bg-secondary" />
          <div className="mx-2 mt-1.5 h-1.5 w-8 rounded bg-cyan/40" />
        </div>
      ))}
    </div>
  );
}

function CareVisual() {
  return (
    <div className="relative h-40 w-40" style={{ transformStyle: "preserve-3d" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-cyan/25"
          style={{
            transform: `rotateX(70deg) rotateZ(${i * 40}deg) scale(${1 - i * 0.18})`,
            boxShadow: "0 0 40px -10px color-mix(in oklab, var(--cyan) 60%, transparent)",
          }}
        />
      ))}
      <div
        className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "var(--gradient-brand)", filter: "blur(2px)" }}
      />
    </div>
  );
}

function InvoiceVisual() {
  return (
    <div
      className="relative h-40 w-56 rounded-xl border border-border/70 bg-card/80 p-4"
      style={{ transform: "rotateX(18deg) rotateY(-14deg)", transformStyle: "preserve-3d" }}
    >
      <div className="flex justify-between">
        <div className="h-2 w-16 rounded bg-cyan/50" />
        <div className="h-2 w-8 rounded bg-secondary" />
      </div>
      <div className="mt-4 space-y-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-1.5 w-24 rounded bg-secondary" />
            <div className="h-1.5 w-10 rounded bg-violet/50" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <div className="h-3 w-16 rounded bg-gradient-to-r from-electric to-violet" />
      </div>
    </div>
  );
}
