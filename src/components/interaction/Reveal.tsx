import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Preset = "up" | "blur" | "scale" | "left" | "right" | "rotate" | "clip";

const PRESETS: Record<Preset, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)", y: 18 },
    show: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -60, rotateY: 12 },
    show: { opacity: 1, x: 0, rotateY: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 60, rotateY: -12 },
    show: { opacity: 1, x: 0, rotateY: 0 },
  },
  rotate: {
    hidden: { opacity: 0, rotateX: 28, y: 50, transformPerspective: 1000 },
    show: { opacity: 1, rotateX: 0, y: 0 },
  },
  clip: {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    show: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  },
};

export function Reveal({
  children,
  preset = "up",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  preset?: Preset;
  delay?: number;
  className?: string | undefined;
  as?: "div" | "section" | "li" | "article";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={PRESETS[preset]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Word-by-word cinematic heading reveal. */
export function RevealWords({
  text,
  className,
  highlight,
  delay = 0,
}: {
  text: string;
  className?: string | undefined;
  highlight?: string | undefined;
  delay?: number | undefined;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline-flex flex-wrap gap-x-[0.28em]", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="overflow-hidden py-[0.06em]"
        >
          <motion.span
            className={cn(
              "inline-block",
              highlight &&
                word.replace(/[^A-Za-z]/g, "") === highlight
                ? "text-gradient-animated"
                : undefined
            )}
            variants={{
              hidden: {
                y: "110%",
                opacity: 0,
                filter: "blur(10px)",
              },
              show: {
                y: "0%",
                opacity: 1,
                filter: "blur(0px)",
              },
            }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
