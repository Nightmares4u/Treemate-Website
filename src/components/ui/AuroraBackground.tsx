import { cn } from "../../lib/cn";

interface AuroraBackgroundProps {
  className?: string;
  variant?: "hero" | "section" | "cta";
}

export function AuroraBackground({ className, variant = "section" }: AuroraBackgroundProps) {
  const configs = {
    hero: {
      primary: "w-[900px] h-[700px] -top-[20%] -left-[15%] opacity-[0.13]",
      secondary: "w-[600px] h-[500px] top-[30%] right-[-10%] opacity-[0.07]",
      accent: "w-[400px] h-[300px] bottom-[5%] left-[40%] opacity-[0.05]",
    },
    section: {
      primary: "w-[700px] h-[500px] -top-[30%] left-[10%] opacity-[0.09]",
      secondary: "w-[500px] h-[400px] bottom-[-20%] right-[5%] opacity-[0.06]",
      accent: "w-[300px] h-[200px] top-[50%] left-[-5%] opacity-[0.04]",
    },
    cta: {
      primary: "w-[900px] h-[600px] top-[-20%] left-1/2 -translate-x-1/2 opacity-[0.18]",
      secondary: "w-[500px] h-[400px] bottom-[-10%] left-[10%] opacity-[0.08]",
      accent: "w-[400px] h-[300px] top-[20%] right-[5%] opacity-[0.07]",
    },
  };

  const c = configs[variant];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Primary purple aurora */}
      <div
        className={cn(
          "absolute rounded-full bg-primary blur-[140px] animate-aurora",
          c.primary
        )}
      />
      {/* Secondary aurora */}
      <div
        className={cn(
          "absolute rounded-full bg-primary-accent blur-[120px] animate-aurora [animation-delay:-6s]",
          c.secondary
        )}
      />
      {/* Green signal accent */}
      <div
        className={cn(
          "absolute rounded-full bg-accent-green blur-[100px] animate-aurora [animation-delay:-12s]",
          c.accent
        )}
      />
    </div>
  );
}
