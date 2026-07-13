import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserCog,
  Package,
  CalendarClock,
  LifeBuoy,
  BarChart3,
  Check,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { MarkerAccent } from "../ui/MarkerAccent";
import { cn } from "../../lib/cn";
import logoMark from "../../assets/logo-treemate.png";
interface SaasProduct {
  id: string;
  name: string;
  abbr: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  features: string[];
}
const products: SaasProduct[] = [
  {
    id: "revenue",
    name: "Revenue & Growth Automation",
    abbr: "Revenue",
    icon: Users,
    tagline: "Every lead, deal, and conversation in one engine.",
    description:
      "Full-cycle lead generation, enrichment, scoring, and pipeline orchestration — multi-source sourcing, LLM-driven qualification, outreach sequencing, and CRM sync, all in one place.",
    features: [
      "Multi-source lead ingestion and dedup",
      "Data enrichment and LLM qualification",
      "Scoring engine",
      "Outreach and campaign orchestration",
      "Pipeline analytics",
    ],
  },
  {
    id: "workforce",
    name: "Workforce & Human Capital Systems",
    abbr: "Workforce",
    icon: UserCog,
    tagline: "End-to-end people operations for distributed teams.",
    description:
      "More than HR records — recruitment pipelines, onboarding automation, cross-time-zone attendance and shift management, payroll integration, and performance tracking for remote teams that span borders.",
    features: [
      "Recruitment and onboarding automation",
      "Attendance and shift management across time zones",
      "Payroll integration",
      "Performance and KPI tracking",
      "Centralized employee records",
    ],
  },
  {
    id: "erp",
    name: "Operations & Resource Planning (ERP)",
    abbr: "ERP",
    icon: Package,
    tagline: "The system of record for your whole operation.",
    description:
      "The core enterprise resource layer — inventory, procurement, order management, fulfillment tracking, vendor management, and financial reconciliation in one place.",
    features: [
      "Inventory and procurement",
      "Order management and fulfillment tracking",
      "Vendor management",
      "Financial reconciliation",
      "Multi-location visibility",
    ],
  },
  {
    id: "scheduling",
    name: "Scheduling & Capacity Orchestration",
    abbr: "Scheduling",
    icon: CalendarClock,
    tagline: "Booking at scale, framed as capacity planning.",
    description:
      "Appointment and resource booking that thinks in capacity — agent availability, demand forecasting, calendar orchestration across teams and clients, and SLA-aware assignment.",
    features: [
      "Self-service and resource booking",
      "Agent availability and demand forecasting",
      "Cross-team calendar orchestration",
      "SLA-aware assignment",
      "Automated reminders",
    ],
  },
  {
    id: "cx",
    name: "Customer Experience & Support Platforms",
    abbr: "CX",
    icon: LifeBuoy,
    tagline: "A full CX platform, not just a ticket queue.",
    description:
      "Omnichannel intake, ticketing, knowledge base, and CSAT — WhatsApp, voice, and email unified with SLA engines, macros, and resolution analytics.",
    features: [
      "Omnichannel intake (WhatsApp, voice, email)",
      "Ticketing and SLA engines",
      "Knowledge base and macros",
      "CSAT tracking",
      "Resolution analytics",
    ],
  },
  {
    id: "data",
    name: "Data, Intelligence & Reporting",
    abbr: "Data",
    icon: BarChart3,
    tagline: "The data platform that sits on top of everything.",
    description:
      "More than dashboards — warehousing, ETL pipelines, real-time reporting, LLM-powered insights, forecasting, and cross-system BI across your entire stack.",
    features: [
      "Warehousing and ETL pipelines",
      "Real-time dashboards",
      "LLM-powered insights",
      "Forecasting",
      "Cross-system BI",
    ],
  },
];
// Vertical placement (%) of each node in the diagram, evenly distributed.
const nodeY = (i: number, n: number) => 10 + (i * 80) / (n - 1);
const ORIGIN = { x: 9, y: 50 };
const NODE_X = 70;
function Diagram({
  activeId,
  lockedId,
  onHover,
  onLock,
  onReset,
}: {
  activeId: string | null;
  lockedId: string | null;
  onHover: (id: string | null) => void;
  onLock: (id: string) => void;
  onReset: () => void;
}) {
  return (
    <div
      className="relative h-[540px] w-full"
      onMouseLeave={() => onHover(null)}
    >
      {/* connectors */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {products.map((p, i) => {
          const y = nodeY(i, products.length);
          const isActive = p.id === activeId;
          const d = `M ${ORIGIN.x} ${ORIGIN.y} C 40 ${ORIGIN.y}, 46 ${y}, ${NODE_X} ${y}`;
          return (
            <motion.path
              key={p.id}
              d={d}
              fill="none"
              stroke="#0A1628"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{
                filter: isActive
                  ? "drop-shadow(0 0 3px rgba(13,148,136,0.45))"
                  : "none",
              }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                stroke: isActive ? "#0D9488" : "#0A1628",
                strokeOpacity: isActive ? 1 : 0.12,
                strokeWidth: isActive ? 2.6 : 1.3,
              }}
              transition={{
                pathLength: {
                  duration: 0.9,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: { duration: 0.9, delay: 0.15 + i * 0.08 },
                default: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
            />
          );
        })}
      </svg>

      {/* origin node — Treemate logo */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${ORIGIN.x}%`, top: `${ORIGIN.y}%` }}
      >
        <button
          type="button"
          onClick={onReset}
          aria-label="Collapse platform preview"
          className="group/origin flex flex-col items-center gap-2 text-center outline-none"
        >
          <motion.span
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="flex items-center justify-center"
          >
            <img
              src={logoMark}
              alt=""
              aria-hidden="true"
              className="w-24 h-24 object-contain"
            />
          </motion.span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal leading-tight w-24">
            Treemate Platform
          </span>
        </button>
      </div>

      {/* product nodes */}
      {products.map((p, i) => {
        const y = nodeY(i, products.length);
        const isActive = p.id === activeId;
        const isPinned = p.id === lockedId;
        const Icon = p.icon;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onLock(p.id)}
            onMouseEnter={() => onHover(p.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(p.id)}
            onBlur={() => onHover(null)}
            aria-pressed={isPinned}
            className="absolute -translate-y-1/2 outline-none"
            style={{ left: `${NODE_X}%`, top: `${y}%` }}
          >
            <span
              className={cn(
                "flex items-center gap-3 rounded-full border pl-2.5 pr-5 py-2.5 whitespace-nowrap transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive
                  ? "bg-teal border-teal text-white scale-[1.06] shadow-lg shadow-teal/30"
                  : isPinned
                    ? "bg-cream-soft border-teal/50 text-navy ring-2 ring-teal/30 shadow-sm hover:scale-[1.03]"
                    : "bg-cream-soft border-navy/12 text-navy/80 shadow-sm hover:scale-[1.03] hover:border-teal/40 hover:text-navy",
              )}
            >
              <span
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                  isActive ? "bg-white/20 text-white" : "bg-teal/10 text-teal",
                )}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
              </span>
              <span className="font-semibold text-sm">{p.abbr}</span>
              {isPinned && (
                <span
                  className={cn(
                    "ml-0.5 w-1.5 h-1.5 rounded-full",
                    isActive ? "bg-white" : "bg-teal",
                  )}
                  aria-hidden="true"
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
export function SaasTree() {
  const [locked, setLocked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const activeId = hovered ?? locked;
  const active = activeId
    ? products.find((p) => p.id === activeId) ?? null
    : null;
  const ActiveIcon = active?.icon;
  const toggleLock = (id: string) =>
    setLocked((cur) => (cur === id ? null : id));
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-cream">
      <BackgroundSpirals side="both" opacity={0.15} />
      {}
      <MarkerAccent
        variant="star"
        className="absolute top-28 right-[5%] w-12 h-12 opacity-60"
        color="#0D9488"
        rotate={16}
      />
      <MarkerAccent
        variant="scribble"
        className="absolute bottom-28 left-[4%] w-20 h-14 opacity-55"
        color="#0D9488"
        rotate={-12}
      />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="One platform, branching into the tools you run on"
              subtitle="We turn the software we build for our own operations into products you can run your business on. Hover a branch to preview it — click to keep it open."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              6 tools · One platform
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {}
          <div className="lg:col-span-7">
            <div className="hidden lg:block">
              <Diagram
                activeId={activeId}
                lockedId={locked}
                onHover={setHovered}
                onLock={toggleLock}
                onReset={() => {
                  setLocked(null);
                  setHovered(null);
                }}
              />
            </div>
            {}
            <div className="lg:hidden flex flex-wrap gap-2.5">
              {products.map((p) => {
                const isActive = p.id === activeId;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggleLock(p.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                      isActive
                        ? "bg-teal border-teal text-white shadow-sm shadow-teal/30"
                        : "bg-cream-soft border-navy/12 text-navy/80",
                    )}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2.2} />
                    {p.abbr}
                  </button>
                );
              })}
            </div>
          </div>
          {}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {active && ActiveIcon ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl border border-navy/10 bg-cream-soft shadow-xl shadow-navy/5 p-8"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className="w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                      <ActiveIcon
                        className="w-7 h-7 text-teal"
                        strokeWidth={2}
                      />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-teal">
                        {active.abbr}
                      </div>
                      <h3 className="font-heading font-bold text-xl text-navy leading-tight">
                        {active.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-teal font-semibold mb-3">
                    {active.tagline}
                  </p>
                  <p className="text-navy/70 leading-relaxed mb-6">
                    {active.description}
                  </p>

                  <ul className="flex flex-col gap-2.5">
                    {active.features.map((f) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-teal/15 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-teal" strokeWidth={3} />
                        </span>
                        <span className="text-navy/80 text-sm">{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl border border-dashed border-navy/15 bg-cream-soft/60 p-8 min-h-[320px] flex flex-col items-center justify-center text-center gap-3"
                >
                  <span className="w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                    <GitBranch className="w-7 h-7 text-teal" strokeWidth={2} />
                  </span>
                  <h3 className="font-heading font-bold text-lg text-navy">
                    Explore the platform
                  </h3>
                  <p className="text-sm text-navy/60 max-w-xs">
                    Hover any branch to preview what it does — click to keep it
                    open while you read.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-xs text-navy/50 mt-4 text-center lg:text-left">
              Each product is battle-tested on our own operations before it
              reaches you.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
