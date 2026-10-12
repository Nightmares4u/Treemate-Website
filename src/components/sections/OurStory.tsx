import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { easeOutBack, easeOutExpo, fadeIn, fadeOnly, viewportConfig } from "../../lib/motion";
import { cn } from "../../lib/cn";

interface Milestone {
  year: string;
  title: string;
  description: ReactNode;
}

const milestones: Milestone[] = [
  {
    year: "2010",
    title: "Where It Started",
    description:
      "In 2010, Treemate Private Limited was born in Pakistan with a single conviction: Pakistani enterprises deserve world-class software, built by people who understand them. No shortcuts, no compromises — serious systems for serious businesses.",
  },
  {
    year: "2015",
    title: "The Marketing Arm",
    description: (
      <>
        Five years in, we saw the gap: great software means little if nobody finds you. Treemate expanded vertically into digital marketing — giving Pakistani clients the power to build <em>and</em> be seen, under one roof.
      </>
    ),
  },
  {
    year: "2018",
    title: "The People Arm",
    description:
      "Then came the hardest problem in business: people. The HR outsourcing wing launched, and Treemate became something rare — software, marketing, and people operations moving as one. Three disciplines, one company, zero handoffs.",
  },
  {
    year: "2022",
    title: "Treemate US",
    description:
      "2022 changed everything. Treemate LLC opened in the United States — a new market, a new digital presence, and the closed loop at full strength across two countries. What started in Pakistan was now built for the world.",
  },
  {
    year: "2026",
    title: "Scaling the Loop",
    description:
      "Now we're going further than ever. Treemate is scaling aggressively and adding its fourth wing: BPO. Software, marketing, HR, and BPO — the complete loop, under one roof, engineered for what's next.",
  },
];

const growthReveal: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.95, ease: easeOutBack },
  },
};

const growthRing: Variants = {
  hidden: { opacity: 0, scale: 0.25 },
  visible: {
    opacity: [0, 0.8, 0.35],
    scale: [0.25, 1.35, 1],
    transition: { duration: 1.1, times: [0, 0.65, 1], ease: easeOutExpo, delay: 0.15 },
  },
};

export function OurStory() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 40%"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 130, damping: 26 });

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
              Since 2010
            </p>
          </div>
        </div>
        {}
        <ol ref={timelineRef} className="relative max-w-4xl mx-auto">
          {}
          <span
            aria-hidden="true"
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-navy/15 md:-translate-x-1/2"
          />
          <span
            aria-hidden="true"
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px md:-translate-x-1/2"
          >
            <motion.span
              className="block w-full h-full bg-teal origin-top"
              style={{ scaleY: reducedMotion ? 1 : lineProgress }}
            />
          </span>
          {milestones.map((m, i) => {
            const alignRight = i % 2 === 1;
            const isGrowth = m.year === "2022";
            return (
              <motion.li
                key={m.year}
                variants={reducedMotion ? fadeOnly : isGrowth ? growthReveal : fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="group relative pb-12 md:pb-16 last:pb-0"
              >
                {}
                <span
                  aria-hidden="true"
                  className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 flex items-center justify-center z-10"
                >
                  {isGrowth && (
                    <motion.span
                      variants={reducedMotion ? fadeOnly : growthRing}
                      className="absolute w-16 h-16 rounded-full border-2 border-teal/70 bg-mint/30"
                    />
                  )}
                  <span className={cn(
                    "rounded-full bg-teal ring-4 ring-cream transition-all duration-300 group-hover:scale-[1.6] group-hover:ring-teal/20",
                    isGrowth ? "w-5 h-5 shadow-[0_0_0_8px_rgba(13,148,136,0.14)]" : "w-3 h-3",
                  )} />
                </span>
                {}
                <div
                  className={cn(
                    "flex flex-col pl-14 md:pl-0 md:w-1/2",
                    alignRight
                      ? "md:ml-auto md:pl-12 md:text-left"
                      : "md:pr-12 md:text-right",
                  )}
                >
                  <div className={cn(
                    isGrowth && "rounded-2xl border border-teal/30 bg-white/70 p-6 md:p-8 shadow-[0_18px_50px_-30px_rgba(13,148,136,0.8)]",
                    m.year === "2026" && "border-l-2 border-teal/50 pl-5 md:border-l-0 md:border-r-2 md:pl-0 md:pr-7",
                  )}>
                    <span className="text-sm font-semibold uppercase tracking-[0.14em] text-teal mb-2 block">
                      {m.year}
                    </span>
                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-navy leading-tight mb-3 transition-colors duration-300 group-hover:text-teal">
                      {m.title}
                      {m.year === "2026" && <ArrowUpRight aria-hidden="true" className="inline-block ml-2 w-5 h-5 text-teal" />}
                    </h3>
                    <p className="text-navy/70 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
