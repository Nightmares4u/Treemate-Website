import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "../components/layout/Container";
import { Hero } from "../components/sections/Hero";
import { CTASection } from "../components/sections/CTASection";
import { SectionTitle } from "../components/ui/SectionTitle";
import { fadeIn, staggerContainer } from "../lib/motion";
import { services } from "../data/services";
import { differentiators, industries, companyStats } from "../data/company";
import treemateFloor from "../assets/office/treemate-floor.jpg";

function InsideTreemate() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionTitle
          eyebrow="Inside Treemate"
          title="A real floor, real people, running your front line"
          subtitle="Dedicated teams working live queues on our own contact-center infrastructure — not a faceless call-center pool."
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-navy/10"
        >
          <div className="aspect-[16/10] md:aspect-[16/9]">
            <img
              src={treemateFloor}
              alt="Treemate's contact-center floor with dedicated agents on headsets"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/65 via-navy/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-wrap gap-x-10 gap-y-3">
            {[
              { v: "Dedicated", l: "teams, never shared" },
              { v: "24/7", l: "live coverage" },
              { v: "On-site", l: "QA & team leads" },
            ].map((s) => (
              <div key={s.l} className="text-white">
                <div className="font-heading font-bold text-2xl md:text-3xl text-teal-light">{s.v}</div>
                <div className="text-sm text-slate-200">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="py-24 bg-base">
      <Container>
        <SectionTitle
          eyebrow="What we do"
          title="Three ways we plug into your business"
          subtitle="Pick one or combine them. Treemate is built to run as a single accountable partner across operations, people, and software."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.slug} variants={fadeIn}>
              <Link
                to={`/${service.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-teal/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-teal transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-bold text-xl text-navy mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 flex-1">{service.summary}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
                  Explore {service.nav}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function WhyTreemate() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionTitle
          eyebrow="Why Treemate"
          title="The advantage of a lean, tech-first partner"
          subtitle="We cut the overhead and red tape that slow traditional agencies down — and pass the speed and savings to you."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
        >
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeIn}
              className="flex gap-5 rounded-2xl border border-slate-200 p-7 bg-base hover:border-teal/30 transition-colors"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-teal/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-teal" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-navy mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="py-20 bg-navy">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {companyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="font-heading font-bold text-4xl md:text-5xl text-teal-light mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-300 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function HowWeWork() {
  const steps = [
    { title: "Discovery call", desc: "We learn your operation, volumes, tools, and the quality bar you hold." },
    { title: "Scope & SLA", desc: "A clear proposal: the team, the metrics, the timeline, and the price." },
    { title: "Build & launch", desc: "We staff, train, and integrate — most teams go live within 48 hours." },
    { title: "Optimize & scale", desc: "Weekly QA, live dashboards, and capacity that grows with you." },
  ];
  return (
    <section className="py-24 bg-base">
      <Container>
        <SectionTitle
          eyebrow="How we work"
          title="A fast, transparent path to launch"
          subtitle="No drawn-out onboarding. From first call to a live, accountable team in days."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl border border-slate-200 bg-white p-7"
            >
              <span className="font-heading font-bold text-5xl text-teal/20 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading font-bold text-lg text-navy mt-4 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Industries() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle
              eyebrow="Who we serve"
              title="Built for operations-heavy businesses"
              subtitle="We support US companies whose growth depends on reliable front-line and back-office execution."
              align="left"
              className="mb-8"
            />
            <ul className="flex flex-col gap-3">
              {[
                "US-based and accountable, headquartered in Sheridan, WY",
                "Dedicated teams — never shared, never a call-center pool",
                "Enterprise-grade contact-center and CRM infrastructure",
                "Transparent SLAs, QA scoring, and live reporting",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-teal flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-slate-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4"
          >
            {industries.map((industry) => (
              <motion.div
                key={industry.name}
                variants={fadeIn}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-base p-5"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-teal/10 flex items-center justify-center">
                  <industry.icon className="w-5 h-5 text-teal" strokeWidth={2} />
                </div>
                <span className="font-semibold text-navy text-sm">{industry.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyTreemate />
      <InsideTreemate />
      <StatsBand />
      <HowWeWork />
      <Industries />
      <CTASection />
    </>
  );
}
