import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  magnetic?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, magnetic = false, ...props }, ref) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 280, damping: 22 });
    const springY = useSpring(y, { stiffness: 280, damping: 22 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.35);
      y.set((e.clientY - cy) * 0.35);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const variants = {
      primary: cn(
        "relative overflow-hidden",
        "bg-gradient-to-br from-primary-accent via-primary to-primary-deep",
        "text-white border-0",
        "shadow-brand-sm hover:shadow-brand-md",
        "before:absolute before:inset-0 before:rounded-full",
        "before:bg-gradient-to-t before:from-white/0 before:to-white/[0.06]",
        "before:opacity-100",
      ),
      secondary: cn(
        "bg-surface-light/60 text-text-primary",
        "border border-border-strong",
        "hover:bg-surface-light hover:border-border-strong",
        "backdrop-blur-xl",
        "shadow-inset-hairline",
      ),
      ghost: cn(
        "bg-transparent text-text-secondary",
        "hover:bg-surface-light/40 hover:text-text-primary",
      ),
      outline: cn(
        "relative overflow-hidden",
        "bg-transparent text-text-secondary",
        "border border-border",
        "hover:border-primary/40 hover:text-text-primary",
        "hover:shadow-[0_0_20px_rgba(124,58,237,0.08)]",
      ),
    };

    const sizes = {
      sm: "h-9 px-4 text-[13px] gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-[52px] px-8 text-base gap-2.5",
    };

    return (
      <motion.button
        ref={ref}
        style={magnetic ? { x: springX, y: springY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium font-body",
          "transition-all duration-300 ease-out-expo",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base",
          "disabled:opacity-50 disabled:pointer-events-none",
          "select-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {variant === "primary" && (
          <span className="sheen-overlay" aria-hidden="true" />
        )}
        <span className="relative z-10 flex items-center gap-[inherit]">
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
