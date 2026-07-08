import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { AnimatedHeadline } from "../motion/AnimatedHeadline";
import { fadeIn, staggerContainer } from "../../lib/motion";
const quote =
  "Our focus is on building the loop — software, staff, and support — that lets clients grow without stitching together four vendors. That's the whole idea.";
const name = "Mohommad Ibraheem Hashmi";
const role = "COO, Treemate";
export function FounderQuote() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-teal blur-[160px] opacity-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full bg-teal blur-[160px] opacity-15"
      />
      {}
      <BackgroundSpirals side="both" color="#5EEAD4" opacity={0.14} />
      <Container className="relative z-10">
        <motion.figure
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <blockquote className="font-heading font-bold text-white leading-[1.1] tracking-[-0.02em] text-3xl md:text-4xl lg:text-5xl">
            <span className="text-teal-light" aria-hidden="true">
              &ldquo;
            </span>
            <AnimatedHeadline as="span" text={quote} className="inline" />
            <span className="text-teal-light" aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>
          <motion.figcaption
            variants={fadeIn}
            className="mt-10 flex flex-col items-center gap-1"
          >
            <span className="font-heading font-bold text-lg text-white">
              {name}
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.14em] text-teal-light">
              {role}
            </span>
          </motion.figcaption>
        </motion.figure>
      </Container>
    </section>
  );
}
