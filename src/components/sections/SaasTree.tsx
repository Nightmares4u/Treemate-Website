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
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative h-[540px] w-full">
      {/* connectors */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {products.map((p, i) => {
          const y = nodeY(i, products.length);
          const isActive = p.id === selected;
          return (
            <motion.path
              key={p.id}
              d={`M ${ORIGIN.x} ${ORIGIN.y} C 40 ${ORIGIN.y}, 46 ${y}, ${NODE_X} ${y}`}
              fill="none"
              stroke={isActive ? "#14B8A6" : "#ffffff"}
              strokeOpacity={isActive ? 1 : 0.18}
              strokeWidth={isActive ? 2.4 : 1.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
      </svg>

      {/* origin node */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${ORIGIN.x}%`, top: `${ORIGIN.y}%` }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="w-16 h-16 rounded-2xl bg-teal flex items-center justify-center shadow-lg shadow-teal/30 ring-4 ring-teal/20">
            <GitBranch className="w-7 h-7 text-white" strokeWidth={2.2} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-light leading-tight w-24">
            Treemate Platform
          </span>
        </div>
      </div>

      {/* product nodes */}
      {products.map((p, i) => {
        const y = nodeY(i, products.length);
        const isActive = p.id === selected;
        const Icon = p.icon;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            onMouseEnter={() => onSelect(p.id)}
            onFocus={() => onSelect(p.id)}
            aria-pressed={isActive}
            className="absolute -translate-y-1/2 outline-none"
            style={{ left: `${NODE_X}%`, top: `${y}%` }}
          >
            <span
              className={cn(
                "flex items-center gap-3 rounded-full border pl-2.5 pr-5 py-2.5 transition-all duration-300 whitespace-nowrap",
                isActive
                  ? "bg-teal border-teal-light text-white scale-105 shadow-xl shadow-teal/30"
                  : "bg-white/5 border-white/15 text-slate-200 hover:bg-white/10 hover:border-white/30",
              )}
            >
              <span
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                  isActive ? "bg-white/20" : "bg-white/10",
                )}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
              </span>
              <span className="font-semibold text-sm">{p.abbr}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function SaasTree() {
  const [selected, setSelected] = useState(products[0].id);
  const active = products.find((p) => p.id === selected) ?? products[0];
  const ActiveIcon = active.icon;

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal blur-[180px] opacity-15 pointer-events-none" />
      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Phase 3 · Proprietary SaaS"
          title="One platform, branching into the tools you run on"
          subtitle="We turn the software we build for our own operations into products you can run your business on. Explore where the platform branches."
          tone="dark"
        />

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Diagram (desktop) */}
          <div className="lg:col-span-7">
            <div className="hidden lg:block">
              <Diagram selected={selected} onSelect={setSelected} />
            </div>

            {/* Mobile / tablet selector */}
            <div className="lg:hidden flex flex-wrap gap-2.5">
              {products.map((p) => {
                const isActive = p.id === selected;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelected(p.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                      isActive
                        ? "bg-teal border-teal-light text-white"
                        : "bg-white/5 border-white/15 text-slate-200",
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
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="w-14 h-14 rounded-2xl bg-teal/15 border border-teal/30 flex items-center justify-center shrink-0">
                    <ActiveIcon className="w-7 h-7 text-teal-light" strokeWidth={2} />
                  </span>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-teal-light">
                      {active.abbr}
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white leading-tight">
                      {active.name}
                    </h3>
                  </div>
                </div>

                <p className="text-teal-light font-medium mb-3">{active.tagline}</p>
                <p className="text-slate-300 leading-relaxed mb-6">{active.description}</p>

                <ul className="flex flex-col gap-2.5">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-teal-light" strokeWidth={3} />
                      </span>
                      <span className="text-slate-200 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <p className="text-xs text-slate-400 mt-4 text-center lg:text-left">
              Each product is battle-tested on our own operations before it reaches you.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
