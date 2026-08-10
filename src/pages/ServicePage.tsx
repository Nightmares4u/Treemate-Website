import type { ComponentType } from "react";
import { Check, ChevronsRight } from "lucide-react";
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
import { StackAside } from "../components/hero-asides/StackAside";
import { ComplianceAside } from "../components/hero-asides/ComplianceAside";
import { TiersAside } from "../components/hero-asides/TiersAside";
import { MarketingAside } from "../components/hero-asides/MarketingAside";
import { getService } from "../data/services";
import { NotFoundPage } from "./NotFoundPage";
/** Each service hero gets an aside built around what that service actually does. */
const heroAsides: Record<string, ComponentType> = {
  "software-ai": StackAside,
  marketing: MarketingAside,
  "hr-solutions": ComplianceAside,
  "customer-success": TiersAside,
};
export function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return <NotFoundPage />;
  const Aside = heroAsides[slug];
  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        tagline={service.summary}
        description={service.intro}
        primaryCta={{ label: "Book A Meeting", to: "/contact" }}
        secondaryCta={{ label: "Back to home", to: "/" }}
        aside={Aside ? <Aside /> : undefined}
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
      <section className="relative overflow-hidden py-24 md:py-32 bg-cream-soft">
        <BackgroundSpirals side="both" opacity={0.15} />
        {/* Subtle ambient mint glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 -right-32 w-[420px] h-[420px] rounded-full bg-mint blur-[130px] opacity-50 transform-gpu"
        />
        {/* Graceful hand-drawn marker accents */}
        <MarkerAccent
          variant="star"
          className="absolute top-20 right-[5%] w-12 h-12 opacity-55 z-0 pointer-events-none"
          color="#0D9488"
          rotate={15}
        />
        <MarkerAccent
          variant="scribble"
          className="absolute top-1/2 left-[3%] w-20 h-14 opacity-50 z-0 pointer-events-none"
          color="#0D9488"
          rotate={-12}
        />
        <MarkerAccent
          variant="arrow"
          className="absolute bottom-24 right-[4%] w-16 h-12 opacity-45 z-0 pointer-events-none"
          color="#0D9488"
          rotate={-35}
        />
        <MarkerAccent
          variant="circle"
          className="absolute bottom-16 left-[6%] w-24 h-16 opacity-40 z-0 pointer-events-none"
          color="#0D9488"
          rotate={8}
        />
        <Container className="relative z-10">
          <SectionTitle
            eyebrow="What we deliver"
            title="Capabilities"
            subtitle={service.summary}
          />
          <RevealGroup
            key={service.slug + "-capabilities"}
            variant="frame"
            stagger={0.1}
            as="div"
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {service.capabilities.map((cap, i) => (
              <div key={cap.title} className="group relative flex">
                <div className="flex flex-col h-full w-full p-6 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <cap.icon className="w-6 h-6 text-teal" strokeWidth={2} />
                    </span>
                    <span className="font-heading font-semibold text-4xl text-navy/10 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-navy leading-snug mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-navy/70 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
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
          <RevealGroup
            key={service.slug + "-process"}
            as="div"
            variant="frame"
            stagger={0.12}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 max-w-6xl mx-auto"
          >
            {service.process.map((step, i) => (
              <div key={step.title} className="group relative flex">
                <div className="flex flex-col h-full w-full p-6 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  <span className="font-heading font-semibold text-5xl text-teal/25 leading-none mb-5 transition-colors duration-300 group-hover:text-teal/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-navy leading-snug mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-navy/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {i < service.process.length - 1 && (
                  <span className="absolute z-10 hidden lg:flex items-center justify-center -right-4 top-1/2 -translate-y-1/2 w-8 h-8">
                    <ChevronsRight
                      className="w-4 h-4 text-teal"
                      strokeWidth={2.4}
                    />
                  </span>
                )}
              </div>
            ))}
          </RevealGroup>
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
