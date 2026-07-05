import { cn } from "../../lib/cn";
type MarkerVariant =
  | "underline"
  | "underline-double"
  | "circle"
  | "star"
  | "arrow"
  | "zigzag"
  | "scribble";
interface MarkerAccentProps {
  variant?: MarkerVariant;
  className?: string;
  color?: string;
  rotate?: number;
  strokeWidth?: number;
  strokeLinecap?: "round" | "butt" | "square";
}
export function MarkerAccent({
  variant = "underline",
  className,
  color = "#0D9488",
  rotate = 0,
  strokeWidth = 2.5,
  strokeLinecap = "round",
}: MarkerAccentProps) {
  const style = rotate ? { transform: `rotate(${rotate}deg)` } : undefined;
  const cls = cn("pointer-events-none select-none", className);
  const common = {
    fill: "none" as const,
    stroke: color,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin: "round" as const,
  };
  switch (variant) {
    case "underline":
      return (
        <svg
          viewBox="0 0 220 22"
          className={cls}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 5 12 Q 25 3, 45 12 T 85 12 T 125 12 T 165 12 T 210 10"
            {...common}
          />
        </svg>
      );
    case "underline-double":
      return (
        <svg
          viewBox="0 0 220 30"
          className={cls}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 5 10 Q 25 2, 50 10 T 100 10 T 155 10 T 215 8"
            {...common}
          />
          <path
            d="M 15 22 Q 45 15, 75 22 T 140 22 T 205 20"
            {...common}
            strokeWidth={strokeWidth * 0.85}
          />
        </svg>
      );
    case "circle":
      return (
        <svg
          viewBox="0 0 140 90"
          className={cls}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {}
          <path
            d="M 70 10
               C 110 8, 132 30, 128 55
               C 122 78, 78 84, 42 80
               C 12 74, 5 42, 25 22
               C 45 8, 78 8, 95 12"
            {...common}
          />
          <path
            d="M 92 14
               C 118 20, 128 42, 122 62
               C 112 82, 65 82, 40 74"
            {...common}
            strokeWidth={strokeWidth * 0.75}
          />
        </svg>
      );
    case "star":
      return (
        <svg
          viewBox="0 0 44 44"
          className={cls}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {}
          <path d="M 22 4 L 22 40" {...common} />
          <path d="M 4 22 L 40 22" {...common} />
          <path d="M 9 9 L 35 35" {...common} />
          <path d="M 35 9 L 9 35" {...common} />
          <path
            d="M 22 12 Q 26 22, 22 32"
            {...common}
            strokeWidth={strokeWidth * 0.7}
          />
        </svg>
      );
    case "arrow":
      return (
        <svg
          viewBox="0 0 100 60"
          className={cls}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {}
          <path d="M 6 50 Q 30 10, 55 30 T 88 22" {...common} />
          {}
          <path d="M 88 22 L 78 18" {...common} />
          <path d="M 88 22 L 82 32" {...common} />
        </svg>
      );
    case "zigzag":
      return (
        <svg
          viewBox="0 0 120 24"
          className={cls}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 5 18 L 20 6 L 35 18 L 50 6 L 65 18 L 80 6 L 95 18 L 115 8"
            {...common}
          />
        </svg>
      );
    case "scribble":
      return (
        <svg
          viewBox="0 0 90 60"
          className={cls}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {}
          <path
            d="M 10 30 C 15 10, 55 8, 70 25
               C 78 40, 45 55, 30 40
               C 22 30, 40 20, 55 28
               C 65 34, 55 46, 42 42"
            {...common}
          />
        </svg>
      );
  }
}
