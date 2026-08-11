import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/interaction/Reveal";
import { EXPERIENCE } from "@/data/portfolio";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="PROFESSIONAL EXPERIENCE"
        highlight="PROFESSIONAL"
        description="Shipping real client software inside a product team — frontend ownership with full-stack collaboration."
      />

      <div className="relative mt-16 pl-8 sm:pl-14">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 left-2 w-px sm:left-5"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--cyan), var(--violet), transparent)",
            boxShadow: "0 0 22px color-mix(in oklab, var(--cyan) 60%, transparent)",
          }}
        />
        {EXPERIENCE.map((job, i) => (
          <div key={job.company} className="relative pb-14 last:pb-0">
            <Reveal preset="scale" delay={0.05}>
              <span
                className="absolute top-6 -left-[26px] h-3.5 w-3.5 rounded-full border-2 border-background bg-cyan sm:-left-[38px]"
                style={{ boxShadow: "0 0 20px 4px color-mix(in oklab, var(--cyan) 60%, transparent)" }}
              />
            </Reveal>

            <Reveal
              preset={i % 3 === 0 ? "left" : i % 3 === 1 ? "rotate" : "clip"}
              className="glass rounded-2xl p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-semibold">{job.company}</h3>
                  <p className="mt-1 text-sm text-cyan">{job.role}</p>
                </div>
                <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
                  {job.period}
                </span>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {job.summary}
              </p>

              <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {job.points.map((p, idx) => (
                  <Reveal
                    as="li"
                    key={p}
                    preset="up"
                    delay={idx * 0.04}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet" />
                    {p}
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}

        <Reveal preset="up" className="glass rounded-2xl border-dashed p-6">
          <p className="eyebrow">Next</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Open to full-stack MERN roles, remote engineering teams and product-focused freelance
            collaborations.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
