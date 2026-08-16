import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { fadeIn, staggerContainer, viewportConfig } from "../../lib/motion";
import { portfolioSystems } from "../../data/portfolio";

/** Index of every system on the page, linking down to its plate. */
export function PortfolioManifest() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-28">
      <BackgroundSpirals side="both" opacity={0.12} />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-12 md:mb-16 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow="The Manifest"
              title="Eight Systems"
              subtitle="Each one architected, built, and deployed end to end — data model, interface, and infrastructure."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              Selected Work
            </p>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="border-t border-navy/15"
        >
          <div className="hidden md:grid grid-cols-[56px_1.6fr_1fr_1fr] gap-5 px-2 py-3 border-b border-navy/15 text-[11px] font-bold uppercase tracking-[0.18em] text-navy/45">
            <span>No.</span>
            <span>System</span>
            <span>Sector</span>
            <span>Surface</span>
          </div>

          {portfolioSystems.map((system) => (
            <motion.a
              key={system.id}
              variants={fadeIn}
              href={`#${system.id}`}
              className="group grid grid-cols-[44px_1fr] md:grid-cols-[56px_1.6fr_1fr_1fr] gap-x-5 gap-y-1 items-baseline px-2 py-4 border-b border-navy/15 transition-all duration-300 ease-out hover:bg-white hover:pl-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-inset"
            >
              <span className="text-[13px] font-bold tracking-[0.08em] text-teal">
                {system.num}
              </span>
              <span className="font-heading font-semibold text-base md:text-lg text-navy leading-snug transition-colors duration-300 group-hover:text-teal">
                {system.title}
              </span>
              <span className="col-start-2 md:col-start-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/55">
                {system.sector}
              </span>
              <span className="hidden md:block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/45">
                {system.surface}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
