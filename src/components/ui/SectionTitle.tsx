import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { fadeIn, staggerContainer, viewportConfig } from "../../lib/motion";
import { AnimatedHeadline } from "../motion/AnimatedHeadline";
import { MarkerAccent } from "./MarkerAccent";
interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  marker?:
    "underline" | "underline-double" | "star" | "scribble" | "arrow" | "none";
}
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
  marker = "underline",
}: SectionTitleProps) {
  const isDark = tone === "dark";
  const markerColor = isDark ? "#5EEAD4" : "#0D9488";
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={cn(
        "flex flex-col gap-4 mb-12 md:mb-16",
        align === "center"
          ? "items-center text-center mx-auto max-w-3xl"
          : "items-start max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeIn}
          className={cn(
            "text-[11px] font-bold uppercase tracking-[0.18em]",
            isDark ? "text-teal-light" : "text-teal",
          )}
        >
          {eyebrow}
        </motion.span>
      )}
      <div className="relative inline-block">
        <AnimatedHeadline
          as="h2"
          text={title}
          className={cn(
            "font-heading font-semibold tracking-[-0.02em] leading-[1.02] text-4xl md:text-5xl lg:text-[3.75rem]",
            isDark ? "text-white" : "text-navy",
          )}
        />
        {}
        {marker !== "none" && (
          <motion.div
            variants={fadeIn}
            className={cn(
              "absolute pointer-events-none",
              (marker === "underline" || marker === "underline-double") &&
                "left-0 -bottom-4 md:-bottom-5 w-[60%] max-w-[240px] h-4 md:h-5",
              marker === "star" && "-right-6 -top-4 w-10 h-10 md:w-12 md:h-12",
              marker === "scribble" &&
                "-right-8 -top-6 w-16 h-12 md:w-20 md:h-14",
              marker === "arrow" &&
                "-right-12 -top-4 w-16 h-10 md:w-20 md:h-12",
            )}
          >
            <MarkerAccent
              variant={marker}
              color={markerColor}
              rotate={
                marker === "underline" ? -1.5 : marker === "star" ? 12 : 0
              }
              className="w-full h-full"
            />
          </motion.div>
        )}
      </div>
      {subtitle && (
        <motion.p
          variants={fadeIn}
          className={cn(
            "text-base md:text-lg leading-relaxed text-pretty",
            isDark ? "text-slate-300" : "text-slate-600",
            marker === "underline" || marker === "underline-double"
              ? "pt-3 md:pt-4"
              : "",
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
