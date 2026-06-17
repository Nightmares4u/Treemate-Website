import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { blurIn, fadeIn, staggerContainer } from "../../lib/motion";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: SectionTitleProps) {
  const isDark = tone === "dark";
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex flex-col gap-4 mb-12 md:mb-16",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeIn}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]",
            isDark ? "bg-white/10 text-teal-light" : "bg-teal/10 text-teal",
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={blurIn}
        className={cn(
          "font-heading font-bold tracking-tight leading-[1.08] text-3xl md:text-4xl lg:text-[2.75rem]",
          isDark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeIn}
          className={cn(
            "text-base md:text-lg leading-relaxed text-pretty",
            isDark ? "text-slate-300" : "text-slate-600",
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
