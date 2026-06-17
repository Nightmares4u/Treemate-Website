import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { buttonClasses, type ButtonVariant, type ButtonSize } from "./buttonStyles";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  magnetic?: boolean;
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
      x.set((e.clientX - cx) * 0.3);
      y.set((e.clientY - cy) * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.button
        ref={ref}
        style={magnetic ? { x: springX, y: springY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.97 }}
        className={buttonClasses(variant, size, className)}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        <span className="relative z-10 flex items-center gap-[inherit]">{children}</span>
      </motion.button>
    );
  },
);

Button.displayName = "Button";
