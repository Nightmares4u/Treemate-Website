import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { easeOutExpo } from "../../lib/motion";

interface ImageBandProps {
  src: string;
  alt: string;
  caption?: string;
  /** Tailwind aspect ratio classes for the framed image. */
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
  const bgClass = bg === "white" ? "bg-white" : bg === "navy" ? "bg-navy" : "bg-base";
  return (
    <section className={`py-16 md:py-20 ${bgClass}`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-navy/10"
        >
          <div className={aspect}>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          {/* brand gradient wash for cohesion */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 mix-blend-multiply bg-gradient-to-br from-teal/10 to-transparent" />
          {caption && (
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="font-heading font-semibold text-white text-lg md:text-xl max-w-xl drop-shadow">
                {caption}
              </p>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
