import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import logoMark from "../../assets/logo-treemate.png";
interface TreemateLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "navy" | "white";
  wordmarkCase?: "upper" | "brand";
  className?: string;
  asLink?: boolean;
}
const sizeMap = {
  sm: { mark: "h-7", text: "text-[18px]", gap: "gap-2.5" },
  md: { mark: "h-9", text: "text-[22px]", gap: "gap-3" },
  lg: { mark: "h-12", text: "text-3xl", gap: "gap-3.5" },
};
export function TreemateLogo({
  size = "md",
  variant = "navy",
  wordmarkCase = "upper",
  className,
  asLink = true,
}: TreemateLogoProps) {
  const s = sizeMap[size];
  const isWhite = variant === "white";
  const wordmark = wordmarkCase === "upper" ? "TREEMATE" : "Treemate";
  const content = (
    <span className={cn("flex items-center", s.gap, className)}>
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className={cn(
          s.mark,
          "w-auto shrink-0",
          isWhite && "brightness-0 invert",
        )}
      />
      <span
        className={cn(
          "font-heading font-semibold leading-none",
          s.text,
          wordmarkCase === "upper" && "tracking-[0.14em]",
          isWhite ? "text-white" : "text-navy",
        )}
      >
        {wordmark}
      </span>
    </span>
  );
  if (!asLink) return content;
  return (
    <Link to="/" aria-label="Treemate home" className="group inline-flex">
      {content}
    </Link>
  );
}
