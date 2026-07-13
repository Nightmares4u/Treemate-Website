import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { RevealGroup } from "../motion/Reveal";
import { AnimatedHeadline } from "../motion/AnimatedHeadline";
import { Counter } from "../motion/Counter";
import { fadeIn } from "../../lib/motion";
interface Stat {
  value: string;
  label: string;
}
const stats: Stat[] = [
  { value: "4", label: "Integrated pillars" },
  { value: "Global", label: "Coverage" },
  { value: "24/7", label: "Support coverage" },
  { value: "1", label: "Loop, not four vendors" },
];
export function Impact() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-cream-soft">
      <BackgroundSpirals side="right" opacity={0.15} />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="Our Impact"
              subtitle="What Treemate is built for. No inflated numbers — just the shape of the partnership."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              Software-first · AI-led
            </p>
          </div>
        </div>
        {}
        <RevealGroup
          as="div"
          variant="scale"
          stagger={0.1}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-16 md:mb-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <Counter
                value={stat.value}
                className="font-heading font-semibold text-navy leading-none tracking-[-0.03em] text-5xl md:text-6xl mb-3"
              />
              <span className="text-sm font-medium text-navy/60 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </RevealGroup>
        {}
        <div className="flex flex-col items-center text-center gap-4">
          <AnimatedHeadline
            as="p"
            text="One loop."
            className="font-heading font-semibold text-teal leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
          />
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-base md:text-lg font-medium text-navy/70 max-w-xl"
          >
            Software, staff, and support — under one accountable partnership.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
