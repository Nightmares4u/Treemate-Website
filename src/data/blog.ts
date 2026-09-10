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
  {
    slug: "custom-software-vs-saas-build-or-buy",
    title: "Build or Buy: When Custom Software Beats Another SaaS Subscription",
    date: "2026-09-10",
    author: "Treemate Team",
    category: "Software & AI",
    excerpt:
      "The build-vs-buy question is usually argued on price. Price is the least useful way to answer it — here's the test that actually holds up.",
    readMinutes: 4,
    seoKeywords: [
      "build vs buy software",
      "custom software vs SaaS",
      "when to build custom software",
      "custom software development for SMBs",
    ],
    body: [
      {
        type: "p",
        text: "Most build-vs-buy debates start with a licence fee and a developer day rate, and end wherever the spreadsheet lands. That comparison is close to meaningless. Buying looks cheap because the cost is visible and monthly; building looks expensive because the cost is visible and upfront. The costs that actually decide the outcome are on neither side of that sum.",
      },
      {
        type: "h2",
        text: "Buy when the process is a commodity",
      },
      {
        type: "p",
        text: "Payroll runs the same way at most companies. So does email, accounting, and e-signature. Where a process is genuinely standard, someone has already built a better version of it than you will, and they maintain it for a fraction of what it costs you to own. Buy it, and don't customise it into something only you can support.",
      },
      {
        type: "p",
        text: "The tell is simple: if your requirements document could describe half the companies in your industry, you're describing a commodity. Buy.",
      },
      {
        type: "h2",
        text: "Build when the workaround has become the job",
      },
      {
        type: "p",
        text: "The case for building rarely announces itself as a software problem. It shows up as labour. Someone exports a report every Monday and re-keys it into a second system. A spreadsheet sits beside the CRM because the CRM can't express how you actually price. Three tools each hold a piece of one customer record and nobody trusts any of them.",
      },
      {
        type: "p",
        text: "That work is real payroll, spent permanently, to paper over a gap. It scales linearly with the business, which means it gets worse exactly when things go well.",
      },
      {
        type: "h2",
        text: "The signals worth acting on",
      },
      {
        type: "list",
        items: [
          "A named person's week is substantially made of moving data between systems",
          "The thing that differentiates you commercially is the thing your tooling handles worst",
          "You are paying per seat for software most of those seats use for one feature",
          "Onboarding a new hire means teaching them the workarounds, not the process",
          "You've been told a change is impossible because of how the vendor's data model works",
        ],
      },
      {
        type: "p",
        text: "One of these is noise. Three is a pattern. The last one is the most expensive, because it means your operating model is now constrained by a decision someone else made about their product roadmap.",
      },
      {
        type: "h2",
        text: "What building actually costs",
      },
      {
        type: "p",
        text: "Honestly: more than the build. Custom software is a commitment to maintenance, and anyone who quotes you a fixed price and no upkeep is selling you a liability. It needs someone accountable for it after launch, or it decays into the exact legacy system you were trying to escape.",
      },
      {
        type: "p",
        text: "That's the real question behind build-vs-buy — not whether you can afford to build it, but whether you can afford to keep it alive. If the answer is no, buy the commodity tool and accept its constraints.",
      },
      {
        type: "h2",
        text: "The answer is usually both",
      },
      {
        type: "p",
        text: "Framing this as a single choice for the whole company is what produces bad outcomes. The durable pattern is narrower: buy the commodity layers, build the thin slice that encodes how you actually operate, and make them talk to each other properly. Accounting stays bought. The pricing logic nobody else has stays yours.",
      },
      {
        type: "p",
        text: "That slice is smaller than most build proposals assume. A lot of what gets scoped as a custom platform is really one workflow, two integrations, and a report — and scoping it honestly is the difference between a project that ships and one that becomes a cautionary tale.",
      },
      {
        type: "h2",
        text: "What AI changed, and what it didn't",
      },
      {
        type: "p",
        text: "Building is meaningfully cheaper than it was a few years ago, and the work that used to justify a large team — CRUD screens, integrations, data plumbing — is where the gains are largest. That shifts the line: some processes that were clearly buy-only are now reasonable to build around.",
      },
      {
        type: "p",
        text: "What hasn't changed is the maintenance question. Faster to write is not the same as free to own. If anything, cheaper building makes the discipline more important, because it's now easy to produce more custom software than you have the capacity to look after.",
      },
      {
        type: "h2",
        text: "A test that holds up",
      },
      {
        type: "p",
        text: "Ask what happens if this process stays exactly as it is for three more years. If the answer is that you'd hire two people to keep it running, you have a build case, and the payback is headcount you never add. If the answer is that it's mildly annoying, buy something and move on.",
      },
      {
        type: "p",
        text: "Most companies need both. The mistake isn't choosing wrong — it's choosing once, then never revisiting it as the business changes shape underneath the decision.",
      },
    ],
  },
  {
    slug: "in-house-vs-outsourced-customer-support",
    title: "In-House vs. Outsourced Customer Support: How to Actually Decide",
    date: "2026-09-10",
    author: "Treemate Team",
    category: "Customer Success",
    excerpt:
      "This gets argued as a cost decision. It's a control decision — and the teams that get it wrong usually outsourced the wrong tier.",
    readMinutes: 4,
    seoKeywords: [
      "in-house vs outsourced customer support",
      "when to outsource customer support",
      "outsourced customer support for SMBs",
      "customer support outsourcing",
    ],
    body: [
      {
        type: "p",
        text: "Support outsourcing is usually pitched as arbitrage: the same work, less money. That framing is why so many of these arrangements disappoint. You are not buying the same work more cheaply. You are deciding which parts of the customer relationship you are willing to hand to someone whose incentives you have to design.",
      },
      {
        type: "h2",
        text: "What keeping it in-house actually buys",
      },
      {
        type: "p",
        text: "Proximity. An in-house agent overhears the product conversation, knows which bug shipped last Thursday, and can walk to the engineer who wrote it. That context is genuinely hard to transfer, and for a young product where every ticket is really product feedback, it's the whole point.",
      },
      {
        type: "p",
        text: "What it costs is coverage and elasticity. A small in-house team cannot staff nights and weekends without either burning out or hiring well past what your volume justifies.",
      },
      {
        type: "h2",
        text: "What outsourcing actually buys",
      },
      {
        type: "p",
        text: "Coverage you could not otherwise afford, and a volume curve you don't have to hire against. Seasonal spikes stop being a staffing crisis. Someone answers at 3am without anyone on your payroll being awake.",
      },
      {
        type: "p",
        text: "What it costs is directness. Every piece of context now has to be written down, because it can no longer be absorbed by sitting near the right people.",
      },
      {
        type: "h2",
        text: "The mistake is usually the tier, not the decision",
      },
      {
        type: "p",
        text: "Support isn't one job. Password resets, order status, and how-do-I questions are high-volume, well-defined, and improve with dedicated practice — these outsource well. Escalations that require judgement about a specific account, refunds outside policy, and anything touching churn risk are a different job wearing the same title.",
      },
      {
        type: "p",
        text: "Teams that outsource everything lose the escalation judgement. Teams that outsource nothing pay senior salaries to reset passwords. Most of the value is in splitting the tiers deliberately rather than treating the choice as all-or-nothing.",
      },
      {
        type: "h2",
        text: "The failure mode nobody plans for",
      },
      {
        type: "p",
        text: "It's almost never the agents. It's the handoff. An outsourced team working in a separate ticketing system, against a knowledge base nobody updates, with no path to a decision-maker, will produce exactly the experience customers complain about — polite, fast, and unable to actually resolve anything.",
      },
      {
        type: "list",
        items: [
          "Agents work inside your systems, not a parallel copy of them",
          "Escalation has a named destination and a time bound, not a queue",
          "The knowledge base has an owner, because it decays weekly by default",
          "Reporting shows resolution and repeat contacts, not just volume and speed",
          "Someone reviews the tickets nobody escalated — that's where the churn hides",
        ],
      },
      {
        type: "h2",
        text: "Time zones are a feature or a tax, depending on the design",
      },
      {
        type: "p",
        text: "A team several time zones away can mean genuine overnight coverage, or it can mean every question waits a full day for an answer. The difference is entirely in what the offshore tier is authorised to decide alone.",
      },
      {
        type: "p",
        text: "If they can resolve their tier without waking anyone, the gap is coverage. If most tickets need a decision from someone asleep, you haven't extended your hours — you've added latency and called it support.",
      },
      {
        type: "h2",
        text: "What to measure in the first ninety days",
      },
      {
        type: "p",
        text: "Response time will look good almost immediately, and it is the least informative number available. Dedicated agents answer quickly; that tells you nothing about whether the customer's problem went away.",
      },
      {
        type: "list",
        items: [
          "Repeat contact rate — the same customer back within a week on the same issue",
          "Escalation rate over time, which should fall as the knowledge base matures and rise again whenever the product ships something significant",
          "Resolution without escalation, by ticket type, so you can see which tiers were sorted correctly",
          "CSAT split by tier, because a good average routinely hides a bad escalation path",
        ],
      },
      {
        type: "p",
        text: "If repeat contacts aren't falling by month three, the problem is the knowledge base or the tier split. It is almost never the agents, and replacing them will reset the clock without changing the number.",
      },
      {
        type: "h2",
        text: "How to decide",
      },
      {
        type: "p",
        text: "Sort a month of tickets into two piles: the ones answerable from documentation, and the ones needing a judgement call about a specific customer. If the first pile dominates and your team is drowning in it, outsource that tier and keep the second. If the second pile dominates, your support problem is a product problem, and no staffing arrangement will fix it.",
      },
      {
        type: "p",
        text: "It isn't permanent either way. The split that's right at fifty tickets a day is rarely right at five hundred.",
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
