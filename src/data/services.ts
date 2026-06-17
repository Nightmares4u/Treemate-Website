import {
  Headphones,
  Truck,
  Users,
  Cpu,
  type LucideIcon,
  PhoneCall,
  MessagesSquare,
  Siren,
  ShieldCheck,
  Target,
  UserCheck,
  Search,
  Network,
  Workflow,
  Code2,
  Database,
  LineChart,
} from "lucide-react";
import operationsFloor from "../assets/office/operations-floor.jpg";

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface Service {
  slug: string;
  nav: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  // Short line for cards / previews
  summary: string;
  // Longer intro for the page hero
  intro: string;
  heroPoints: string[];
  capabilities: Capability[];
  process: ProcessStep[];
  stats: ServiceStat[];
  outcomes: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}

export const services: Service[] = [
  {
    slug: "bpo-solutions",
    nav: "BPO Solutions",
    icon: Headphones,
    eyebrow: "Managed Operations",
    title: "BPO Solutions",
    summary:
      "Dedicated support, dispatch, and back-office teams that run your front line around the clock.",
    intro:
      "Treemate becomes your operations team. We staff, train, and manage dedicated agents on enterprise-grade contact-center infrastructure, then plug them straight into your tools and workflows. You set the standard; we run the queue.",
    heroPoints: [
      "Dedicated teams live in as little as 48 hours",
      "Voice, chat, and email under one roof",
      "24/7 coverage aligned to your business hours",
    ],
    capabilities: [
      {
        icon: PhoneCall,
        title: "Inbound Customer Support",
        description:
          "Tier-1 and Tier-2 voice support that answers fast, resolves on first contact, and protects your CSAT. Agents work inside your CRM and follow your playbook.",
      },
      {
        icon: MessagesSquare,
        title: "Omnichannel Service",
        description:
          "Live chat, email, and ticket queues handled by the same dedicated team, so context never gets lost when a customer switches channels.",
      },
      {
        icon: Truck,
        title: "Logistics & Freight Dispatch",
        description:
          "Inbound carrier communication, rate negotiation, and load assignment for freight brokerages — managed in your TMS with full visibility.",
      },
      {
        icon: Siren,
        title: "Emergency & After-Hours Dispatch",
        description:
          "High-priority intake and contractor coordination through your dispatch and mapping software, with strict response-time SLAs.",
      },
      {
        icon: Network,
        title: "Overflow & Technical Support",
        description:
          "Absorb seasonal spikes and overflow volume for your existing support org without adding permanent headcount or new infrastructure.",
      },
      {
        icon: Target,
        title: "Outbound & Lead Qualification",
        description:
          "Structured outbound campaigns — appointment setting, qualification, and warm transfers — managed against clear, reportable targets.",
      },
    ],
    process: [
      {
        title: "Scope & SLA",
        description:
          "We map your call flows, volumes, tools, and quality bar, then agree on the SLAs and reporting cadence we'll be held to.",
      },
      {
        title: "Build the team",
        description:
          "We select and train agents for your account, provision them on our contact-center stack, and integrate with your CRM.",
      },
      {
        title: "Go live in 48 hours",
        description:
          "Your dedicated team starts taking volume fast, shadowed by QA while we calibrate scripts against live calls.",
      },
      {
        title: "Optimize & scale",
        description:
          "Weekly QA reviews, score-carded agents, and transparent dashboards. When you need more seats, we add them in days.",
      },
    ],
    stats: [
      { value: "48 hrs", label: "From signed scope to live team" },
      { value: "24/7", label: "Coverage across every time zone" },
      { value: "99.9%", label: "Target platform uptime" },
    ],
    outcomes: [
      "Lower cost per contact without sacrificing quality",
      "One accountable partner for voice, chat, and email",
      "Headcount that flexes up or down with demand",
      "Full transparency through live QA and reporting",
    ],
    image: operationsFloor,
    imageAlt: "Treemate operations floor with agents on a live support queue",
    imageCaption: "Our support floor — dedicated agents on live queues, around the clock.",
  },
  {
    slug: "human-capital",
    nav: "Human Capital",
    icon: Users,
    eyebrow: "Talent & Staffing",
    title: "Human Capital",
    summary:
      "Vetted, dedicated professionals who work exclusively on your projects — sourced, paid, and managed by us.",
    intro:
      "When you need people, not just a process, Treemate builds the team. We recruit and screen specialists, embed them in your workflow, and handle the management overhead. They work your hours, in your tools, on your roadmap.",
    heroPoints: [
      "Dedicated talent, not shared resources",
      "We recruit, vet, and manage the relationship",
      "Scale a function up or down without the HR drag",
    ],
    capabilities: [
      {
        icon: UserCheck,
        title: "Staff Augmentation",
        description:
          "Add proven developers, designers, marketers, and operators to your team on demand. They report into your leads and ship against your backlog.",
      },
      {
        icon: Search,
        title: "Recruiting & Screening",
        description:
          "We source candidates, run skills assessments and structured interviews, and present only the shortlist worth your time.",
      },
      {
        icon: Users,
        title: "Dedicated Managed Teams",
        description:
          "Stand up a full pod — for support, ops, or development — with a Treemate team lead accountable for delivery and day-to-day management.",
      },
      {
        icon: ShieldCheck,
        title: "Performance & QA",
        description:
          "Score-carded performance, regular reviews, and a single point of contact, so quality stays consistent as the team grows.",
      },
    ],
    process: [
      {
        title: "Define the role",
        description:
          "You tell us the skills, seniority, hours, and tools. We turn that into a precise hiring profile and success criteria.",
      },
      {
        title: "Source & screen",
        description:
          "We recruit against the profile, assess skills, and run interviews — you only meet candidates who clear the bar.",
      },
      {
        title: "Embed & manage",
        description:
          "Your new team member starts inside your stack. We own payroll, equipment, and HR; you own the work.",
      },
      {
        title: "Review & grow",
        description:
          "Regular performance reviews keep the engagement on track. Add roles whenever the workload demands it.",
      },
    ],
    stats: [
      { value: "1–10+", label: "Seats per engagement, scaled on demand" },
      { value: "Exclusive", label: "Talent dedicated to your account" },
      { value: "0", label: "HR, payroll, or compliance overhead for you" },
    ],
    outcomes: [
      "Senior talent without a long internal hiring cycle",
      "A single managed relationship instead of many contractors",
      "Predictable monthly cost per seat",
      "Capacity that grows with your roadmap",
    ],
  },
  {
    slug: "ai-services",
    nav: "AI & Software",
    icon: Cpu,
    eyebrow: "Automation & Engineering",
    title: "AI & Software",
    summary:
      "Custom software and AI workflows that take the repetitive work off your team's plate.",
    intro:
      "Treemate runs operations and builds the software behind them. We engineer automations, integrations, and internal tools — battle-tested on our own floor before we put them in front of your team — so your people spend time on judgment, not busywork.",
    heroPoints: [
      "Automation built by people who run operations",
      "Integrates with the CRM and tools you already use",
      "Tools proven internally before they ship to you",
    ],
    capabilities: [
      {
        icon: Workflow,
        title: "Workflow Automation",
        description:
          "Replace manual, repetitive steps — routing, data entry, follow-ups — with automations that run 24/7 and free your team for higher-value work.",
      },
      {
        icon: Code2,
        title: "Custom Software Development",
        description:
          "Internal tools, dashboards, and customer-facing apps built to fit your process instead of forcing you into someone else's.",
      },
      {
        icon: Database,
        title: "Data & Integrations",
        description:
          "Connect your CRM, telephony, and back-office systems so data flows cleanly and your reporting reflects reality.",
      },
      {
        icon: LineChart,
        title: "AI-Augmented Operations",
        description:
          "Apply AI where it earns its keep — call summarization, triage, quality scoring, and knowledge assist for agents — under human oversight.",
      },
    ],
    process: [
      {
        title: "Find the bottleneck",
        description:
          "We look at where time and money leak in your operation and target the highest-leverage automation first.",
      },
      {
        title: "Prototype fast",
        description:
          "A working prototype against your real data and tools — not a slide deck — so you can see the impact before committing.",
      },
      {
        title: "Build & integrate",
        description:
          "We ship the tool, wire it into your systems, and train the people who'll use it every day.",
      },
      {
        title: "Measure & iterate",
        description:
          "We track the metric that mattered and keep refining until the numbers move and stay moved.",
      },
    ],
    stats: [
      { value: "24/7", label: "Automations that never clock out" },
      { value: "Proven", label: "Tested on our own operations first" },
      { value: "Native", label: "Built into your existing stack" },
    ],
    outcomes: [
      "Hours of manual work removed every week",
      "Cleaner data and reporting you can trust",
      "Software shaped around your process, not the reverse",
      "AI deployed responsibly, with people in the loop",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
