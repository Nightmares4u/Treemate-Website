import { motion } from "framer-motion";
import { ShoppingBag, Rocket, Truck, type LucideIcon } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { MarkerAccent } from "../ui/MarkerAccent";
import { fadeIn, staggerContainer } from "../../lib/motion";
interface Scenario {
  icon: LucideIcon;
  vertical: string;
  headline: string;
  body: string;
  loopSummary: string;
}
const scenarios: Scenario[] = [
  {
    icon: ShoppingBag,
    vertical: "E-commerce brand",
    headline: "Orders, tickets, and staffing — one platform.",
    body: "We build the CRM that unifies orders, returns, and customer conversations. Our CS team works the tickets inside it. Our HR team hires and manages those agents.",
    loopSummary: "Software → Support → Staffing, one loop.",
  },
  {
    icon: Rocket,
    vertical: "SaaS startup",
    headline: "T2 and T3 support inside the product you ship.",
    body: "We integrate custom AI features into your app, then run tiered support from agents who natively understand the codebase — with human-in-the-loop AI on every ticket.",
    loopSummary: "Software → Support, with AI woven in.",
  },
  {
    icon: Truck,
    vertical: "Logistics operator",
    headline: "Dispatch, coverage, and compliance — under one partner.",
    body: "We build the dispatch dashboard, staff 24/7 dispatchers across US and Australian time zones, and keep every hire compliant with Fair Work and US labor law.",
    loopSummary: "Software → Staffing → Support, US + AU.",
  },
];
export function LoopInAction() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-surface-2">
      {}
      <MarkerAccent
        variant="star"
        className="absolute top-24 right-[8%] w-12 h-12 text-teal opacity-70"
        color="#0D9488"
        rotate={-8}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute top-1/2 right-[3%] w-16 h-12 opacity-45"
        color="#0D9488"
        rotate={-25}
      />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="The Loop in Action"
              subtitle="Illustrative scenarios of how the closed loop plays out across the businesses we're built for. Not case studies — those come as we grow."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              How the loop applies
            </p>
          </div>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {scenarios.map((s) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.vertical}
                variants={fadeIn}
                className="group u-card flex flex-col rounded-2xl border border-ink/10 bg-surface p-6"
              >
                <span className="u-icon w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 text-teal flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal mb-2">
                  {s.vertical}
                </span>
                <h3 className="font-heading font-bold text-lg text-ink leading-snug mb-3 transition-colors duration-300 group-hover:text-teal">
                  {s.headline}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-6 flex-1">
                  {s.body}
                </p>
                <p className="pt-5 border-t border-ink/10 text-xs font-semibold text-ink/80">
                  {s.loopSummary}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
