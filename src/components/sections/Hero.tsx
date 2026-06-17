import { motion } from "framer-motion";
import { ArrowRight, Headphones, Users, Cpu, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../layout/Container";
import { LinkButton } from "../ui/LinkButton";
import { Constellation } from "../ui/Constellation";
import { blurIn, fadeIn, staggerContainer, easeOutExpo } from "../../lib/motion";

const heroChips = [
  "Live in 48 hours",
  "24/7 coverage",
  "US-based · Sheridan, WY",
];

interface HeroCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  to: string;
  tone: "light" | "teal" | "dark";
}

const heroCards: HeroCard[] = [
  {
    icon: Headphones,
    title: "BPO Solutions",
    desc: "Dedicated support & dispatch teams",
    to: "/bpo-solutions",
    tone: "light",
  },
  {
    icon: Users,
    title: "Human Capital",
    desc: "Vetted talent, managed by us",
    to: "/human-capital",
    tone: "teal",
  },
  {
    icon: Cpu,
    title: "AI & Software",
    desc: "Automation that pays for itself",
    to: "/ai-services",
    tone: "dark",
  },
];

function FloatCard({ card, delay, float }: { card: HeroCard; delay: number; float: number }) {
  const Icon = card.icon;
  const styles = {
    light: "bg-white border-slate-100",
    teal: "bg-teal border-teal-light/40",
    dark: "bg-navy-light border-white/10",
  }[card.tone];
  const titleColor = card.tone === "light" ? "text-navy" : "text-white";
  const descColor = card.tone === "light" ? "text-slate-500" : "text-white/80";
  const iconWrap =
    card.tone === "light"
      ? "bg-teal/10 border-teal/20 text-teal"
      : "bg-white/15 border-white/20 text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
    >
      <motion.div
        animate={{ y: [float, -float, float] }}
        transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <Link
          to={card.to}
          className={`group flex items-center gap-4 rounded-2xl border p-4 md:p-5 shadow-xl transition-transform duration-300 hover:-translate-y-0.5 ${styles}`}
        >
          <span className={`w-11 h-11 shrink-0 rounded-xl border flex items-center justify-center ${iconWrap}`}>
            <Icon className="w-5 h-5" strokeWidth={2.2} />
          </span>
          <span className="min-w-0">
            <span className={`block font-heading font-bold text-base ${titleColor}`}>{card.title}</span>
            <span className={`block text-sm font-medium truncate ${descColor}`}>{card.desc}</span>
          </span>
          <ArrowRight
            className={`ml-auto w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${
              card.tone === "light" ? "text-teal" : "text-white"
            }`}
            strokeWidth={2.2}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-base">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6 lg:col-span-6"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2.5 rounded-full bg-white border border-slate-200 px-3.5 py-1.5 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-signal-pulse absolute h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-teal" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy">
                US-based · Tech-enabled outsourcing
              </span>
            </motion.div>

            <motion.h1
              variants={blurIn}
              className="font-heading font-bold text-navy tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)" }}
            >
              People-Powered.
              <br className="hidden md:block" />{" "}
              <span className="text-teal">Tech-Enabled.</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-base md:text-lg text-slate-600 leading-relaxed max-w-[46ch] font-medium text-pretty"
            >
              Treemate runs your support, dispatch, and back-office operations with dedicated teams —
              and builds the software that makes them faster. One accountable partner for people,
              process, and the technology that connects them.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 pt-2">
              <LinkButton to="/bpo-solutions" size="lg">
                Explore Solutions
                <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
              </LinkButton>
              <LinkButton to="/contact" variant="outline" size="lg">
                Book a Call
              </LinkButton>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-center gap-2.5 pt-4 flex-wrap">
              {heroChips.map((chip) => (
                <div
                  key={chip}
                  className="px-3.5 py-2 bg-white border border-slate-200 rounded-full shadow-sm"
                >
                  <span className="text-[13px] font-semibold text-navy">{chip}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Visual */}
          <div className="relative lg:col-span-6">
            <div className="relative rounded-[2rem] bg-navy overflow-hidden shadow-2xl p-6 md:p-8">
              <div className="absolute inset-0 z-0 opacity-70">
                <Constellation nodeCount={30} opacity={0.6} />
              </div>
              <div className="absolute -top-1/4 -right-1/4 w-[420px] h-[420px] rounded-full bg-teal blur-[120px] opacity-25 pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-5">
                {/* live status bar */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: easeOutExpo }}
                  className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-signal-pulse absolute h-full w-full rounded-full bg-teal-light opacity-75" />
                      <span className="relative h-2 w-2 rounded-full bg-teal-light" />
                    </span>
                    <span className="text-xs font-semibold text-white">Operations live</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">24/7 · all time zones</span>
                </motion.div>

                {/* stacked service cards — evenly spaced, no overlap */}
                <div className="flex flex-col gap-4">
                  {heroCards.map((card, i) => (
                    <FloatCard key={card.title} card={card} delay={0.3 + i * 0.18} float={4 + i} />
                  ))}
                </div>

                {/* mini stats footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                  className="grid grid-cols-3 gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-4 backdrop-blur-sm"
                >
                  {[
                    { v: "48 hrs", l: "to launch" },
                    { v: "99.9%", l: "uptime target" },
                    { v: "3", l: "service lines" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <div className="font-heading font-bold text-xl text-teal-light">{s.v}</div>
                      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
