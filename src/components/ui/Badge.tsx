import * as React from "react";
import { cn } from "../../lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "glow";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-surface-light text-text-primary border border-border",
    outline: "bg-transparent border border-border text-text-secondary",
    glow: "bg-primary/10 text-primary-accent border border-primary/30 shadow-[0_0_10px_rgba(124,58,237,0.2)]"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur-md",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
