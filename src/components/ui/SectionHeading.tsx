import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/cn";
import { blurIn, fadeIn, staggerContainer } from "../../lib/motion";

interface SectionHeadingProps extends HTMLMotionProps<"div"> {
  title: string;
  subtitle?: string;
  label?: string;
  align?: "left" | "center";
  titleSize?: "default" | "large";
}

export function SectionHeading({
  title,
  subtitle,
  label,
  align = "center",
  titleSize = "default",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "mb-16 md:mb-20 flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start max-w-2xl",
        className
      )}
      {...props}
    >
      {label && (
        <motion.div variants={fadeIn}>
          <div className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1 bg-primary/[0.08] border border-primary/20 w-fit">
            <span className="w-1 h-1 rounded-full bg-primary-accent" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary-accent leading-none">
              {label}
            </span>
          </div>
        </motion.div>
      )}

      <motion.h2
        variants={blurIn}
        className={cn(
          "font-heading font-semibold text-text-primary tracking-tight leading-[1.06]",
          titleSize === "large"
            ? "text-4xl md:text-5xl lg:text-[3.5rem]"
            : "text-3xl md:text-4xl lg:text-5xl"
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeIn}
          className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl font-light text-pretty"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
