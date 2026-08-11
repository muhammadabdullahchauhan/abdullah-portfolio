import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealWords } from "@/components/interaction/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string | undefined;
  title: string;
  highlight?: string | undefined;
  description?: ReactNode | undefined;
  align?: "left" | "center";
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal preset="blur">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <h2 className="text-balance text-3xl leading-[1.05] font-semibold sm:text-4xl lg:text-5xl">
        <RevealWords text={title} highlight={highlight} />
      </h2>
      {description && (
        <Reveal preset="up" delay={0.15}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 px-5 py-24 sm:px-8 lg:py-24", className)}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
