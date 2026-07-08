import { Container } from "../layout/Container";
import { Reveal } from "../motion/Reveal";
interface ImageBandProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  bg?: "base" | "white" | "navy";
}
export function ImageBand({
  src,
  alt,
  caption,
  aspect = "aspect-[16/10] md:aspect-[2/1]",
  bg = "base",
}: ImageBandProps) {
  const bgClass =
    bg === "white" ? "bg-white" : bg === "navy" ? "bg-navy" : "bg-base";
  return (
    <section className={`py-16 md:py-20 ${bgClass}`}>
      <Container>
        <Reveal variant="frame" as="div" className="relative overflow-hidden">
          <div className={aspect}>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          {}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-teal/10" />
          {caption && (
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="font-heading font-semibold text-white text-lg md:text-xl max-w-xl drop-shadow">
                {caption}
              </p>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
