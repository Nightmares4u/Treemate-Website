import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "../components/layout/Container";
import { ImageBand } from "../components/sections/ImageBand";
import { TalentNetwork } from "../components/sections/TalentNetwork";
import { PageHero } from "../components/sections/PageHero";
import { CTASection } from "../components/sections/CTASection";
import { SectionTitle } from "../components/ui/SectionTitle";
import { fadeIn, staggerContainer } from "../lib/motion";
import { getService } from "../data/services";
import { NotFoundPage } from "./NotFoundPage";

export function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return <NotFoundPage />;

  return (
    <>
      <PageHero
        icon={service.icon}
        eyebrow={service.eyebrow}
        title={service.title}
        intro={service.intro}
        points={service.heroPoints}
      />

      {service.image && (
        <ImageBand src={service.image} alt={service.imageAlt ?? service.title} caption={service.imageCaption} />
      )}

      {/* Capabilities */}
      <section className="py-24 bg-base">
        <Container>
          <SectionTitle
            eyebrow="What we deliver"
            title="Capabilities"
            subtitle={service.summary}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {service.capabilities.map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeIn}
                className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-teal/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-6 group-hover:bg-teal/15 transition-colors">
                  <cap.icon className="w-6 h-6 text-teal" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy mb-3">{cap.title}</h3>
                <p className="text-slate-600 leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {slug === "human-capital" && <TalentNetwork />}

      {/* Process */}
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
                className="relative rounded-2xl border border-slate-200 p-7 bg-base"
              >
                <span className="font-heading font-bold text-5xl text-teal/20 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-bold text-lg text-navy mt-4 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats + outcomes */}
      <section className="py-24 bg-navy">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                eyebrow="The outcome"
                title="What you get from the partnership"
                tone="dark"
                align="left"
                className="mb-8"
              />
              <ul className="flex flex-col gap-4">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-teal flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-slate-200 leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {service.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
                >
                  <div className="font-heading font-bold text-4xl text-teal-light mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
