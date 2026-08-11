import { Scene3D } from "@/components/three/Scene3D";
import { HeroMernScene } from "@/components/three/HeroMernScene";
import { MagneticButton } from "@/components/interaction/MagneticButton";
import { Reveal } from "@/components/interaction/Reveal";
import { PERSON } from "@/data/portfolio";
import photoAsset from "@/assets/abdullah.png";

const BADGES = ["MongoDB", "Express", "React", "Node.js"];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProfilePhoto() {
  return (
    <div className="group relative aspect-[4/5] w-[240px] overflow-hidden rounded-[2rem] sm:w-[260px] md:w-[280px] lg:w-[300px] xl:w-[320px]">
      <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan/40 via-violet/30 to-electric/40 opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
      <div className="glass absolute inset-0 rounded-[2rem]" />
      <img
        src={photoAsset}
        alt={`${PERSON.name} — ${PERSON.title}`}
        className="relative z-10 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 z-20 rounded-[2rem] ring-1 ring-inset ring-white/10" />
      <div className="absolute inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-2xl bg-background/70 px-4 py-3 backdrop-blur-md">
        <div className="text-left">
          <p className="font-display text-sm font-semibold">{PERSON.name}</p>
        </div>
        <span className="status-dot h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
    </div>
  );
}

function Hero3DVisual() {
  return (
    <div data-cursor="scene">
      <Scene3D
        className="h-[240px] w-[240px] sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px] lg:h-[400px] lg:w-[400px] xl:h-[440px] xl:w-[440px]"
        cameraPosition={[0, 0, 8.5]}
        fallback={null}
      >
        <HeroMernScene />
      </Scene3D>
      <div className="mt-2 text-center lg:text-right">
        <p className="eyebrow">Frontend → API → Server → Database</p>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">
          React · Node · Express · MongoDB
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-8 pt-28 pb-16 sm:px-12 lg:px-20 xl:px-28"
    >
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full opacity-45 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--electric), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full opacity-35 blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--violet), transparent 65%)" }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-8 xl:gap-10">
        {/* Left: identity column */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Reveal preset="blur">
            <h1 className="eyebrow flex items-center justify-center gap-3 lg:justify-start">
              <span className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
              {PERSON.title.toUpperCase()}
            </h1>
          </Reveal>

          <Reveal preset="scale" delay={0.3}>
            <div className="mt-8">
              <ProfilePhoto />
            </div>
          </Reveal>

          <Reveal preset="up" delay={0.35}>
            <p className="mt-8 max-w-[650px] text-base leading-relaxed text-muted-foreground sm:text-lg">
              I design and develop modern full-stack web applications using MongoDB, Express.js,
              React.js and Node.js, with a strong focus on performance, architecture and user
              experience.
            </p>
          </Reveal>

          <Reveal preset="up" delay={0.45}>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <MagneticButton onClick={() => scrollTo("projects")}>
                Explore My Work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </MagneticButton>
              <MagneticButton variant="ghost" onClick={() => scrollTo("contact")}>
                Let&apos;s Connect
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal preset="up" delay={0.55}>
            <ul className="mt-10 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {BADGES.map((b) => (
                <li
                  key={b}
                  data-cursor="tech"
                  className="glass rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:text-cyan"
                >
                  {b.toUpperCase()}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Mobile: 3D below content */}
          <Reveal preset="up" delay={0.65} className="mt-12 lg:hidden">
            <Hero3DVisual />
          </Reveal>
        </div>

        {/* Right: 3D visual (desktop/tablet) */}
        <Reveal preset="up" delay={0.65} className="hidden lg:flex lg:mt-14 lg:justify-end lg:self-start">
          <Hero3DVisual />
        </Reveal>
      </div>
    </section>
  );
}
