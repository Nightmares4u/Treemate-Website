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
      <section className="py-24 bg-base">
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
                className="group flex flex-col p-2 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6">
                  <cap.icon className="w-8 h-8 text-teal" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy mb-3">
                  {cap.title}
                </h3>
                <p className="text-navy/70 leading-relaxed">
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
      <section className="py-24 bg-white">
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative p-2"
              >
                <span className="font-heading font-bold text-5xl text-teal/25 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-bold text-lg text-navy mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      <section className="relative overflow-hidden py-24 md:py-32 bg-cream-soft">
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
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
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
                    className="flex items-start gap-6 py-5 border-b border-navy/10 last:border-b-0"
                  >
                    <span className="font-mono font-bold text-teal text-xs tracking-[0.14em] shrink-0 pt-1.5 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-navy text-lg leading-snug font-medium">
                      {outcome}
                    </span>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
            {}
            <div className="lg:col-span-5">
              <motion.div
                key={service.slug + "-stats"}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col"
              >
                {service.stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeIn}
                    className="flex flex-col py-6 border-b border-navy/10 last:border-b-0 items-start"
                  >
                    <span className="font-heading font-semibold leading-[0.95] tracking-[-0.03em] bg-teal text-white px-3 pb-1 pt-2 rounded-md text-3xl md:text-4xl mb-3">
                      {stat.value}
                    </span>
                    <span className="text-xs font-mono text-navy/60 uppercase tracking-[0.14em]">
                      {stat.label}
                    </span>
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
