import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { CornerMarks } from "../ui/CornerMarks";
import { Reveal } from "../motion/Reveal";
import { fadeIn, staggerContainer, viewportConfig } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { PortfolioSystem } from "../../data/portfolio";

interface PortfolioPlateProps {
  system: PortfolioSystem;
  /** Alternates the specs column to the right on odd plates. */
  flip?: boolean;
}

export function PortfolioPlate({ system, flip = false }: PortfolioPlateProps) {
  const subColumns =
    system.subs.length >= 3
      ? "sm:grid-cols-3"
      : system.subs.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-1";

  return (
    <section
      id={system.id}
      className={cn(
        "relative overflow-hidden py-20 md:py-28 scroll-mt-24",
        flip ? "bg-cream" : "bg-white",
      )}
    >
      <Container className="relative z-10">
        <div className="flex items-baseline gap-5 md:gap-7 mb-10 md:mb-14">
          <span
            aria-hidden="true"
            className="font-heading font-bold leading-none text-teal/25 text-4xl md:text-6xl"
          >
            {system.num}
          </span>
          <h2 className="font-heading font-semibold tracking-[-0.02em] leading-[1.05] text-navy text-2xl md:text-4xl lg:text-[2.75rem] max-w-[18ch]">
            {system.title}
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* Spec sheet */}
          <motion.dl
            variants={fadeIn}
            className={cn(
              "lg:col-span-3 border-t border-navy/15",
              flip && "lg:order-2",
            )}
          >
            {system.specs.map((spec) => (
              <div key={spec.label} className="py-3.5 border-b border-navy/15">
                <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal mb-1.5">
                  {spec.label}
                </dt>
                <dd className="text-[13px] leading-relaxed text-navy/75">
                  {spec.value}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Plates + narrative */}
          <div className={cn("lg:col-span-9", flip && "lg:order-1")}>
            <Reveal variant="frame" as="figure">
              <div className="relative u-media border border-navy/15 bg-white p-3">
                <CornerMarks opacity={0.55} inset={-1} />
                <img
                  src={system.hero.src}
                  alt={system.hero.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full block"
                />
              </div>
              <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/45">
                {system.hero.caption}
              </figcaption>
            </Reveal>

            {system.subs.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className={cn("grid grid-cols-1 gap-4 mt-4", subColumns)}
              >
                {system.subs.map((sub) => (
                  <motion.figure key={sub.caption} variants={fadeIn}>
                    <div className="u-media u-card border border-navy/15 bg-white p-2">
                      <img
                        src={sub.src}
                        alt={sub.caption}
                        loading="lazy"
                        decoding="async"
                        className="w-full block"
                      />
                    </div>
                    <figcaption className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/45">
                      {sub.caption}
                    </figcaption>
                  </motion.figure>
                ))}
              </motion.div>
            )}

            <motion.p
              variants={fadeIn}
              className="mt-8 md:mt-10 text-base md:text-lg leading-relaxed text-navy/80 text-pretty max-w-3xl"
            >
              {system.prose}
            </motion.p>

            <motion.ul
              variants={fadeIn}
              className="flex flex-wrap gap-2 mt-7"
            >
              {system.caps.map((cap) => (
                <li
                  key={cap}
                  className="border border-navy/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/60 transition-colors duration-300 hover:border-teal/40 hover:text-teal"
                >
                  {cap}
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
