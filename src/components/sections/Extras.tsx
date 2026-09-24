import { useState } from "react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/interaction/Reveal";
import { TiltCard } from "@/components/interaction/TiltCard";
import { MagneticButton } from "@/components/interaction/MagneticButton";
import { Scene3D } from "@/components/three/Scene3D";
import { DatabaseScene } from "@/components/three/DatabaseScene";
import { PortalScene } from "@/components/three/PortalScene";
import { ApiFlowDiagram } from "@/components/sections/ApiArchitecture";
import { AUTH_FLOW, CERTIFICATES, PERSON, PROCESS, SERVICES } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const EMAIL_ADDRESS = "raoabdullah111111@gmail.com";
const EMAIL_SUBJECT = "Portfolio Inquiry";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}`;
const GMAIL_COMPOSE_URL_WITH_SUBJECT = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${encodeURIComponent(EMAIL_SUBJECT)}`;

export function DatabaseSection() {
  return (
    <Section className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Database"
          title="DATA MODELLED FOR SCALE"
          highlight="MODELLED"
          description="Collections, documents, fields and referenced relationships — hover a layer of the cylinder to open it."
        />
        <Reveal preset="scale">
          <div data-cursor="tech" className="glass overflow-hidden rounded-3xl">
            <Scene3D
              className="h-[420px] w-full"
              cameraPosition={[0, 0.5, 9]}
              fallback={
                <div className="flex h-full items-center justify-center">
                  <span className="eyebrow">MongoDB collections</span>
                </div>
              }
            >
              <DatabaseScene />
            </Scene3D>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function AuthSection() {
  return (
    <Section>
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal preset="left" className="order-2 lg:order-1">
          <ApiFlowDiagram steps={AUTH_FLOW} />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Authentication"
            title="SECURE BY DESIGN"
            highlight="SECURE"
            description="JWT-based authentication with hashed credentials, server-side validation, role checks and protected routes on both the API and the client."
          />
          <Reveal preset="scale" delay={0.2}>
            <div
              className="mt-10 flex h-40 w-40 items-center justify-center rounded-2xl border border-cyan/30"
              style={{
                transform: "rotateX(16deg) rotateY(-18deg)",
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--electric) 30%, transparent), transparent 70%)",
                boxShadow: "var(--glow-blue)",
              }}
            >
              <svg viewBox="0 0 24 24" className="h-16 w-16 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                <circle cx="12" cy="15" r="1.4" />
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

const SERVICE_SHAPES: Record<string, string> = {
  layers: "M4 8l8-4 8 4-8 4-8-4Zm0 5l8 4 8-4M4 17l8 4 8-4",
  api: "M4 12h4m8 0h4M9 8h6v8H9z",
  atom: "M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M12 4c5 4 8 12 4 16M12 4c-5 4-8 12-4 16",
  cylinder: "M5 7c0-1.7 3.1-3 7-3s7 1.3 7 3v10c0 1.7-3.1 3-7 3s-7-1.3-7-3V7Zm0 0c0 1.7 3.1 3 7 3s7-1.3 7-3",
  lock: "M6 11h12v9H6zM9 11V8a3 3 0 1 1 6 0v3",
  orbit: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 12c3-4 15-4 18 0M3 12c3 4 15 4 18 0",
};

export function Services() {
  return (
    <Section>
      <SectionHeading eyebrow="Services" title="WHAT I BUILD" highlight="BUILD" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} preset={i % 2 ? "rotate" : "up"} delay={i * 0.05}>
            <TiltCard className="h-full" cursor="tech">
              <div className="glass h-full rounded-2xl p-6">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan/25"
                  style={{ background: "color-mix(in oklab, var(--electric) 12%, transparent)" }}
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                    <path d={SERVICE_SHAPES[s.visual]} />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const PROCESS_ICONS: Record<string, string> = {
  compass: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M15 9l-2 4-4 2 2-4z",
  blueprint: "M4 5h16v14H4zM8 5v14M4 10h16",
  nodes: "M6 6h3v3H6zM15 15h3v3h-3zM9 7.5h6M16.5 9v6",
  cube: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 0v18m8-13.5L4 16.5",
  terminal: "M4 5h16v14H4zM7 9l3 3-3 3M13 15h4",
  shield: "M12 3l7 3v6c0 4-3 6.5-7 9-4-2.5-7-5-7-9V6l7-3Z",
  rocket: "M12 3c4 3 6 7 6 11l-3 3-3-2-3 2-3-3c0-4 2-8 6-11ZM9 20l3-3 3 3",
};

export function Process() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Process"
        title="FROM IDEA TO PRODUCTION"
        highlight="PRODUCTION"
        align="center"
      />
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((p, i) => (
          <Reveal
            key={p.step}
            preset={i % 3 === 0 ? "clip" : i % 3 === 1 ? "scale" : "up"}
            delay={i * 0.05}
            className={cn("glass rounded-2xl p-6", i === PROCESS.length - 1 && "lg:col-start-3")}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.2em] text-violet">{p.step}</span>
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden>
                <path d={PROCESS_ICONS[p.object]} />
              </svg>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section>
      <Reveal preset="up" className="glass flex flex-wrap items-center justify-between gap-6 rounded-3xl p-8">
        <div>
          <p className="eyebrow">Education</p>
          <h2 className="mt-3 font-display text-2xl font-semibold">BS Computer Science</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Government College University Faisalabad — Sahiwal Campus
          </p>
        </div>
        <svg viewBox="0 0 24 24" className="h-16 w-16 text-cyan" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
          <path d="M2 8l10-4 10 4-10 4L2 8Zm4 3v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
        </svg>
      </Reveal>
    </Section>
  );
}

export function Certificates() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="certificates">
      <SectionHeading eyebrow="Certificates" title="PROOF OF WORK" highlight="PROOF" />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATES.map((c, i) => (
          <Reveal key={c.title} preset="scale" delay={i * 0.05}>
            <TiltCard cursor="tech">
              <button
                onClick={() => setOpen(i)}
                className="glass w-full rounded-2xl p-6 text-left transition-colors hover:border-cyan/40"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-violet">{c.year}</p>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.issuer}</p>
              </button>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div
            className="glass w-full max-w-lg rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="eyebrow">{CERTIFICATES[open]!.year}</p>
            <h3 className="mt-4 font-display text-2xl font-semibold">{CERTIFICATES[open]!.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{CERTIFICATES[open]!.issuer}</p>
            <button
              onClick={() => setOpen(null)}
              className="mt-8 rounded-full border border-border px-5 py-2 text-sm hover:border-cyan/50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}

export function BuildingInPublic() {
  const weeks = 26;
  return (
    <Section>
      <SectionHeading
        eyebrow="Activity"
        title="BUILDING IN PUBLIC"
        highlight="PUBLIC"
        description="A live view of repositories and contribution activity, ready to be wired to the GitHub API."
      />
      <Reveal preset="up" className="glass mt-12 overflow-x-auto rounded-3xl p-6">
        <div className="flex gap-1" style={{ perspective: "800px" }}>
          {Array.from({ length: weeks }, (_, w) => (
            <div key={w} className="flex flex-col gap-1">
              {Array.from({ length: 7 }, (_, d) => (
                <span
                  key={d}
                  className="h-3.5 w-3.5 rounded-[3px] border border-border/40 transition-transform duration-300 hover:scale-125"
                  style={{
                    background:
                      (w * 7 + d) % 5 === 0
                        ? "color-mix(in oklab, var(--cyan) 55%, transparent)"
                        : (w * 7 + d) % 3 === 0
                          ? "color-mix(in oklab, var(--electric) 30%, transparent)"
                          : "color-mix(in oklab, var(--foreground) 6%, transparent)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Illustrative grid — connect the GitHub API to render real contribution data.
        </p>
        <a
          href={PERSON.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="mt-4 inline-block text-sm text-cyan underline-offset-4 hover:underline"
        >
          View GitHub profile →
        </a>
      </Reveal>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Scene3D className="h-full w-full" cameraPosition={[0, 0, 9]} fallback={null}>
          <PortalScene />
        </Scene3D>
      </div>
      <div className="relative mx-auto max-w-3xl py-20 text-center">
        <SectionHeading
          align="center"
          eyebrow="Contact"
          title="LET'S BUILD SOMETHING GREAT."
          highlight="GREAT"
          description="Whether you're building a startup, launching a product or solving a complex web problem, let's turn the idea into a reliable digital experience."
        />
        <Reveal preset="up" delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-primary-foreground transition-[transform,box-shadow,background] duration-300 will-change-transform glow-ring"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              Let&apos;s Talk →
            </a>
            <MagneticButton variant="ghost" onClick={() => window.open(PERSON.github, "_blank")}>
              GitHub
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => window.open(PERSON.linkedin, "_blank")}>
              LinkedIn
            </MagneticButton>
            <a
              href={GMAIL_COMPOSE_URL_WITH_SUBJECT}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-foreground transition-[transform,box-shadow,background] duration-300 will-change-transform glass hover:border-cyan/50"
            >
              Email
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg font-semibold">{PERSON.name}</p>
          <p className="text-sm text-muted-foreground">{PERSON.title}</p>
        </div>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <a href={PERSON.github} target="_blank" rel="noreferrer" data-cursor="link" className="hover:text-cyan">
            GitHub
          </a>
          <a href={PERSON.linkedin} target="_blank" rel="noreferrer" data-cursor="link" className="hover:text-cyan">
            LinkedIn
          </a>
          <a href={`mailto:${PERSON.email}`} data-cursor="link" className="hover:text-cyan">
            Email
          </a>
        </div>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="status-dot h-2 w-2 rounded-full bg-chart-4" />
          Available for opportunities
        </p>
        <p className="w-full text-xs text-muted-foreground">
          © 2026 {PERSON.name}
        </p>
      </div>
    </footer>
  );
}
