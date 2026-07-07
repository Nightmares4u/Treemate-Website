import { motion } from "framer-motion";
import {
  Handshake,
  Database,
  Headphones,
  UserCog,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { MarkerAccent } from "../ui/MarkerAccent";
import { fadeIn, staggerContainer, easeOutExpo } from "../../lib/motion";
interface LoopStep {
  icon: LucideIcon;
  pillar: string;
  title: string;
  description: string;
}
const steps: LoopStep[] = [
  {
    icon: Handshake,
    pillar: "Engagement",
    title: "You partner with Treemate",
    description:
      "One agreement covers the software, the staffing, and the support — not four separate vendors.",
  },
  {
    icon: Database,
    pillar: "Software & AI",
    title: "We build your custom CRM",
    description:
      "A bespoke CRM, and the systems around it, engineered for how your business actually operates.",
  },
  {
    icon: Headphones,
    pillar: "Customer Success",
    title: "We support your customers in it",
    description:
      "Our CS team works your customers' tickets inside that exact CRM — no context lost between tools or teams.",
  },
  {
    icon: UserCog,
    pillar: "HR Solutions",
    title: "We staff & manage those agents",
    description:
      "Our HR team hires, onboards, and manages those support agents in our custom HRM — payroll and compliance included.",
  },
];
export function ClosedLoop() {
  return (
    <section
      id="closed-loop"
      className="relative py-24 md:py-32 bg-grid overflow-hidden"
    >
      {}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-32 w-[420px] h-[420px] rounded-full bg-mint blur-[130px] opacity-60"
      />
      {}
      <MarkerAccent
        variant="star"
        className="absolute top-20 right-[6%] w-12 h-12 opacity-60"
        color="#0D9488"
        rotate={15}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute top-1/2 right-[3%] w-20 h-14 opacity-50"
        color="#0D9488"
        rotate={-120}
      />
      <MarkerAccent
        variant="scribble"
        className="absolute bottom-24 right-[8%] w-20 h-14 opacity-55"
        color="#0D9488"
        rotate={-10}
      />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="The Closed Loop Ecosystem"
              subtitle="Four functions, one system, zero handoffs — this is our competitive moat. When you hire Treemate, the software, the support, and the staffing all run inside the same systems."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              One partner · Not four vendors
            </p>
          </div>
        </div>
        {}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-4"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={fadeIn}
                className="relative flex"
              >
                <div className="group u-card flex flex-col h-full w-full rounded-2xl border border-ink/10 bg-surface p-6">
                  <div className="flex items-center justify-between mb-5">
                    <span className="u-icon w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 text-teal flex items-center justify-center">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </span>
                    <span className="font-heading font-semibold text-4xl text-ink/10 leading-none transition-colors duration-300 group-hover:text-teal/30">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal mb-2">
                    {step.pillar}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-ink leading-snug mb-2 transition-colors duration-300 group-hover:text-teal">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        {}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 border-t border-dashed border-teal/40"
        >
          <span className="w-12 h-12 shrink-0 rounded-xl bg-teal flex items-center justify-center shadow-lg shadow-teal/20">
            <RefreshCcw className="w-6 h-6 text-white" strokeWidth={2} />
          </span>
          <p className="text-ink leading-relaxed">
            <span className="font-heading font-bold">And the loop closes.</span>{" "}
            Every layer runs in software we built and systems we operate — so
            your customers are served, your agents are managed, and nothing
            falls through the gaps between four separate companies.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
