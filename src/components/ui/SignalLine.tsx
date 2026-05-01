import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

interface SignalLineProps {
  className?: string;
  direction?: "horizontal" | "vertical";
  delay?: number;
}

export function SignalLine({ className, direction = "horizontal", delay = 0 }: SignalLineProps) {
  const isH = direction === "horizontal";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isH ? "h-px w-full" : "w-px h-full",
        "bg-white/[0.05]",
        className
      )}
      aria-hidden="true"
    >
      <motion.div
        className={cn(
          "absolute",
          isH
            ? "top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary-accent/70 to-transparent"
            : "left-0 top-0 w-full h-1/3 bg-gradient-to-b from-transparent via-primary-accent/70 to-transparent"
        )}
        initial={isH ? { x: "-100%" } : { y: "-100%" }}
        animate={isH ? { x: "400%" } : { y: "400%" }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "linear",
          delay,
          repeatDelay: 2.4,
        }}
      />
    </div>
  );
}
