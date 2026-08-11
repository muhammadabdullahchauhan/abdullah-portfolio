import { Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/interaction/Reveal";
import { TiltCard } from "@/components/interaction/TiltCard";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { PROJECTS } from "@/data/portfolio";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="SELECTED FULL-STACK WORK"
        highlight="FULL-STACK"
        description="Products and client platforms where architecture, API design and interface engineering had to work together."
      />

      <div className="mt-14 grid gap-7 lg:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal
            key={project.slug}
            preset={i % 2 === 0 ? "left" : "right"}
            delay={(i % 2) * 0.08}
          >
            <TiltCard cursor="project" className="h-full" intensity={7}>
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-cyan/40 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.24em] text-cyan">
                      PROJECT {project.index}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                </div>

                <div
                  className="relative my-7 h-44 rounded-xl border border-border/50 bg-background/40"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <ProjectVisual visual={project.visual} />
                </div>

                <p className="text-xs tracking-wide text-muted-foreground">{project.role}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {[
                    ...project.stack.frontend.map((t) => ({ t, kind: "Frontend" })),
                    ...(project.stack.backend ?? []).map((t) => ({ t, kind: "Backend" })),
                    ...(project.stack.database ?? []).map((t) => ({ t, kind: "Database" })),
                    ...(project.stack.apis ?? []).map((t) => ({ t, kind: "APIs" })),
                  ].map(({ t, kind }) => (
                    <span
                      key={`${kind}-${t}`}
                      className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 font-mono text-[10px] tracking-wide text-muted-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:text-cyan"
                      title={kind}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan">
                  VIEW CASE STUDY
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
