import p011 from "../assets/portfolio/p01-1-pipeline-health.jpeg";
import p012 from "../assets/portfolio/p01-2-ingestion-rules.jpeg";
import p013 from "../assets/portfolio/p01-3-agent-queue.jpeg";
import p014 from "../assets/portfolio/p01-4-lead-dossier.jpeg";
import p021 from "../assets/portfolio/p02-1-public-site.jpeg";
import p022 from "../assets/portfolio/p02-2-programme-catalogue.jpeg";
import p023 from "../assets/portfolio/p02-3-course-registration.jpeg";
import p024 from "../assets/portfolio/p02-4-lecture-authoring.jpeg";
import p031 from "../assets/portfolio/p03-1-point-of-sale.jpeg";
import p032 from "../assets/portfolio/p03-2-store-dashboard.jpeg";
import p033 from "../assets/portfolio/p03-3-stock-valuation.jpeg";
import p034 from "../assets/portfolio/p03-4-ai-invoice-intake.jpeg";
import p041 from "../assets/portfolio/p04-1-campaign-overview.jpeg";
import p042 from "../assets/portfolio/p04-2-brand-review.jpeg";
import p043 from "../assets/portfolio/p04-3-funnel-analytics.jpeg";
import p051 from "../assets/portfolio/p05-1-operations-admin.jpeg";
import p052 from "../assets/portfolio/p05-2-fallback-rules.jpeg";
import p061 from "../assets/portfolio/p06-1-testimonial-carousel.jpeg";
import p062 from "../assets/portfolio/p06-2-milestone-timeline.jpeg";
import p063 from "../assets/portfolio/p06-3-video-reels.jpeg";
import p071 from "../assets/portfolio/p07-1-clause-review.jpeg";
import p072 from "../assets/portfolio/p07-2-scenario-runner.jpeg";
import p073 from "../assets/portfolio/p07-3-ma-protection.jpeg";
import p074 from "../assets/portfolio/p07-4-bylaws-check.jpeg";
import p081 from "../assets/portfolio/p08-1-je-review.jpeg";

export interface PortfolioFigure {
  src: string;
  caption: string;
}

export interface PortfolioSpec {
  label: string;
  value: string;
}

export interface PortfolioSystem {
  id: string;
  num: string;
  title: string;
  sector: string;
  surface: string;
  specs: PortfolioSpec[];
  hero: PortfolioFigure;
  subs: PortfolioFigure[];
  prose: string;
  caps: string[];
}

export const portfolioSystems: PortfolioSystem[] = [
  {
    id: "p01",
    num: "01",
    title: "Lead Ingestion & Outbound Pipeline",
    sector: "Outbound Sales",
    surface: "Local + Cloud",
    specs: [
      { label: "Built for", value: "Treemate — in-house sales infrastructure" },
      { label: "Sector", value: "Outbound sales operations" },
      { label: "Sources", value: "Public registries — NPPES, OpenStreetMap" },
      {
        label: "Architecture",
        value: "Local staging environment, qualified subset published to cloud",
      },
      {
        label: "Qualification",
        value: "Rule constraints plus model enrichment and scoring",
      },
      { label: "Delivery", value: "Timezone-ordered agent call queue" },
    ],
    hero: { src: p011, caption: "Fig. 01.1 — Pipeline health overview" },
    subs: [
      { src: p012, caption: "Fig. 01.2 — Ingestion rules and constraint engine" },
      { src: p013, caption: "Fig. 01.3 — Agent call queue" },
      { src: p014, caption: "Fig. 01.4 — Lead dossier and disposition" },
    ],
    prose:
      "Millions of raw records enter a local staging environment and only a qualified fraction ever reaches the cloud. A constraint engine applies hard filters and weighted scoring rules — contact validity, industry exclusion, business signals, website presence — while model enrichment extracts owner names and technology signals and writes a plain-language summary. Everything discarded is discarded locally, which keeps the hosted footprint small and cheap. What survives lands in an agent queue ordered by the prospect’s own working hours, so reps dial businesses that are actually open, with the full dossier and one-tap disposition in front of them.",
    caps: [
      "Local-first staging",
      "Constraint rule engine",
      "Weighted lead scoring",
      "Model enrichment",
      "Owner extraction",
      "Timezone-ordered queue",
      "Rapid disposition",
      "DNC handling",
      "Agent performance tracking",
    ],
  },
  {
    id: "p02",
    num: "02",
    title: "Online Learning Platform",
    sector: "Education",
    surface: "Web + Admin",
    specs: [
      { label: "Built for", value: "Private education client" },
      { label: "Sector", value: "Education" },
      {
        label: "Surfaces",
        value: "Public site, student portal, admin and instructor consoles",
      },
      { label: "Model", value: "Self-paced and structured cohorts" },
      { label: "Delivery", value: "Hosted lecture streaming, per-topic ordering" },
    ],
    hero: { src: p021, caption: "Fig. 02.1 — Public site" },
    subs: [
      { src: p022, caption: "Fig. 02.2 — Programme catalogue" },
      { src: p023, caption: "Fig. 02.3 — Course registration" },
      { src: p024, caption: "Fig. 02.4 — Lecture authoring" },
    ],
    prose:
      "A full e-learning ecosystem spanning the public prospectus, the student account and the staff back office. Programmes carry ordered courses and lectures with defined outcomes; registration routes straight into counselling; and the admin console handles programme lifecycle, instructor invitations, lesson materials and course review under role separation.",
    caps: [
      "Secure accounts",
      "Lecture streaming",
      "Programme lifecycle",
      "Instructor roles",
      "Course review",
      "Registration intake",
    ],
  },
  {
    id: "p03",
    num: "03",
    title: "Inventory & Point-of-Sale",
    sector: "Retail",
    surface: "Web + Offline sync",
    specs: [
      { label: "Built for", value: "Treemate — in-house retail product" },
      { label: "Sector", value: "Retail and distribution" },
      {
        label: "Architecture",
        value: "Unified application, cloud-native database, offline-capable",
      },
      { label: "Counter", value: "Barcode-enabled POS with held-bill support" },
      { label: "Intake", value: "AI invoice extraction with human review" },
      { label: "Integrity", value: "Atomic inventory transactions" },
    ],
    hero: { src: p031, caption: "Fig. 03.1 — Point of sale" },
    subs: [
      { src: p032, caption: "Fig. 03.2 — Store dashboard" },
      { src: p033, caption: "Fig. 03.3 — Stock and valuation" },
      { src: p034, caption: "Fig. 03.4 — AI invoice intake" },
    ],
    prose:
      "One application covering the whole retail floor, backed by a cloud-native database that keeps working when the connection drops. Supplier invoices are photographed and extracted automatically, with every line held for review before it touches stock. Alias matching resolves the same product across a dozen supplier naming conventions; valuation, low-stock and expiry windows stay live; and inventory movements are atomic, so the count on screen is the count in the room — with full supplier ledgers and outstanding balances underneath.",
    caps: [
      "AI invoice extraction",
      "Barcode POS",
      "Product-alias matching",
      "Live stock valuation",
      "Expiry monitoring",
      "Supplier ledgers",
      "Offline sync",
      "Returns and refunds",
    ],
  },
  {
    id: "p04",
    num: "04",
    title: "Amazon Wholesale ERP",
    sector: "E-Commerce",
    surface: "Multi-Tenant SaaS",
    specs: [
      { label: "Sector", value: "E-commerce and wholesale" },
      { label: "Model", value: "Multi-tenant SaaS" },
      { label: "Pipeline", value: "Contract-first, nine-stage modular flow" },
      {
        label: "Output",
        value: "Catalogues ranked on viability and profitability",
      },
    ],
    hero: { src: p041, caption: "Fig. 04.1 — Campaign overview" },
    subs: [
      { src: p042, caption: "Fig. 04.2 — Brand review and generated draft" },
      { src: p043, caption: "Fig. 04.3 — Funnel and category analytics" },
    ],
    prose:
      "Enterprise-grade SaaS that turns raw marketplace data into a working wholesale prospect list. A contract-first modular pipeline moves brands through deduplication, a first-layer screen, viability scoring, contact discovery and validation, draft generation, outreach and approval — every stage independently replaceable, every rejection traceable to the threshold that caused it. Generated outreach is held for human approval before it sends.",
    caps: [
      "Brand deduplication",
      "Threshold screening",
      "Viability scoring",
      "Contact discovery",
      "Draft generation",
      "Human approval gate",
      "Tenant isolation",
    ],
  },
  {
    id: "p05",
    num: "05",
    title: "CRM & HRM Operations Platform",
    sector: "Enterprise Ops",
    surface: "Web Portal",
    specs: [
      { label: "Built for", value: "Multi-office consultancy client" },
      { label: "Sector", value: "Enterprise operations" },
      { label: "Scope", value: "Client-facing and internal, one portal" },
      {
        label: "Modules",
        value: "CRM, HR records, attendance, leave, tasks, transfers",
      },
      {
        label: "Intake",
        value: "WhatsApp-number ownership with rule-based fallback",
      },
    ],
    hero: { src: p051, caption: "Fig. 05.1 — Operations admin" },
    subs: [{ src: p052, caption: "Fig. 05.2 — Fallback assignment rules" }],
    prose:
      "A single portal for the two halves of a business that usually live in separate tools. Client relationships and sales pipelines sit alongside employee records, attendance, leave and payroll administration. Lead ownership is derived from the WhatsApp number a prospect messaged, with a priority-ordered rule engine covering country, city, product, branch and campaign as fallback — and a temporary-fallback counsellor for absences, so no inbound lead is ever unowned.",
    caps: [
      "Deterministic lead routing",
      "Rule fallback engine",
      "Raw inbox review",
      "Transfer monitor",
      "Attendance and leave",
      "Employee records",
    ],
  },
  {
    id: "p06",
    num: "06",
    title: "Consultancy Marketing Platform",
    sector: "Professional Services",
    surface: "Web",
    specs: [
      { label: "Built for", value: "Multi-office consultancy client" },
      { label: "Sector", value: "Professional services" },
      {
        label: "Build",
        value: "Responsive marketing site with editorial modules",
      },
      {
        label: "Modules",
        value: "Milestone timeline, video reels, testimonial carousel",
      },
      {
        label: "Conversion",
        value: "Consultation booking and WhatsApp handoff",
      },
    ],
    hero: { src: p061, caption: "Fig. 06.1 — Testimonial carousel" },
    subs: [
      { src: p062, caption: "Fig. 06.2 — Company milestone timeline" },
      { src: p063, caption: "Fig. 06.3 — Video success reels" },
    ],
    prose:
      "A conversion-focused marketing platform for a multi-office consultancy. Beyond static pages it runs an auto-rolling testimonial carousel, an interactive milestone timeline segmented by region, and embedded video reels — all built as content modules the client updates without a developer. Persistent booking and messaging entry points sit above the fold on every route.",
    caps: [
      "Responsive build",
      "Content modules",
      "Auto-rolling carousel",
      "Region-segmented timeline",
      "Embedded video",
      "Booking capture",
    ],
  },
  {
    id: "p07",
    num: "07",
    title: "Contract Stress-Testing Platform",
    sector: "Legal Technology",
    surface: "Web",
    specs: [
      { label: "Built for", value: "Legal clinics and in-house counsel" },
      { label: "Sector", value: "Legal technology" },
      { label: "Scope", value: "Corporate contracts, bylaws, M&A protections" },
      {
        label: "Method",
        value: "Clause extraction, playbook deviation, scenario simulation",
      },
      {
        label: "Control",
        value: "Every machine finding carries provenance and a human verdict",
      },
    ],
    hero: { src: p071, caption: "Fig. 07.1 — Clause review workspace" },
    subs: [
      { src: p072, caption: "Fig. 07.2 — Scenario stress runner" },
      { src: p073, caption: "Fig. 07.3 — M&A protection matrix" },
      { src: p074, caption: "Fig. 07.4 — Bylaws conflict check" },
    ],
    prose:
      "Legal review software that does more than read a contract — it stress-tests it. Clauses are extracted and scored against a firm playbook, then run through adverse scenarios: change of control, counterparty insolvency, material breach, indemnity trigger, regulatory shift. The platform surfaces where protection thins out, which obligations survive termination, and how M&A representations, warranty caps and MAC provisions actually hold under pressure. Nothing is auto-accepted; every finding shows the clause it came from and waits for a lawyer’s verdict.",
    caps: [
      "Clause extraction",
      "Playbook deviation",
      "Scenario stress tests",
      "Indemnity and cap analysis",
      "Survival mapping",
      "Bylaws conflict check",
      "Redline generation",
      "Provenance trail",
    ],
  },
  {
    id: "p08",
    num: "08",
    title: "AI Audit Engagement Platform",
    sector: "Audit & Assurance",
    surface: "Web",
    specs: [
      { label: "Built for", value: "Assurance and advisory practices" },
      { label: "Sector", value: "Audit and assurance" },
      { label: "Scope", value: "Planning through completion, one engagement file" },
      {
        label: "Method",
        value: "Full-population testing with rule and model-driven exception flags",
      },
      {
        label: "Control",
        value: "Maker-checker sign-off and append-only audit log",
      },
    ],
    hero: { src: p081, caption: "Fig. 08.1 — Journal entry review queue" },
    subs: [],
    prose:
      "An engagement platform built to the working practices of a large assurance team. Rather than sampling and hoping, it tests the full general ledger population and surfaces exceptions with the reason attached: round-dollar postings, entries outside business hours, unusual account pairings, amounts sitting just under an approval threshold, first-digit distribution deviation. Auditors dispose of each item with a typed rationale, review notes escalate through the manager and partner hierarchy, and sign-off locks the workpaper into an append-only log an inspector can read three years later.",
    caps: [
      "Full-population JE testing",
      "Anomaly scoring",
      "Evidence chain",
      "Materiality calculator",
      "Sampling and projection",
      "Review note hierarchy",
      "Maker-checker sign-off",
      "Immutable log",
    ],
  },
];
