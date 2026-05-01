import { cn } from "../../lib/cn";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "live" | "green";
}

export function Eyebrow({ children, className, variant = "default" }: EyebrowProps) {
  const dot: Record<string, string> = {
    default: "bg-primary-accent",
    live: "bg-accent-green",
    green: "bg-accent-green",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5",
        "rounded-full px-4 py-1.5",
        "bg-surface/80 border border-border backdrop-blur-md",
        "w-fit",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {variant === "live" && (
          <span
            className={cn(
              "animate-signal-pulse absolute inline-flex h-full w-full rounded-full opacity-75",
              dot[variant]
            )}
          />
        )}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", dot[variant])} />
      </span>
      <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-secondary leading-none whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}
