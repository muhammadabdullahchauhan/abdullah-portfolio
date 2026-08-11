import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/interaction/Reveal";
import { Scene3D } from "@/components/three/Scene3D";
import { ConstellationScene } from "@/components/three/ConstellationScene";
import { SKILL_GROUPS } from "@/data/portfolio";

export function Skills() {
  return (
    <Section id="skills" className="overflow-hidden">
      <SectionHeading
        eyebrow="Skills"
        title="MY ENGINEERING STACK"
        highlight="ENGINEERING"
        description="Drag, rotate and explore the constellation — or read the stack by discipline below."
      />

      <Reveal preset="scale" className="mt-12">
        <div
          data-cursor="tech"
          className="glass relative overflow-hidden rounded-3xl"
          style={{ boxShadow: "var(--glow-violet)" }}
        >
          <Scene3D
            className="h-[420px] w-full sm:h-[520px]"
            cameraPosition={[0, 1.2, 9.5]}
            fallback={
              <div className="flex h-full items-center justify-center">
                <span className="eyebrow">Technology constellation</span>
              </div>
            }
          >
            <ConstellationScene />
          </Scene3D>
          <p className="eyebrow pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
            Drag to rotate · scroll to zoom · hover a node
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal
            key={group.category}
            preset={i % 2 === 0 ? "up" : "rotate"}
            delay={i * 0.06}
            className="glass rounded-2xl p-5 transition-colors duration-300 hover:border-cyan/40"
          >
            <h3 className="font-mono text-[11px] tracking-[0.2em] text-cyan">
              {group.category.toUpperCase()}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="h-1 w-1 rounded-full bg-violet" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
