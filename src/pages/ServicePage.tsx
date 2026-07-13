import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { ImageBand } from "../components/sections/ImageBand";
import { SaasTree } from "../components/sections/SaasTree";
import { TalentNetwork } from "../components/sections/TalentNetwork";
import { PageHero } from "../components/sections/PageHero";
import { CTASection } from "../components/sections/CTASection";
import { SectionTitle } from "../components/ui/SectionTitle";
import { BackgroundSpirals } from "../components/ui/BackgroundSpirals";
import { MarkerAccent } from "../components/ui/MarkerAccent";
import { fadeIn, staggerContainer } from "../lib/motion";
import { getService } from "../data/services";
import { NotFoundPage } from "./NotFoundPage";
export function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return <NotFoundPage />;
  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        tagline={service.summary}
        description={service.intro}
        primaryCta={{ label: "Book A Meeting", to: "/contact" }}
        secondaryCta={{ label: "Back to home", to: "/" }}
      />
      {service.image && (
        <ImageBand
          src={service.image}
          alt={service.imageAlt ?? service.title}
          caption={service.imageCaption}
        />
      )}
      {}
      <section className="py-24 bg-page">
        <Container>
          <SectionTitle
            eyebrow="What we deliver"
            title="Capabilities"
            subtitle={service.summary}
          />
          <motion.div
            key={service.slug + "-capabilities"}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {service.capabilities.map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeIn}
                className="group u-card flex flex-col rounded-2xl border border-ink/10 bg-surface p-7"
              >
                <div className="u-icon w-12 h-12 flex items-center justify-center mb-6 rounded-xl border border-teal/20 bg-teal/10 text-teal">
                  <cap.icon className="w-6 h-6" strokeWidth={1.9} />
                </div>
                <h3 className="font-heading font-bold text-xl text-ink mb-3">
                  {cap.title}
                </h3>
                <p className="text-ink/70 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
      {slug === "software-ai" && <SaasTree />}
      {slug === "hr-solutions" && <TalentNetwork />}
      {}
      <section className="py-24 bg-surface">
        <Container>
          <SectionTitle
            eyebrow="How it works"
            title="From scope to live in four steps"
            subtitle="A clear, accountable path from first conversation to a team that's running your operation."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {service.process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group u-card relative rounded-2xl border border-ink/10 bg-surface-2 p-6"
              >
                <span className="font-heading font-bold text-5xl text-teal/25 leading-none transition-colors duration-300 group-hover:text-teal/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-bold text-lg text-ink mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      <section className="relative overflow-hidden py-24 md:py-32 bg-surface-2">
        <BackgroundSpirals side="both" opacity={0.15} />
        <MarkerAccent
          variant="star"
          className="absolute top-24 right-[5%] w-12 h-12 opacity-60"
          color="#0D9488"
          rotate={18}
        />
        <MarkerAccent
          variant="scribble"
          className="absolute bottom-24 left-[4%] w-20 h-14 opacity-55"
          color="#0D9488"
          rotate={-12}
        />
        <MarkerAccent
          variant="arrow"
          className="absolute top-1/2 left-[3%] w-16 h-12 opacity-45"
          color="#0D9488"
          rotate={-30}
        />
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
            <div className="lg:col-span-8">
              <SectionTitle
                eyebrow="The outcome"
                title="What you get from the partnership"
                align="left"
                className="mb-0 max-w-none"
              />
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
                Results · Not promises
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Outcomes — numbered editorial list */}
            <div className="lg:col-span-7">
              <motion.ol
                key={service.slug + "-outcomes"}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col"
              >
                {service.outcomes.map((outcome, i) => (
                  <motion.li
                    key={outcome}
                    variants={fadeIn}
                    className="group flex items-baseline gap-6 py-5 border-b border-ink/10 last:border-b-0"
                  >
                    <span className="font-heading font-bold text-2xl text-teal/40 tabular-nums shrink-0 w-10 transition-colors duration-300 group-hover:text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink text-lg md:text-xl leading-snug font-medium transition-transform duration-300 group-hover:translate-x-1">
                      {outcome}
                    </span>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
            {/* Highlights — clean spec cards with a teal keyline */}
            <div className="lg:col-span-5">
              <motion.div
                key={service.slug + "-stats"}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col gap-4"
              >
                {service.stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeIn}
                    className="u-card group relative overflow-hidden rounded-2xl border border-ink/10 bg-surface p-6 pl-7"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-5 bottom-5 w-1 rounded-full bg-teal/70 transition-all duration-300 group-hover:top-4 group-hover:bottom-4 group-hover:bg-teal"
                    />
                    <div className="font-heading font-bold text-2xl md:text-[1.7rem] text-ink leading-tight mb-1.5">
                      {stat.value}
                    </div>
                    <div className="text-sm text-ink/60 leading-relaxed">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
