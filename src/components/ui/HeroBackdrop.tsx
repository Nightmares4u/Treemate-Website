import { MarkerAccent } from "./MarkerAccent";

/** Rotations of the same ellipse, drawn as a rosette. */
const LOOP_ROTATIONS = [0, 30, 60, 90, 120, 150];

/**
 * Background layer for the upper-right of a PageHero, where a headline that
 * wraps short leaves a large gap. Everything here is decorative and sits behind
 * the content: a mint bloom, a rosette drawn in the same 1px teal curves as
 * BackgroundSpirals, and a couple of marker accents.
 *
 * The rosette bleeds off the right edge the way BackgroundSpirals does, so it
 * reads as part of the backdrop on a tall hero (About) and does not crowd the
 * copy on a short one (Contact). Only strokes live here — nothing solid, since
 * a filled shape drifting behind a paragraph reads as a mistake.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block overflow-hidden"
    >
      <div className="absolute -top-32 -right-24 w-[460px] h-[460px] rounded-full bg-mint blur-[130px] opacity-50 animate-blob-drift" />

      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-16 -right-[140px] w-[420px] h-[420px] xl:w-[480px] xl:h-[480px] opacity-[0.24] animate-aurora"
      >
        {LOOP_ROTATIONS.map((angle) => (
          <ellipse
            key={angle}
            cx="200"
            cy="200"
            rx="176"
            ry="72"
            stroke="#0D9488"
            strokeWidth="1"
            transform={`rotate(${angle} 200 200)`}
          />
        ))}
        <circle
          cx="200"
          cy="200"
          r="118"
          stroke="#0D9488"
          strokeWidth="1"
          strokeDasharray="3 9"
          opacity="0.7"
        />
      </svg>

      <MarkerAccent
        variant="star"
        className="absolute right-[3%] top-[8%] w-9 h-9 opacity-45"
        color="#0D9488"
        rotate={18}
      />
      <MarkerAccent
        variant="scribble"
        className="absolute right-[6%] bottom-[14%] w-14 h-10 opacity-30"
        color="#0D9488"
        rotate={-12}
      />
    </div>
  );
}
