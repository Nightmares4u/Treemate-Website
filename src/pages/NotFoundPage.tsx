import { Container } from "../components/layout/Container";
import { LinkButton } from "../components/ui/LinkButton";
import { Reveal, RevealGroup } from "../components/motion/Reveal";
import { AnimatedHeadline } from "../components/motion/AnimatedHeadline";
export function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center bg-base pt-32 pb-20">
      <Container className="text-center max-w-xl">
        <Reveal
          variant="blur"
          as="span"
          className="inline-block font-heading font-normal text-7xl text-teal/30 tracking-tight"
        >
          404
        </Reveal>
        <AnimatedHeadline
          as="h1"
          text="Page not found"
          className="font-heading font-normal tracking-tight leading-[1.1] text-navy mt-4 mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          delay={0.15}
        />
        <RevealGroup
          variant="fade"
          stagger={0.12}
          delayChildren={0.32}
          as="div"
          className="flex flex-col items-center gap-8"
        >
          <p className="text-slate-600">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <LinkButton to="/" size="lg">
            Back to Home
          </LinkButton>
        </RevealGroup>
      </Container>
    </section>
  );
}
