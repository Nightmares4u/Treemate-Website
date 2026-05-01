import * as React from "react";
import { cn } from "../../lib/cn";

export interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  containerClassName?: string;
  borderClassName?: string;
  glowOnHover?: boolean;
  glowColor?: string;
}

export function GradientBorder({
  children,
  className,
  containerClassName,
  borderClassName,
  glowOnHover = true,
  glowColor = "rgba(124,58,237,0.18)",
  ...props
}: GradientBorderProps) {
  return (
    <div
      className={cn(
        "relative group/border rounded-2xl p-px",
        glowOnHover && "transition-shadow duration-700",
        containerClassName
      )}
      style={
        glowOnHover
          ? {
              // Applied via CSS group-hover; we use a box-shadow fallback
            }
          : undefined
      }
    >
      {/* Gradient hairline border */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl pointer-events-none",
          "bg-gradient-to-b from-white/[0.10] via-white/[0.03] to-transparent",
          "group-hover/border:from-primary/50 group-hover/border:via-primary/10 group-hover/border:to-transparent",
          "transition-all duration-700",
          borderClassName
        )}
      />
      {/* Bottom seam accent on hover */}
      <div
        className="absolute inset-x-[10%] bottom-0 h-px rounded-full pointer-events-none
          bg-gradient-to-r from-transparent via-primary-accent/0 to-transparent
          group-hover/border:via-primary-accent/40
          transition-all duration-700"
      />
      {/* Content wrapper */}
      <div
        className={cn(
          "relative h-full w-full bg-surface rounded-[15px] overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
