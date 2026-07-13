import { Fragment } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "../../lib/cn";
import { wordRise, fadeOnly, easeOutExpo, viewportConfig } from "../../lib/motion";

type HeadlineTag = "h1" | "h2" | "h3" | "p" | "span";

interface AnimatedHeadlineProps {
  /** The full text; it is split into words for the staggered reveal. */
  text: string;
  /** Word or words to render in the teal accent colour. */
  highlight?: string | string[];
  /** Element to render. Default "h2". */
  as?: HeadlineTag;
  className?: string;
  style?: CSSProperties;
  /** Delay before the first word starts, in seconds. */
  delay?: number;
  /** Seconds between each word. Default 0.06. */
  stagger?: number;
}

const container = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren, ease: easeOutExpo },
  },
});

/** Strip punctuation / case so highlight matching is forgiving. */
const normalize = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/gi, "");

/**
 * Splits text into words that each rise + un-blur with a stagger.
 * The wrapper carries an aria-label with the intact sentence and the
 * word spans are aria-hidden, so assistive tech reads clean text.
 */
export function AnimatedHeadline({
  text,
  highlight,
  as = "h2",
  className,
  style,
  delay = 0,
  stagger = 0.06,
}: AnimatedHeadlineProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const highlightSet = new Set(
    (Array.isArray(highlight) ? highlight : highlight ? [highlight] : [])
      .flatMap((h) => h.split(/\s+/))
      .map(normalize)
      .filter(Boolean),
  );

  const words = text.split(/\s+/).filter(Boolean);

  if (reduced) {
    // Opacity-only reveal of the intact text.
    return (
      <MotionTag
        className={className}
        style={style}
        aria-label={text}
        variants={fadeOnly}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span aria-hidden="true">
          {words.map((word, i) => (
            <span
              key={i}
              className={highlightSet.has(normalize(word)) ? "text-teal" : undefined}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      aria-label={text}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={cn(
                  "inline-block",
                  highlightSet.has(normalize(word)) && "text-teal",
                )}
                variants={wordRise}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </MotionTag>
  );
}
