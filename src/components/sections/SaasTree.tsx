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
import { cn } from "../../lib/cn";

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
    id: "crm",
    name: "Customer Relationship Management",
    abbr: "CRM",
    icon: Users,
    tagline: "Every lead, deal, and conversation in one place.",
    description:
      "A CRM wired into the same telephony and inbox your team already works in, so nothing falls through the cracks between a call and a closed deal.",
    features: [
      "Visual pipelines and deal stages",
      "Full contact and conversation timelines",
      "Automatic call, email, and chat logging",
      "Workflow automation and reminders",
      "Live reporting and forecasting",
    ],
  },
  {
    id: "hrm",
    name: "Human Resource Management",
    abbr: "HRM",
    icon: UserCog,
    tagline: "Hire, onboard, and run your team from one system.",
    description:
      "From applicant tracking to employee records, an HRM built around how lean teams actually operate — not a bloated enterprise suite you grow to resent.",
    features: [
      "Applicant tracking and structured screening",
      "Centralized employee records",
      "Time-off, attendance, and scheduling",
      "Performance reviews and score-carding",
      "Payroll-ready exports",
    ],
  },
  {
    id: "inventory",
    name: "Inventory Management System",
    abbr: "IMS",
    icon: Package,
    tagline: "Know what you have, where it is, and when to reorder.",
    description:
      "Real-time stock visibility across locations with the alerts and purchase workflows that keep you from overselling or running dry.",
    features: [
      "Real-time, multi-location stock levels",
      "Barcode and SKU tracking",
      "Purchase orders and supplier records",
      "Low-stock and reorder alerts",
      "Inventory valuation reporting",
    ],
  },
  {
    id: "appointments",
    name: "Appointment & Scheduling System",
    abbr: "Booking",
    icon: CalendarClock,
    tagline: "Let customers book the right slot, automatically.",
    description:
      "Online booking that syncs to your team's calendars, routes to the right person, and cuts no-shows with automated reminders.",
    features: [
      "Self-service online booking",
      "Two-way calendar sync",
      "SMS and email reminders",
      "Staff and resource routing",
      "No-show and cancellation handling",
    ],
  },
  {
    id: "helpdesk",
    name: "Helpdesk & Ticketing",
    abbr: "Helpdesk",
    icon: LifeBuoy,
    tagline: "Turn every request into a tracked, resolved ticket.",
    description:
      "Omnichannel intake with SLAs and queues, so your support — whether in-house or run by Treemate — never loses a request.",
    features: [
      "Omnichannel ticket intake",
      "SLA timers and escalation rules",
      "Queues, macros, and canned replies",
      "Knowledge base and self-service",
      "CSAT and resolution analytics",
    ],
  },
  {
    id: "analytics",
    name: "Analytics & BI Dashboards",
    abbr: "Analytics",
    icon: BarChart3,
    tagline: "See the numbers that run your business, live.",
    description:
      "Pull data from every system into dashboards your leadership actually checks — with alerts when a metric moves the wrong way.",
    features: [
      "Unified data from all your tools",
      "Custom, role-based dashboards",
      "Threshold alerts and anomaly flags",
      "Scheduled exports and reports",
      "Real-time operational KPIs",
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
              style={{ filter: isActive ? "drop-shadow(0 0 3px rgba(13,148,136,0.45))" : "none" }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                stroke: isActive ? "#0D9488" : "#0A1628",
                strokeOpacity: isActive ? 1 : 0.12,
                strokeWidth: isActive ? 2.6 : 1.3,
              }}
              transition={{
                pathLength: { duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.9, delay: 0.15 + i * 0.08 },
                default: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
            />
          );
        })}
      </svg>

      {/* origin node */}
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
            className="w-16 h-16 rounded-2xl bg-teal flex items-center justify-center shadow-lg shadow-teal/30 ring-4 ring-teal/15 transition-shadow group-hover/origin:shadow-teal/50"
          >
            <GitBranch className="w-7 h-7 text-white" strokeWidth={2.2} />
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
                    ? "bg-surface border-teal/50 text-ink ring-2 ring-teal/30 shadow-sm hover:scale-[1.03]"
                    : "bg-surface border-ink/12 text-ink/80 shadow-sm hover:scale-[1.03] hover:border-teal/40 hover:text-ink",
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
    <section className="py-24 md:py-32 bg-surface-2 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mint blur-[170px] opacity-40 pointer-events-none" />
      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Proprietary SaaS"
          title="One platform, branching into the tools you run on"
          subtitle="We turn the software we build for our own operations into products you can run your business on. Hover a branch to preview it — click to keep it open."
          align="left"
          marker="none"
        />

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Diagram (desktop) */}
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

            {/* Mobile / tablet selector */}
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
                        : "bg-surface border-ink/12 text-ink/80",
                    )}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2.2} />
                    {p.abbr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {active && ActiveIcon ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl border border-ink/10 bg-surface shadow-xl shadow-ink/5 p-8"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className="w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                      <ActiveIcon className="w-7 h-7 text-teal" strokeWidth={2} />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-teal">
                        {active.abbr}
                      </div>
                      <h3 className="font-heading font-bold text-xl text-ink leading-tight">
                        {active.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-teal font-semibold mb-3">{active.tagline}</p>
                  <p className="text-ink/70 leading-relaxed mb-6">
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
                        <span className="text-ink/80 text-sm">{f}</span>
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
                  className="rounded-3xl border border-dashed border-ink/15 bg-surface/60 p-8 min-h-[320px] flex flex-col items-center justify-center text-center gap-3"
                >
                  <span className="w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                    <GitBranch className="w-7 h-7 text-teal" strokeWidth={2} />
                  </span>
                  <h3 className="font-heading font-bold text-lg text-ink">
                    Explore the platform
                  </h3>
                  <p className="text-sm text-ink/60 max-w-xs">
                    Hover any branch to preview what it does — click to keep it
                    open while you read.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-xs text-ink/50 mt-4 text-center lg:text-left">
              Each product is battle-tested on our own operations before it reaches you.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
