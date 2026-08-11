import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PERSON } from "@/data/portfolio";

/** Short premium boot sequence: wordmark, title and a wireframe stack loader. */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduced ? 200 : 1700);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(18px)", scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
          <svg
            viewBox="0 0 200 200"
            className="h-32 w-32"
            aria-hidden
            style={{ filter: "drop-shadow(0 0 18px color-mix(in oklab, var(--electric) 55%, transparent))" }}
          >
            <g fill="none" stroke="var(--cyan)" strokeWidth="1.2" opacity="0.8">
              <motion.path
                d="M100 30 L160 70 L160 130 L100 170 L40 130 L40 70 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
              <motion.path
                d="M100 30 L100 170 M40 70 L160 130 M160 70 L40 130"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
              />
            </g>
            {[
              [100, 30],
              [160, 70],
              [160, 130],
              [100, 170],
              [40, 130],
              [40, 70],
              [100, 100],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={i === 6 ? 7 : 4}
                fill={i === 6 ? "var(--violet)" : "var(--electric)"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.07, type: "spring", stiffness: 260 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            ))}
          </svg>

          <motion.p
            className="mt-8 font-display text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gradient-animated">{PERSON.short}</span>
          </motion.p>
          <motion.p
            className="eyebrow mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            {PERSON.title}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
