import { Check, ChevronsRight } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { LinkButton } from "../ui/LinkButton";
import { RevealGroup } from "../motion/Reveal";
import { jobOpenings } from "../../data/careers";
import { siteConfig } from "../../data/site";

function applyHref(title: string): string {
  const subject = encodeURIComponent(`Application: ${title}`);
  const body = encodeURIComponent(
    `Hi Treemate team,\n\nI'd like to apply for the ${title} role.\n\nName:\nLocation:\nLinkedIn / Portfolio:\nWhy this role:\n`,
  );
  return `mailto:${siteConfig.emails.sales}?subject=${subject}&body=${body}`;
}

export function JobListings() {
  return (
    <section id="open-roles" className="relative py-24 md:py-32 bg-white scroll-mt-24">
      <Container>
        <SectionTitle
          eyebrow="Open Roles"
          title="Current openings"
          subtitle="Every role below sits on a live team — sales floor, engineering, or creative. Apply directly and we'll respond within a few business days."
        />
        <RevealGroup
          variant="frame"
          stagger={0.08}
          as="div"
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {jobOpenings.map((job) => (
            <article
              key={job.id}
              className="u-card group relative flex h-full flex-col rounded-2xl border border-navy/10 bg-cream-soft/40 p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="u-icon flex h-12 w-12 items-center justify-center rounded-xl border border-teal/20 bg-teal/10 text-teal">
                  <job.icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
                  {job.department}
                </span>
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold leading-snug text-navy">
                {job.title}
              </h3>
              <p className="mb-4 leading-relaxed text-navy/70">{job.summary}</p>
              <ul className="mb-5 flex flex-wrap gap-2">
                <li className="rounded-full bg-navy/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-navy/50">
                  {job.type}
                </li>
                <li className="rounded-full bg-navy/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-navy/50">
                  {job.location}
                </li>
                {job.market && (
                  <li className="rounded-full bg-navy/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-navy/50">
                    {job.market}
                  </li>
                )}
              </ul>
              <ul className="mb-6 flex flex-col gap-2">
                {job.responsibilities.slice(0, 3).map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-navy/70"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal"
                      strokeWidth={2.4}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <LinkButton
                  href={applyHref(job.title)}
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                >
                  Apply Now
                  <ChevronsRight className="h-4 w-4" strokeWidth={2.4} />
                </LinkButton>
              </div>
            </article>
          ))}
        </RevealGroup>
        <p className="mt-14 text-center text-navy/60">
          Don&apos;t see the right fit yet?{" "}
          <a
            href={`mailto:${siteConfig.emails.sales}?subject=${encodeURIComponent("General Application — Treemate")}`}
            className="font-semibold text-navy underline decoration-navy/40 underline-offset-4 transition-colors hover:decoration-navy"
          >
            Send us your resume
          </a>{" "}
          — we keep every application on file.
        </p>
      </Container>
    </section>
  );
}
