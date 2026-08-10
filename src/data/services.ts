import {
  Cpu,
  Code2,
  Database,
  Sparkles,
  LineChart,
  Workflow,
  ServerCog,
  Users,
  UserCog,
  Search,
  Banknote,
  ShieldCheck,
  BarChart3,
  Headphones,
  MessagesSquare,
  Bot,
  HeartHandshake,
  Truck,
  Megaphone,
  TrendingUp,
  SearchCheck,
  Palette,
  Video,
  Compass,
  FileText,
  Share2,
  ShoppingBag,
  Globe,
  type LucideIcon,
} from "lucide-react";
import operationsFloor from "../assets/office/operations-floor.jpg";
interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
}
interface ProcessStep {
  title: string;
  description: string;
}
interface ServiceStat {
  value: string;
  label: string;
}
export interface Service {
  slug: string;
  nav: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  summary: string;
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
    slug: "software-ai",
    nav: "Software & AI",
    icon: Cpu,
    eyebrow: "Software Engineering & AI",
    title: "Software & AI Solutions",
    summary:
      "Bespoke enterprise software — CRM, HRM, POS — full-stack apps, and deep AI integration, built by a full-spectrum engineering team.",
    intro:
      "Treemate is a full-spectrum software engineering firm. We develop, maintain, and upgrade any digital product, with a heavy emphasis on modern AI. We build the systems that run a business and embed intelligence exactly where it earns its keep.",
    heroPoints: [
      "Bespoke CRM, HRM, and POS systems that replace fragmented tools",
      "Generative AI, predictive analytics, and intelligent automation",
      "DevOps and cloud across AWS, Azure, and GCP",
    ],
    capabilities: [
      {
        icon: Database,
        title: "Custom Enterprise Software",
        description:
          "End-to-end development of bespoke CRM, HRM, and POS systems that replace fragmented tools with unified dashboards.",
      },
      {
        icon: Code2,
        title: "Full-Stack Applications",
        description:
          "Custom web and mobile applications engineered for high performance and scalability, built to fit your process rather than force you into someone else's.",
      },
      {
        icon: Sparkles,
        title: "Generative AI",
        description:
          "Our core specialty — embedding custom Large Language Models into your platform for automated reporting, content generation, and smart chatbots.",
      },
      {
        icon: LineChart,
        title: "Predictive Analytics",
        description:
          "Machine-learning models tailored for inventory forecasting, customer churn prediction, and dynamic pricing.",
      },
      {
        icon: Workflow,
        title: "Intelligent Automation",
        description:
          "AI agents that read documents, route leads, and detect anomalies autonomously — replacing manual workflows instead of just tracking them.",
      },
      {
        icon: ServerCog,
        title: "DevOps & Cloud Infrastructure",
        description:
          "CI/CD pipelines for zero-downtime releases, plus AWS, Azure, and GCP environments with 24/7 monitoring and security patching.",
      },
    ],
    process: [
      {
        title: "Scope & architect",
        description:
          "We map your systems, data, and the outcome you need, then design the architecture and AI approach to reach it.",
      },
      {
        title: "Prototype",
        description:
          "A working prototype against your real data — so you see the product, and the intelligence in it, before the full build.",
      },
      {
        title: "Build & integrate",
        description:
          "We engineer the system, wire in your existing tools, and stand up the CI/CD pipeline and cloud environment behind it.",
      },
      {
        title: "Deploy & maintain",
        description:
          "Continuous deployment, 24/7 monitoring, and security patching keep the product fast and current long after launch.",
      },
    ],
    stats: [
      {
        value: "AI-first",
        label: "Generative & predictive AI as core specialty",
      },
      {
        value: "CRM · HRM · POS",
        label: "Bespoke systems on one unified dashboard",
      },
      {
        value: "AWS · Azure · GCP",
        label: "Cloud architected and monitored 24/7",
      },
    ],
    outcomes: [
      "Fragmented tools replaced by unified, custom dashboards",
      "AI embedded where it removes cost and manual work",
      "Scalable full-stack apps engineered for performance",
      "Zero-downtime releases on managed cloud infrastructure",
    ],
  },
  {
    slug: "marketing",
    nav: "Marketing",
    icon: Megaphone,
    eyebrow: "Growth & Digital Marketing",
    title: "Growth & Marketing Solutions",
    summary:
      "Full-funnel performance marketing, brand strategy, creative production, and revenue acceleration — managed end to end by a dedicated growth team.",
    intro:
      "We build and execute high-ROI marketing engines that acquire, engage, and retain ideal customers. From paid campaigns and brand strategy to high-converting creative, video production, and technical SEO, we run your entire growth stack so every dollar works harder.",
    heroPoints: [
      "Full-funnel customer acquisition across paid search, paid social, and organic SEO",
      "High-converting creative studio: graphic design, video production, and brand copywriting",
      "Ecommerce solutions, conversion rate optimization (CRO), and custom web development",
    ],
    capabilities: [
      {
        icon: TrendingUp,
        title: "Performance Marketing",
        description:
          "Data-driven paid search and social campaigns across Google Ads, Meta, LinkedIn, and TikTok engineered for high ROAS and efficient CAC.",
        tags: ["Google Ads", "Meta Ads", "LinkedIn B2B", "ROAS Optimization"],
      },
      {
        icon: SearchCheck,
        title: "Search Engine Optimization",
        description:
          "Technical, programmatic, and content SEO strategies designed to dominate organic search rankings and capture qualified intent.",
        tags: ["Technical SEO", "Programmatic", "On-Page Strategy", "Keyword Intent"],
      },
      {
        icon: Compass,
        title: "Brand Strategy",
        description:
          "Comprehensive positioning, messaging frameworks, competitive differentiation, and visual identity that make your brand unmistakable.",
        tags: ["Positioning", "Brand Identity", "Messaging Matrix", "Market Research"],
      },
      {
        icon: Share2,
        title: "Social Media Management",
        description:
          "Multi-channel content calendars, community engagement, brand voice curation, and active audience growth across all major platforms.",
        tags: ["Content Calendar", "Community Growth", "Brand Voice", "Multi-Channel"],
      },
      {
        icon: FileText,
        title: "Content Creation",
        description:
          "High-converting sales copy, lead magnets, blogs, email marketing campaigns, and whitepapers that turn interest into qualified pipeline.",
        tags: ["Conversion Copy", "Lead Magnets", "Email Sequences", "Blogs & Guides"],
      },
      {
        icon: Palette,
        title: "Graphic Designing",
        description:
          "High-performing visual ad creatives, brand collateral, marketing kits, and UI/UX design assets that elevate your brand presence.",
        tags: ["Ad Creatives", "Brand Collateral", "Marketing Kits", "UI/UX Visuals"],
      },
      {
        icon: Video,
        title: "Video Production",
        description:
          "Engaging short-form reels, product demos, motion graphics, and high-impact ad video creative built to capture attention and convert.",
        tags: ["Short-Form Reels", "Motion Graphics", "Product Demos", "Social Ads"],
      },
      {
        icon: Globe,
        title: "Website Development",
        description:
          "Conversion-engineered websites, landing pages, and web applications built for blazing speed, seamless UX, and high lead capture.",
        tags: ["Conversion UX", "Landing Pages", "Lead Capture", "Fast Web Apps"],
      },
      {
        icon: ShoppingBag,
        title: "Ecommerce Solutions",
        description:
          "Conversion Rate Optimization (CRO), cart abandonment recovery, storefront UX enhancement, and automated catalog growth engines.",
        tags: ["Storefront CRO", "Cart Recovery", "Catalog Growth", "Checkout Flow"],
      },
    ],
    process: [
      {
        title: "Audit & strategy",
        description:
          "We analyze your current channel mix, audience data, and funnel metrics to build a high-conviction growth roadmap.",
      },
      {
        title: "Build & produce",
        description:
          "Our creative studio produces high-converting ad assets, video reels, and landing pages while engineers set up analytics tracking.",
      },
      {
        title: "Launch & scale",
        description:
          "We deploy multi-channel campaigns, execute technical SEO, and continuously test creative angles and audience targeting.",
      },
      {
        title: "Optimize & retain",
        description:
          "Real-time attribution, conversion rate optimization, and automated email/retargeting drive compounding ROI over time.",
      },
    ],
    stats: [
      {
        value: "ROAS-First",
        label: "Paid campaigns optimized for profitable return",
      },
      {
        value: "9 Services",
        label: "Full-spectrum marketing & creative capabilities",
      },
      {
        value: "US + PK",
        label: "Global growth studio operating 24/7",
      },
    ],
    outcomes: [
      "Predictable customer acquisition across paid search, paid social, and organic SEO",
      "High-converting graphic design, video reels, and brand creative assets",
      "Unified attribution connecting ad spend directly to closed-won revenue",
      "Conversion-engineered website development and ecommerce optimization",
    ],
  },
  {
    slug: "hr-solutions",
    nav: "HR Solutions",
    icon: Users,
    eyebrow: "Human Resources",
    title: "HR Solutions",
    summary:
      "Talent acquisition, cross-border payroll, and US + Pakistani compliance — all run through the custom HRM we build.",
    intro:
      "We provide the human capital to scale your operations, managed through the custom HRM systems we build. From sourcing specialized talent to running cross-border payroll and staying compliant in both jurisdictions, we carry the people overhead so you don't.",
    heroPoints: [
      "Specialized talent sourced, vetted, and onboarded for you",
      "Cross-border payroll and currency conversion handled end to end",
      "Compliant with US (Federal/State) and Pakistani labor law",
    ],
    capabilities: [
      {
        icon: Search,
        title: "Talent Acquisition & Staffing",
        description:
          "Sourcing, vetting, and onboarding specialized tech, sales, and administrative talent for US clients, from our Karachi floor.",
      },
      {
        icon: UserCog,
        title: "Custom HRM Onboarding",
        description:
          "Custom HRM workflows that integrate new hires smoothly into your company culture, tools, and day-to-day operations.",
      },
      {
        icon: Banknote,
        title: "Cross-Border Payroll",
        description:
          "Managing payroll, currency conversion, and remote-worker benefits across the US and Pakistan without the administrative drag.",
      },
      {
        icon: ShieldCheck,
        title: "Compliance",
        description:
          "Strict adherence to complex US (Federal/State) and Pakistani labor laws, so cross-border staffing stays clean.",
      },
      {
        icon: BarChart3,
        title: "Performance & KPIs",
        description:
          "Performance reviews and KPI tracking delivered through Treemate-built HR dashboards, with visibility for you at every step.",
      },
    ],
    process: [
      {
        title: "Define the role",
        description:
          "You set the skills, seniority, hours, and market. We turn it into a precise hiring profile and success criteria.",
      },
      {
        title: "Source & vet",
        description:
          "We recruit for your US roles, screen candidates, and onboard them through our custom HRM.",
      },
      {
        title: "Payroll & compliance",
        description:
          "We run cross-border payroll and keep every hire compliant with US Federal/State and Pakistani labor law.",
      },
      {
        title: "Manage & review",
        description:
          "Performance reviews and KPI dashboards keep the team accountable and visible as it scales.",
      },
    ],
    stats: [
      { value: "US + PK", label: "Compliant staffing across both jurisdictions" },
      {
        value: "Cross-border",
        label: "Payroll and currency handled end to end",
      },
      { value: "HRM-driven", label: "Onboarding and KPIs on our own platform" },
    ],
    outcomes: [
      "Specialized talent without a long internal hiring cycle",
      "Payroll and compliance overhead off your plate",
      "US and Pakistani labor law handled correctly",
      "Team performance visible through live HR dashboards",
    ],
  },
  {
    slug: "customer-success",
    nav: "Customer Success",
    icon: Headphones,
    eyebrow: "Customer Success & Support",
    title: "Customer Success & Support",
    summary:
      "Tiered, omnichannel support run inside your CRM — with human-in-the-loop AI and proactive retention.",
    intro:
      "We keep your end users satisfied. Our support teams work inside the same custom CRM we deploy for you, delivering tiered, omnichannel service backed by AI that assists — never replaces — the human agent.",
    heroPoints: [
      "Tier 1, 2, and 3 support from agents who know your software",
      "Phone, email, live chat, and social under one roof",
      "Human-in-the-loop AI and proactive churn prevention",
    ],
    capabilities: [
      {
        icon: Headphones,
        title: "Tiered Assistance",
        description:
          "Tier 1 (basic), Tier 2 (advanced), and Tier 3 (developer-level) support from agents who natively understand your software infrastructure.",
      },
      {
        icon: MessagesSquare,
        title: "Unified Communications",
        description:
          "Phone, email, live chat, and social media managed as one seamless channel, so context never gets lost between them.",
      },
      {
        icon: Bot,
        title: "Human-in-the-Loop AI",
        description:
          "AI that pre-triages tickets and suggests resolutions, helping human agents resolve faster while staying in control.",
      },
      {
        icon: HeartHandshake,
        title: "Proactive Retention",
        description:
          "Behavioral data that identifies frustrated users before they churn — and prompts the team to step in early.",
      },
      {
        icon: Truck,
        title: "Dispatch & Back-Office",
        description:
          "Appointment setting, field dispatching, and back-office administration handled by the same dedicated team.",
      },
    ],
    process: [
      {
        title: "Map the journey",
        description:
          "We learn your product, support tiers, and channels, then agree on the SLAs we'll be held to.",
      },
      {
        title: "Staff in your CRM",
        description:
          "Agents are trained on your software and go live inside the same custom CRM your customers touch.",
      },
      {
        title: "Support omnichannel",
        description:
          "Phone, email, chat, and social handled as one queue, with AI pre-triaging every ticket.",
      },
      {
        title: "Retain & optimize",
        description:
          "Behavioral data drives proactive outreach; QA reviews and dashboards keep quality high.",
      },
    ],
    stats: [
      {
        value: "T1 · T2 · T3",
        label: "Tiered support with developer-level depth",
      },
      { value: "Omnichannel", label: "Phone, email, chat, and social as one" },
      { value: "24/7", label: "Coverage across every time zone" },
    ],
    outcomes: [
      "Support agents who genuinely understand your software",
      "One team across every channel, with no lost context",
      "AI-assisted resolutions with humans always in the loop",
      "Churn caught early through behavioral signals",
    ],
    image: operationsFloor,
    imageAlt: "Treemate customer success team on live support queues",
    imageCaption:
      "Our support floor — dedicated agents working inside your CRM, around the clock.",
  },
];
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
