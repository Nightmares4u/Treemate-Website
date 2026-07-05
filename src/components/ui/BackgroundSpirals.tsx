import { cn } from "../../lib/cn";
interface BackgroundSpiralsProps {
  side?: "left" | "right" | "both";
  color?: string;
  opacity?: number;
  className?: string;
}
export function BackgroundSpirals({
  side = "both",
  color = "#0D9488",
  opacity = 0.2,
  className,
}: BackgroundSpiralsProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden z-0",
        className,
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      {(side === "left" || side === "both") && (
        <svg
          className="absolute top-[10%] -left-[150px] w-[600px] h-[800px]"
          viewBox="0 0 600 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 0 C 400 200, 500 500, 100 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 80 0 C 420 220, 540 520, 80 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 60 0 C 440 240, 580 540, 60 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 40 0 C 460 260, 620 560, 40 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 20 0 C 480 280, 660 580, 20 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 0 0 C 500 300, 700 600, 0 800"
            stroke={color}
            strokeWidth="1"
          />
        </svg>
      )}
      {(side === "right" || side === "both") && (
        <svg
          className="absolute top-[40%] -right-[150px] w-[600px] h-[800px]"
          viewBox="0 0 600 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 500 0 C 200 200, 100 500, 500 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 520 0 C 180 220, 60 520, 520 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 540 0 C 160 240, 20 540, 540 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 560 0 C 140 260, -20 560, 560 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 580 0 C 120 280, -60 580, 580 800"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 600 0 C 100 300, -100 600, 600 800"
            stroke={color}
            strokeWidth="1"
          />
        </svg>
      )}
    </div>
  );
}
