import { cn } from "../../lib/cn";

interface GlowProps {
  className?: string;
  variant?: "primary" | "accent" | "center" | "top" | "green";
  animated?: boolean;
}

export function Glow({ className, variant = "primary", animated = false }: GlowProps) {
  const variants = {
    primary: "bg-primary/20",
    accent: "bg-accent-green/8",
    center: "bg-primary/12",
    top: "bg-primary/22",
    green: "bg-accent-green/10",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full",
        "blur-[120px]",
        animated && "animate-pulse-slow",
        variants[variant],
        className
      )}
      aria-hidden="true"
    />
  );
}
