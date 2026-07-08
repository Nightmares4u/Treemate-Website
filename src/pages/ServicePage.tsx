import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "../components/layout/Container";
import { ImageBand } from "../components/sections/ImageBand";
import { SaasTree } from "../components/sections/SaasTree";
import { TalentNetwork } from "../components/sections/TalentNetwork";
import { PageHero } from "../components/sections/PageHero";
import { CTASection } from "../components/sections/CTASection";
import { SectionTitle } from "../components/ui/SectionTitle";
import { BackgroundSpirals } from "../components/ui/BackgroundSpirals";
import { MarkerAccent } from "../components/ui/MarkerAccent";
import { RevealGroup } from "../components/motion/Reveal";
import { Counter } from "../components/motion/Counter";
import { lineRise, fadeIn, easeOutExpo, viewportConfig } from "../lib/motion";
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
      {}
      <section className="bg-base pb-16 md:pb-20">
        <Container>
          <RevealGroup
            key={service.slug + "-points"}
            variant="fade"
            stagger={0.12}
            as="ul"
            className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-navy/10"
          >
            {service.heroPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-navy/80 text-sm leading-relaxed"
              >
                <Check
                  className="w-4 h-4 text-teal mt-0.5 shrink-0"
                  strokeWidth={2.4}
                />
                <span>{point}</span>
              </li>
            ))}
          </RevealGroup>
        </Container>
      </section>
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
          <RevealGroup
            key={service.slug + "-capabilities"}
            variant="scale"
            stagger={0.09}
            as="div"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {service.capabilities.map((cap) => (
              <div
                key={cap.title}
                className="group relative flex flex-col p-6 rounded-2xl border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-[0_20px_40px_-18px_rgba(13,148,136,0.35)]"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1">
                  <cap.icon className="w-8 h-8 text-teal" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy mb-3">
                  {cap.title}
                </h3>
                <p className="text-navy/70 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </RevealGroup>
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
          <motion.div
            key={service.slug + "-process"}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
            }}
            className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            <motion.div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 right-0 top-[34px] h-px bg-teal/25 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.2 }}
            />
            {service.process.map((step, i) => (
              <div key={step.title} className="relative p-2">
                <div className="overflow-hidden">
                  <motion.span
                    variants={lineRise}
                    className="inline-block font-heading font-bold text-5xl text-teal/25 leading-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                </div>
                <div className="overflow-hidden mt-4 mb-2">
                  <motion.h3
                    variants={lineRise}
                    className="font-heading font-bold text-lg text-navy leading-tight"
                  >
                    {step.title}
                  </motion.h3>
                </div>
                <motion.p
                  variants={fadeIn}
                  className="text-sm text-navy/70 leading-relaxed"
                >
                  {step.description}
                </motion.p>
              </div>
            ))}
          </motion.div>
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
              <RevealGroup
                key={service.slug + "-outcomes"}
                variant="fade"
                stagger={0.1}
                as="ul"
                className="flex flex-col"
              >
                {service.outcomes.map((outcome, i) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-6 py-5 border-b border-navy/10 last:border-b-0"
                  >
                    <span className="relative flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-teal/10 mt-0.5">
                      <Check
                        className="w-4 h-4 text-teal"
                        strokeWidth={2.6}
                      />
                    </span>
                    <span className="text-navy text-lg leading-snug font-medium">
                      <span className="font-mono font-bold text-teal text-xs tracking-[0.14em] mr-3 align-middle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {outcome}
                    </span>
                  </li>
                ))}
              </RevealGroup>
            </div>
            {}
            <div className="lg:col-span-5">
              <RevealGroup
                key={service.slug + "-stats"}
                variant="fade"
                stagger={0.1}
                as="div"
                className="flex flex-col"
              >
                {service.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col py-6 border-b border-navy/10 last:border-b-0 items-start"
                  >
                    <span className="font-heading font-semibold leading-[0.95] tracking-[-0.03em] bg-teal text-white px-3 pb-1 pt-2 rounded-md text-3xl md:text-4xl mb-3">
                      <Counter value={stat.value} />
                    </span>
                    <span className="text-xs font-mono text-navy/60 uppercase tracking-[0.14em]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
