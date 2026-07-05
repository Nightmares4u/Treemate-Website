import { cn } from "../../lib/cn";
interface CornerMarksProps {
  corners?: Array<"tl" | "tr" | "bl" | "br">;
  color?: string;
  opacity?: number;
  size?: number;
  strokeWidth?: number;
  inset?: number;
  className?: string;
}
const cornerStyles: Record<
  "tl" | "tr" | "bl" | "br",
  (i: number) => React.CSSProperties
> = {
  tl: (i) => ({ top: i, left: i }),
  tr: (i) => ({ top: i, right: i, transform: "scaleX(-1)" }),
  bl: (i) => ({ bottom: i, left: i, transform: "scaleY(-1)" }),
  br: (i) => ({ bottom: i, right: i, transform: "scale(-1, -1)" }),
};
export function CornerMarks({
  corners = ["tl", "tr", "bl", "br"],
  color = "#0D9488",
  opacity = 0.5,
  size = 14,
  strokeWidth = 1.5,
  inset = -6,
  className,
}: CornerMarksProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      style={{ opacity }}
    >
      {corners.map((c) => (
        <svg
          key={c}
          className="absolute"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={cornerStyles[c](inset)}
        >
          {}
          <line
            x1={0}
            y1={strokeWidth / 2}
            x2={size}
            y2={strokeWidth / 2}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {}
          <line
            x1={strokeWidth / 2}
            y1={0}
            x2={strokeWidth / 2}
            y2={size}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  );
}
