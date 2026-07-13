import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../layout/Container";
import { LinkButton } from "../ui/LinkButton";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { HeroBackdrop } from "../ui/HeroBackdrop";
import { AnimatedHeadline } from "../motion/AnimatedHeadline";
import { fadeIn, staggerContainer } from "../../lib/motion";
interface PageHeroCta {
  label: string;
  to?: string;
  href?: string;
}
interface PageHeroProps {
  eyebrow?: string;
  title: string;
  tagline?: string;
  description?: string;
  primaryCta?: PageHeroCta;
  secondaryCta?: PageHeroCta;
  /**
   * Draws the tree mark, a mint bloom, and marker accents into the hero's
   * background. Pages whose headline wraps short leave a large gap beside it;
   * this fills that gap without putting anything on top of the content.
   * The right-hand spirals begin at 40% height, so the upper right is free.
   */
  backdrop?: boolean;
}
export function PageHero({
  eyebrow,
  title,
  tagline,
  description,
  primaryCta,
  secondaryCta,
  backdrop = false,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-grid pt-32 pb-16 md:pt-40 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-mint blur-[130px] opacity-60 animate-blob-drift"
      />
      <BackgroundSpirals side="both" opacity={0.18} />
      {backdrop && <HeroBackdrop />}
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end"
        >
          <div className="lg:col-span-7 flex flex-col gap-6">
            {eyebrow && (
              <motion.span
                variants={fadeIn}
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal"
              >
                {eyebrow}
              </motion.span>
            )}
            <AnimatedHeadline
              as="h1"
              text={title}
              className="font-heading font-normal tracking-tight leading-[1.1]"
              style={{
                fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
                color: "#0A1628",
              }}
            />
            {tagline && (
              <motion.p
                variants={fadeIn}
                className="text-base md:text-lg text-navy/70 leading-relaxed max-w-xl"
              >
                {tagline}
              </motion.p>
            )}
          </div>
          {(description || primaryCta || secondaryCta) && (
            <motion.div
              variants={fadeIn}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {description && (
                <p className="text-navy leading-relaxed font-medium max-w-md">
                  {description}
                </p>
              )}
              {(primaryCta || secondaryCta) && (
                <div className="flex flex-wrap items-center gap-6">
                  {primaryCta && (
                    <LinkButton
                      {...(primaryCta.to
                        ? { to: primaryCta.to }
                        : { href: primaryCta.href ?? "#" })}
                      variant="primary"
                      size="lg"
                    >
                      {primaryCta.label}
                      <ChevronsRight className="w-4 h-4" strokeWidth={2.4} />
                    </LinkButton>
                  )}
                  {secondaryCta &&
                    (secondaryCta.to ? (
                      <Link
                        to={secondaryCta.to}
                        className="text-navy font-semibold text-sm underline underline-offset-4 decoration-navy/40 hover:decoration-navy transition-colors"
                      >
                        {secondaryCta.label}
                      </Link>
                    ) : (
                      <a
                        href={secondaryCta.href ?? "#"}
                        className="text-navy font-semibold text-sm underline underline-offset-4 decoration-navy/40 hover:decoration-navy transition-colors"
                      >
                        {secondaryCta.label}
                      </a>
                    ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
