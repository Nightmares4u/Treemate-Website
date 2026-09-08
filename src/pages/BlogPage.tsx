import { ChevronsRight, Calendar, Clock } from "lucide-react";
import { PageHero } from "../components/sections/PageHero";
import { Container } from "../components/layout/Container";
import { LinkButton } from "../components/ui/LinkButton";
import { RevealGroup } from "../components/motion/Reveal";
import { getAllBlogPosts } from "../data/blog";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPage() {
  const posts = getAllBlogPosts();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the loop."
        tagline="Field notes on software, staffing, and support — from the team actually running the systems."
        secondaryCta={{ label: "About Treemate", to: "/about" }}
      />
      <section className="py-24 md:py-32 bg-white">
        <Container>
          <RevealGroup
            variant="frame"
            stagger={0.08}
            as="div"
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {posts.map((post) => (
              <article
                key={post.slug}
                className="u-card group flex h-full flex-col rounded-2xl border border-navy/10 bg-cream-soft/40 p-6"
              >
                <span className="mb-4 w-fit rounded-full bg-teal/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
                  {post.category}
                </span>
                <h3 className="mb-2 font-heading text-xl font-bold leading-snug text-navy">
                  {post.title}
                </h3>
                <p className="mb-6 flex-1 leading-relaxed text-navy/70">
                  {post.excerpt}
                </p>
                <div className="mb-5 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.1em] text-navy/45">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                    {post.readMinutes} min
                  </span>
                </div>
                <LinkButton
                  to={`/blog/${post.slug}`}
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                >
                  Read Post
                  <ChevronsRight className="h-4 w-4" strokeWidth={2.4} />
                </LinkButton>
              </article>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
