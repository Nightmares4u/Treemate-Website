import {
  Gauge,
  ServerCog,
  LockKeyhole,
  Layers,
  ShoppingCart,
  Truck,
  Stethoscope,
  Building2,
  Cpu,
  Home,
  type LucideIcon,
} from "lucide-react";

export interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const differentiators: Differentiator[] = [
  {
    icon: Gauge,
    title: "Live in 48 hours",
    description:
      "A flat, decentralized structure lets us stand up a dedicated team in days, not the weeks of red tape a traditional agency needs.",
  },
  {
    icon: ServerCog,
    title: "Enterprise infrastructure",
    description:
      "We run our own contact-center stack — ACD, predictive dialing, and an integrated CRM — engineered for uptime, not retail markups.",
  },
  {
    icon: LockKeyhole,
    title: "Accountable & transparent",
    description:
      "Defined SLAs, score-carded agents, and live dashboards. You always know exactly how your team is performing.",
  },
  {
    icon: Layers,
    title: "One partner, three layers",
    description:
      "Operations, people, and the software that connects them — under a single accountable relationship instead of four vendors.",
  },
];

export interface Industry {
  icon: LucideIcon;
  name: string;
}

export const industries: Industry[] = [
  { icon: ShoppingCart, name: "E-commerce & Retail" },
  { icon: Cpu, name: "Technology & SaaS" },
  { icon: Truck, name: "Logistics & Freight" },
  { icon: Home, name: "Real Estate" },
  { icon: Stethoscope, name: "Healthcare Services" },
  { icon: Building2, name: "Professional Services" },
];

export interface Stat {
  value: string;
  label: string;
}

export const companyStats: Stat[] = [
  { value: "48 hrs", label: "Average time to a live team" },
  { value: "24/7", label: "Coverage across every time zone" },
  { value: "99.9%", label: "Target platform uptime" },
  { value: "3", label: "Service lines under one partner" },
];

export const roleCategories = [
  {
    name: "Technical",
    roles: [
      "Full-Stack Developer",
      "DevOps Engineer",
      "QA Engineer",
      "AI/ML Engineer",
      "Mobile Developer",
      "Data Analyst",
      "Cybersecurity Analyst",
      "Shopify / WordPress Dev",
    ],
  },
  {
    name: "Creative & Marketing",
    roles: [
      "Graphic Designer",
      "Video Editor",
      "Motion Designer",
      "Copywriter",
      "Social Media Manager",
      "SEO Analyst",
      "Media Buyer",
    ],
  },
  {
    name: "Operations",
    roles: [
      "Virtual Assistant",
      "Executive Assistant",
      "Project Manager",
      "Bookkeeper",
      "CRM Manager",
      "Data Entry Specialist",
      "Appointment Setter",
    ],
  },
  {
    name: "Customer-Facing",
    roles: [
      "Customer Service Rep",
      "Technical Support Rep",
      "Outbound / SDR",
      "Inbound Dispatcher",
    ],
  },
];
