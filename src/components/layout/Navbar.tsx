import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { NAV_ITEMS, PERSON } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.assign(`/#${id}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full border border-transparent px-4 transition-all duration-500",
          scrolled ? "glass py-2 shadow-[0_20px_60px_-40px_oklch(0_0_0)]" : "py-3.5",
        )}
      >
        <Link
          to="/"
          data-cursor="link"
          className="relative flex items-center gap-2 pl-2 font-display text-lg font-bold tracking-tight"
          style={{ perspective: "600px" }}
          aria-label={`${PERSON.name} — home`}
        >
          <span className="text-gradient-animated">{PERSON.short}</span>
          <span className="hidden text-[10px] tracking-[0.2em] text-muted-foreground sm:inline">
            /DEV
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                data-cursor="link"
                onClick={() => go(item.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full border border-cyan/30 bg-cyan/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            data-cursor="button"
            onClick={() => go("contact")}
            className="hidden rounded-full border border-cyan/40 px-4 py-2 text-xs tracking-wide text-cyan transition-colors hover:bg-cyan/10 sm:block"
          >
            Hire me
          </button>
          <button
            className="rounded-full border border-border p-2.5 lg:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-px w-4 bg-foreground" />
            <span className="mt-1 block h-px w-4 bg-foreground" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass absolute top-20 left-4 right-4 rounded-2xl p-3 lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
