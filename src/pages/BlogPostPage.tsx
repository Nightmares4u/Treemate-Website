import { Calendar, Clock, ChevronsRight } from "lucide-react";
import { Container } from "../components/layout/Container";
import { LinkButton } from "../components/ui/LinkButton";
import { CTASection } from "../components/sections/CTASection";
import { RevealGroup } from "../components/motion/Reveal";
import { AnimatedHeadline } from "../components/motion/AnimatedHeadline";
import { getBlogPost, type BlogBlock } from "../data/blog";
import { NotFoundPage } from "./NotFoundPage";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-10 mb-4 font-heading text-2xl font-bold text-navy first:mt-0">
        {block.text}
      </h2>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="mb-6 flex flex-col gap-2.5">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-navy/80">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mb-6 leading-relaxed text-navy/80">{block.text}</p>;
}

export function BlogPostPage({ slug }: { slug: string }) {
  const post = getBlogPost(slug);
  if (!post) return <NotFoundPage />;

  return (
    <>
      <section className="relative overflow-hidden bg-grid pt-32 pb-16 md:pt-40 md:pb-20">
        <Container className="relative z-10 max-w-3xl">
          <RevealGroup variant="fade" stagger={0.1} as="div" className="flex flex-col gap-6">
            <span className="w-fit rounded-full bg-teal/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
              {post.category}
            </span>
            <AnimatedHeadline
              as="h1"
              text={post.title}
              className="font-heading font-normal tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", color: "#0A1628" }}
            />
            <div className="flex items-center gap-5 text-xs font-mono uppercase tracking-[0.1em] text-navy/50">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                {post.readMinutes} min read
              </span>
              <span>{post.author}</span>
            </div>
          </RevealGroup>
        </Container>
      </section>
      <section className="bg-white pb-24 md:pb-32">
        <Container className="max-w-3xl">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
          <div className="mt-10 border-t border-navy/10 pt-8">
            <LinkButton to="/blog" variant="outline" size="sm">
              <ChevronsRight className="h-4 w-4 rotate-180" strokeWidth={2.4} />
              Back to all posts
            </LinkButton>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
