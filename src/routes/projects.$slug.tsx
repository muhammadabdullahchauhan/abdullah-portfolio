import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/interaction/Reveal";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { ApiFlowDiagram } from "@/components/sections/ApiArchitecture";
import { PROJECTS, PERSON, type Project } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Case Study | ${PERSON.name}`;
    const description = `${project.subtitle}. ${project.overview}`.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description,
            author: { "@type": "Person", name: PERSON.name },
          }),
        },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl font-semibold">Project not found</h1>
        <Link to="/" className="mt-6 inline-block text-cyan underline-offset-4 hover:underline">
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal preset="up" className="glass rounded-2xl p-6">
      <h2 className="font-mono text-[11px] tracking-[0.2em] text-cyan">{title.toUpperCase()}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const chips = [
    ...project.stack.frontend.map((t) => ({ t, kind: "Frontend" })),
    ...(project.stack.backend ?? []).map((t) => ({ t, kind: "Backend" })),
    ...(project.stack.database ?? []).map((t) => ({ t, kind: "Database" })),
    ...(project.stack.apis ?? []).map((t) => ({ t, kind: "APIs" })),
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 1.04, filter: "blur(16px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="grid-backdrop pointer-events-none absolute inset-0 h-[70vh] opacity-40" />

      <Section className="pt-36">
        <Link
          to="/"
          data-cursor="link"
          className="eyebrow inline-flex items-center gap-2 hover:text-cyan"
        >
          ← Back to portfolio
        </Link>

        <p className="eyebrow mt-10">Project {project.index}</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.98] font-bold">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.subtitle}</p>
        <p className="mt-2 text-sm text-cyan">{project.role}</p>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {chips.map(({ t, kind }) => (
            <span
              key={`${kind}-${t}`}
              className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {kind} · {t}
            </span>
          ))}
        </div>

        <div className="mt-12 h-64 rounded-3xl border border-border/60 bg-background/40 sm:h-80">
          <ProjectVisual visual={project.visual} />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal preset="up" className="glass rounded-2xl p-6 lg:col-span-3">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-cyan">OVERVIEW</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {project.overview}
            </p>
          </Reveal>

          <Reveal preset="left" className="glass rounded-2xl p-6">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-cyan">PROBLEM</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
          </Reveal>
          <Reveal preset="up" className="glass rounded-2xl p-6">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-cyan">SOLUTION</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
          </Reveal>
          <Reveal preset="right" className="glass rounded-2xl p-6">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-cyan">RESULTS</h2>
            <ul className="mt-4 space-y-2.5">
              {project.results.map((r) => (
                <li key={r} className="text-sm leading-relaxed text-muted-foreground">
                  · {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <Block title="Architecture" items={project.architecture} />
          <Block title="Features" items={project.features} />
          <Block title="Implementation" items={project.implementation} />
          <Block title="Challenges" items={project.challenges} />
          <Block title="Database" items={project.database} />
          <Block title="Technologies" items={chips.map((c) => `${c.kind}: ${c.t}`)} />
        </div>
      </Section>

      <Section className="pt-0">
        <h2 className="font-display text-2xl font-semibold">API Flow</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          How a request travels through {project.title}.
        </p>
        <div className="mt-10">
          <ApiFlowDiagram steps={project.apiFlow} />
        </div>
      </Section>

      <Section className="pt-0 pb-32">
        <div className="glass flex flex-wrap items-center justify-between gap-6 rounded-3xl p-8">
          <div>
            <p className="eyebrow">Next</p>
            <p className="mt-2 font-display text-2xl font-semibold">
              Explore more full-stack work
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECTS.filter((p) => p.slug !== project.slug)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.slug}
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  data-cursor="project"
                  className="rounded-full border border-border/70 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  {p.title}
                </Link>
              ))}
          </div>
        </div>
      </Section>
    </motion.main>
  );
}
