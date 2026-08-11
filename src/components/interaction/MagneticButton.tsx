import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer } from "@/hooks/use-environment";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
  strength?: number;
};

/** Button with cursor-follow magnetism and a glow surface. */
export const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { children, className, variant = "primary", strength = 0.35, ...rest },
  forwardedRef,
) {
  const localRef = useRef<HTMLButtonElement>(null);
  const fine = useFinePointer();

  const setRefs = (node: HTMLButtonElement | null) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const handleMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!fine || !localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    localRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (localRef.current) localRef.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <button
      ref={setRefs}
      data-cursor="button"
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-[transform,box-shadow,background] duration-300 will-change-transform",
        variant === "primary"
          ? "text-primary-foreground glow-ring"
          : "glass text-foreground hover:border-cyan/50",
        className,
      )}
      style={
        variant === "primary"
          ? { backgroundImage: "var(--gradient-brand)" }
          : undefined
      }
      {...rest}
    >
      {children}
    </button>
  );
});
