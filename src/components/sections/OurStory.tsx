import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { staggerContainer, fadeOnly, easeOutExpo, scaleIn } from "../../lib/motion";
import { cn } from "../../lib/cn";
interface Milestone {
  year: string;
  title: string;
  description: string;
}
const milestones: Milestone[] = [
  {
    year: "2024",
    title: "The Beginning",
    description:
      "Treemate is founded on the closed-loop principle: build the software, staff the people, and support the customers — under one accountable partnership.",
  },
  {
    year: "2024",
    title: "Software Foundations",
    description:
      "Custom CRM, HRM, and POS platforms architected as the operating layer for every client engagement. AI integration built in from day one.",
  },
  {
    year: "2025",
    title: "Cross-Border Operations",
    description:
      "US and Australia coverage established; compliance frameworks in place for both markets, cross-border payroll running through our own HRM.",
  },
  {
    year: "2026",
    title: "Expanding the Ecosystem",
    description:
      "Growing the platform, the team, and the closed loop across new verticals — from e-commerce and SaaS to logistics and professional services.",
  },
];
export function OurStory() {
  const reduced = useReducedMotion();

  const slideVariants = (alignRight: boolean): Variants =>
    reduced
      ? fadeOnly
      : {
          hidden: { opacity: 0, x: alignRight ? 28 : -28 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: easeOutExpo },
          },
        };

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-cream">
      <BackgroundSpirals side="both" opacity={0.12} />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="Our Story"
              subtitle="Founded on the principle that software, staffing, and support should run as one system — not three separate contracts."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              Since 2024
            </p>
          </div>
        </div>
        {}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative max-w-4xl mx-auto"
        >
          {}
          <span
            aria-hidden="true"
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-navy/15 md:-translate-x-1/2"
          />
          {milestones.map((m, i) => {
            const alignRight = i % 2 === 1;
            return (
              <motion.li
                key={m.title}
                variants={slideVariants(alignRight)}
                className="relative pb-12 md:pb-16 last:pb-0"
              >
                {}
                <motion.span
                  aria-hidden="true"
                  variants={reduced ? fadeOnly : scaleIn}
                  className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 flex items-center justify-center z-10"
                >
                  <span className="w-3 h-3 rounded-full bg-teal ring-4 ring-cream" />
                </motion.span>
                {}
                <div
                  className={cn(
                    "flex flex-col pl-14 md:pl-0 md:w-1/2",
                    alignRight
                      ? "md:ml-auto md:pl-12 md:text-left"
                      : "md:pr-12 md:text-right",
                  )}
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-teal mb-2">
                    {m.year}
                  </span>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-navy leading-tight mb-3">
                    {m.title}
                  </h3>
                  <p className="text-navy/70 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </section>
  );
}
