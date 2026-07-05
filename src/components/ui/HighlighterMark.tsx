import { cn } from "../../lib/cn";
interface HighlighterMarkProps {
  color?: string;
  opacity?: number;
  rotate?: number;
  className?: string;
}
export function HighlighterMark({
  color = "#B8F0DC",
  opacity = 0.7,
  rotate = -1.2,
  className,
}: HighlighterMarkProps) {
  return (
    <svg
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className={cn("pointer-events-none select-none", className)}
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
      aria-hidden="true"
    >
      {}
      <path
        d="M 4 18
           Q 40 10, 78 12
           T 152 10
           Q 178 10, 196 14
           L 197 45
           Q 165 52, 130 50
           T 60 52
           Q 25 52, 3 48 Z"
        fill={color}
      />
      {}
      <path
        d="M 8 22
           Q 50 16, 92 18
           T 172 16"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
