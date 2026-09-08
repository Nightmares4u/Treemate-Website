/**
 * Blog content lives here as structured data — same pattern as services.ts,
 * portfolio.ts, and careers.ts. No CMS, no Markdown pipeline: add a new
 * `BlogPost` object to `blogPosts` and it's live on the next deploy.
 *
 * Keep posts in Treemate's established voice: short, punchy, corporate tone,
 * no filler. See CLAUDE.md "Content guardrails" before writing new posts.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-09-08". Controls sort order and the sitemap. */
  date: string;
  author: string;
  /** One of the four service lines, or "Company News". Drives the filter/tag shown on the card. */
  category:
    | "Software & AI"
    | "Marketing"
    | "HR Solutions"
    | "Customer Success"
    | "Company News";
  excerpt: string;
  readMinutes: number;
  body: BlogBlock[];
  /** Target keywords this post was written for — used by the SEO script to check ranking movement. */
  seoKeywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hybrid-bpo-vs-traditional-outsourcing",
    title: "Hybrid BPO vs. Traditional Outsourcing: What Actually Changes for an SMB",
    date: "2026-09-08",
    author: "Treemate Team",
    category: "Company News",
    excerpt:
      "Traditional BPO rents you headcount. A hybrid model — software, staffing, and support under one accountable partner — changes what you're actually buying.",
    readMinutes: 5,
    seoKeywords: [
      "hybrid BPO",
      "business process outsourcing for SMBs",
      "outsourcing vs BPO",
    ],
    body: [
      {
        type: "p",
        text: "Most SMBs that look into outsourcing are shopping for headcount: a cheaper agent to answer phones, enter data, or chase invoices. That's traditional BPO — you rent a person, you manage the process yourself, and if the tooling around that person is broken, it stays broken.",
      },
      {
        type: "h2",
        text: "The gap traditional BPO leaves open",
      },
      {
        type: "p",
        text: "A rented agent is only as good as the system they're plugged into. If your CRM doesn't fit how your team actually sells, or your support queue has no real escalation path, adding headcount just moves the bottleneck — it doesn't remove it.",
      },
      {
        type: "h2",
        text: "What a hybrid model changes",
      },
      {
        type: "list",
        items: [
          "The software, the staffing, and the support run as one system instead of three separate vendor relationships",
          "The team you hire is trained inside the same CRM/HRM the software side built and maintains",
          "One accountable partner, not a vendor for tools and a separate vendor for people",
        ],
      },
      {
        type: "p",
        text: "That's the difference between renting labor and buying an outcome. It's also why the build sequence matters — the tooling has to exist before the team scales into it, not after.",
      },
    ],
  },
  {
    slug: "signs-your-crm-is-fighting-your-sales-team",
    title: "5 Signs Your CRM Is Fighting Your Sales Team Instead of Helping It",
    date: "2026-09-08",
    author: "Treemate Team",
    category: "Software & AI",
    excerpt:
      "Most CRMs get bought for the demo, not the day-to-day. Here's how to tell yours has become the thing your reps route around.",
    readMinutes: 4,
    seoKeywords: ["custom CRM for sales teams", "CRM problems", "sales CRM SMB"],
    body: [
      {
        type: "p",
        text: "A CRM is supposed to make the next call obvious. When it doesn't, reps stop trusting it — and once they stop trusting it, the data inside it stops being real.",
      },
      {
        type: "h2",
        text: "The five signs",
      },
      {
        type: "list",
        items: [
          "Reps keep a personal spreadsheet 'just in case' the CRM data is wrong",
          "Lead routing depends on someone remembering to reassign manually",
          "Follow-up timing is tribal knowledge, not a rule the system enforces",
          "Reporting requires someone to manually reconcile numbers before a meeting",
          "New hires take weeks to trust the pipeline stages, because half of them don't mean what they say",
        ],
      },
      {
        type: "p",
        text: "None of these are people problems. They're tooling problems — and they're exactly what a CRM built around how your team actually works, instead of a generic template, is supposed to remove.",
      },
    ],
  },
  {
    slug: "cross-border-hiring-us-pakistan",
    title: "What Cross-Border Hiring Between the US and Pakistan Actually Requires",
    date: "2026-09-08",
    author: "Treemate Team",
    category: "HR Solutions",
    excerpt:
      "Payroll, compliance, and time zones are the easy part to underestimate. Here's what a US company actually needs in place before hiring in Pakistan.",
    readMinutes: 5,
    seoKeywords: [
      "hire remote team Pakistan",
      "cross-border payroll US Pakistan",
      "outsource staffing Pakistan",
    ],
    body: [
      {
        type: "p",
        text: "Hiring across a border sounds like a contracts problem. In practice, three things break first: payroll and currency, compliance in both jurisdictions, and the operational gap of running a team you can't walk over and talk to.",
      },
      {
        type: "h2",
        text: "Payroll and currency",
      },
      {
        type: "p",
        text: "Currency conversion, local banking rails, and benefits that make sense on the ground in Pakistan all need to be handled without the US side re-learning a new payroll system for every hire.",
      },
      {
        type: "h2",
        text: "Compliance in both directions",
      },
      {
        type: "p",
        text: "US federal/state labor rules and Pakistani labor law both apply, simultaneously, to the same working relationship. Getting this wrong is not a paperwork issue — it's a liability issue.",
      },
      {
        type: "h2",
        text: "The operational gap",
      },
      {
        type: "p",
        text: "Time zone overlap, onboarding into your actual tools (not a generic checklist), and performance visibility all have to be designed on purpose. A custom HRM that both sides actually use — not a shared spreadsheet — is what keeps this from quietly falling apart in month three.",
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
