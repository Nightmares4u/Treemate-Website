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
  type LucideIcon,
} from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { MarkerAccent } from "../ui/MarkerAccent";
import { fadeIn } from "../../lib/motion";
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
const ORIGIN = { x: 8, y: 50 };
const LINE_ORIGIN_X = 15;
const SPINE_X = 30;
const NODE_X = 74;
const LINE_COLOR = "#0D9488";
const LINE_OPACITY = 0.9;
const nodeY = (i: number, n: number) => 12 + (i * 76) / (n - 1);
function Diagram({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const yValues = products.map((_, i) => nodeY(i, products.length));
  const spineY1 = Math.min(...yValues);
  const spineY2 = Math.max(...yValues);
  return (
    <div className="relative h-[520px] w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full z-10 pointer-events-none"
        aria-hidden="true"
      >
        {}
        <path
          d={`M ${LINE_ORIGIN_X} ${ORIGIN.y} H ${SPINE_X}`}
          fill="none"
          stroke={LINE_COLOR}
          strokeOpacity={LINE_OPACITY}
          strokeWidth={1}
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
        />
        {}
        <path
          d={`M ${SPINE_X} ${spineY1} V ${spineY2}`}
          fill="none"
          stroke={LINE_COLOR}
          strokeOpacity={LINE_OPACITY}
          strokeWidth={1}
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
        />
        {}
        {products.map((p, i) => {
          const y = nodeY(i, products.length);
          return (
            <path
              key={p.id}
              d={`M ${SPINE_X} ${y} H ${NODE_X}`}
              fill="none"
              stroke={LINE_COLOR}
              strokeOpacity={LINE_OPACITY}
              strokeWidth={1}
              strokeLinecap="square"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      {}
      <div
        className="absolute z-0 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${ORIGIN.x}%`, top: `${ORIGIN.y}%` }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <img
            src={logoMark}
            alt=""
            aria-hidden="true"
            className="w-28 h-28 object-contain"
          />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-navy/60 leading-tight w-32">
            Treemate Platform
          </span>
        </div>
      </div>
      {}
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
            className="absolute z-20 outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-cream -translate-y-1/2"
            style={{ left: `${NODE_X}%`, top: `${y}%` }}
          >
            <span
              className={cn(
                "inline-flex items-center gap-3 min-w-[150px] px-4 py-3 border transition-all duration-300 bg-cream",
                isActive
                  ? "border-teal text-navy"
                  : "border-navy/15 text-navy/55 hover:border-navy/40 hover:text-navy",
              )}
            >
              <Icon
                className={cn(
                  "w-4.5 h-4.5 shrink-0",
                  isActive ? "text-teal" : "text-navy/45",
                )}
                strokeWidth={2}
              />
              <span className="font-mono font-semibold text-[13px] uppercase tracking-[0.1em] whitespace-nowrap">
                {p.abbr}
              </span>
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
              subtitle="We turn the software we build for our own operations into products you can run your business on. Hover a branch to explore."
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
              <Diagram selected={selected} onSelect={setSelected} />
            </div>
            {}
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
                      "inline-flex items-center gap-2 pl-3 pr-4 py-2.5 border transition-all text-xs font-mono font-semibold uppercase tracking-[0.1em]",
                      isActive
                        ? "border-teal text-navy bg-cream"
                        : "border-navy/15 text-navy/60 bg-transparent",
                    )}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                    {p.abbr}
                  </button>
                );
              })}
            </div>
          </div>
          {}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                variants={fadeIn}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <ActiveIcon
                  className="w-8 h-8 text-teal mb-5"
                  strokeWidth={1.8}
                />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal mb-2">
                  {active.abbr}
                </span>
                <h3 className="font-heading font-bold text-2xl text-navy leading-tight mb-3">
                  {active.name}
                </h3>
                <p className="text-navy font-medium mb-3 leading-snug">
                  {active.tagline}
                </p>
                <p className="text-navy/65 leading-relaxed mb-5">
                  {active.description}
                </p>
                <ul className="flex flex-col gap-2">
                  {active.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-navy/80"
                    >
                      <Check
                        className="w-3.5 h-3.5 text-teal mt-[3px] shrink-0"
                        strokeWidth={2.6}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <p className="text-xs text-navy/50 mt-6 font-mono">
              Each product is battle-tested on our own operations before it
              reaches you.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
