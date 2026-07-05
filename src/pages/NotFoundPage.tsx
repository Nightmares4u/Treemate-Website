import { Container } from "../components/layout/Container";
import { LinkButton } from "../components/ui/LinkButton";
export function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center bg-base pt-32 pb-20">
      <Container className="text-center max-w-xl">
        <span className="font-heading font-normal text-7xl text-teal/30 tracking-tight">
          404
        </span>
        <h1
          className="font-heading font-normal tracking-tight leading-[1.1] text-navy mt-4 mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Page not found
        </h1>
        <p className="text-slate-600 mb-8">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <LinkButton to="/" size="lg">
          Back to Home
        </LinkButton>
      </Container>
    </section>
  );
}
