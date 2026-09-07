import {
  Phone,
  MessageCircle,
  Code2,
  Palette,
  Share2,
  type LucideIcon,
} from "lucide-react";

export type JobDepartment = "Sales" | "Engineering" | "Design" | "Marketing";

export interface JobOpening {
  id: string;
  title: string;
  department: JobDepartment;
  icon: LucideIcon;
  type: string;
  location: string;
  market?: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export const jobOpenings: JobOpening[] = [
  {
    id: "sales-voice-intl",
    title: "Sales Voice — International",
    department: "Sales",
    icon: Phone,
    type: "Full-time",
    location: "Karachi, Pakistan · On-site",
    market: "International Desk",
    summary:
      "Outbound and inbound voice sales to North American prospects, working US business hours on our dialer floor.",
    responsibilities: [
      "Run outbound and inbound calls to US/Canada leads through our dialer",
      "Qualify prospects and book meetings for the closing team inside our CRM",
      "Hit daily talk-time and conversion targets on a structured shift",
      "Log every call outcome accurately for pipeline reporting",
    ],
    requirements: [
      "Clear spoken English with a neutral, US-friendly accent",
      "Prior outbound/cold-calling or telesales experience preferred",
      "Comfortable working US business-hours shifts",
      "Resilient, target-driven, coachable",
    ],
  },
  {
    id: "sales-voice-domestic",
    title: "Sales Voice — Domestic",
    department: "Sales",
    icon: Phone,
    type: "Full-time",
    location: "Karachi, Pakistan · On-site",
    market: "Domestic Desk",
    summary:
      "Outbound and inbound voice sales to the local Pakistani market, on standard local business hours.",
    responsibilities: [
      "Run outbound and inbound calls to domestic leads through our dialer",
      "Qualify prospects and book meetings for the closing team inside our CRM",
      "Hit daily talk-time and conversion targets on a structured shift",
      "Log every call outcome accurately for pipeline reporting",
    ],
    requirements: [
      "Clear spoken Urdu and English",
      "Prior outbound/cold-calling or telesales experience preferred",
      "Comfortable working standard PKT business hours",
      "Resilient, target-driven, coachable",
    ],
  },
  {
    id: "sales-chat-intl",
    title: "Sales Chat — International",
    department: "Sales",
    icon: MessageCircle,
    type: "Full-time",
    location: "Karachi, Pakistan · On-site",
    market: "International Desk",
    summary:
      "Chat-based sales for North American leads — web chat and WhatsApp — on US business hours.",
    responsibilities: [
      "Respond to and qualify inbound web-chat and WhatsApp leads from US/Canada prospects",
      "Move qualified conversations to booked meetings inside our CRM",
      "Maintain fast response-time SLAs across concurrent chats",
      "Escalate complex or high-value conversations to the right closer",
    ],
    requirements: [
      "Strong written English — fast, clear, typo-free",
      "Comfortable managing multiple concurrent chat threads",
      "Prior chat support/sales or customer success experience preferred",
      "Comfortable working US business-hours shifts",
    ],
  },
  {
    id: "sales-chat-domestic",
    title: "Sales Chat — Domestic",
    department: "Sales",
    icon: MessageCircle,
    type: "Full-time",
    location: "Karachi, Pakistan · On-site",
    market: "Domestic Desk",
    summary:
      "Chat-based sales for the local Pakistani market — web chat and WhatsApp — on standard local hours.",
    responsibilities: [
      "Respond to and qualify inbound web-chat and WhatsApp leads from domestic prospects",
      "Move qualified conversations to booked meetings inside our CRM",
      "Maintain fast response-time SLAs across concurrent chats",
      "Escalate complex or high-value conversations to the right closer",
    ],
    requirements: [
      "Strong written Urdu and English",
      "Comfortable managing multiple concurrent chat threads",
      "Prior chat support/sales or customer success experience preferred",
      "Comfortable working standard PKT business hours",
    ],
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    department: "Engineering",
    icon: Code2,
    type: "Full-time",
    location: "Karachi, Pakistan · Hybrid",
    summary:
      "Build the CRM, HRM, and AI-augmented systems that run Treemate and our clients' operations.",
    responsibilities: [
      "Design and ship full-stack features across our internal and client platforms",
      "Work directly with product/ops to turn real operational problems into software",
      "Integrate AI/LLM components where they remove manual work",
      "Own code quality, testing, and deployment for what you build",
    ],
    requirements: [
      "Solid grounding in a modern web stack (React/TypeScript, Node, SQL)",
      "Comfortable owning a feature end to end, not just a ticket",
      "Bonus: experience with AI/LLM integration or cloud/DevOps (AWS/Azure/GCP)",
      "A portfolio, GitHub, or past project you can walk us through",
    ],
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    department: "Design",
    icon: Palette,
    type: "Full-time",
    location: "Karachi, Pakistan · Hybrid",
    summary:
      "Own the visual output for Treemate and client brands — ad creative, brand collateral, and UI/UX assets.",
    responsibilities: [
      "Produce ad creatives, brand collateral, and marketing kits across campaigns",
      "Contribute UI/UX visuals for web and product work",
      "Keep output on-brand across every client and every channel",
      "Turn quick briefs into polished assets on a fast marketing cadence",
    ],
    requirements: [
      "Strong portfolio across brand, ad, and digital design",
      "Fluent in the Adobe or Figma toolset",
      "Comfortable with fast turnarounds without dropping quality",
      "Bonus: motion graphics or short-form video editing",
    ],
  },
  {
    id: "social-media-manager",
    title: "Social Media Manager",
    department: "Marketing",
    icon: Share2,
    type: "Full-time",
    location: "Karachi, Pakistan · Hybrid",
    summary:
      "Run the content calendar, community, and brand voice across Treemate's and client social channels.",
    responsibilities: [
      "Plan and execute multi-channel content calendars",
      "Manage community engagement and brand voice day to day",
      "Track growth and engagement metrics, and adjust strategy accordingly",
      "Coordinate with design and video for on-brand creative assets",
    ],
    requirements: [
      "Proven experience running social accounts for a brand or client",
      "Sharp writing voice and platform-native instincts (LinkedIn, Instagram, TikTok)",
      "Comfortable with analytics/reporting on what's actually working",
      "Bonus: paid social or influencer/community experience",
    ],
  },
];

export function groupByDepartment(
  jobs: JobOpening[],
): Map<JobDepartment, JobOpening[]> {
  const groups = new Map<JobDepartment, JobOpening[]>();
  for (const job of jobs) {
    const list = groups.get(job.department) ?? [];
    list.push(job);
    groups.set(job.department, list);
  }
  return groups;
}
