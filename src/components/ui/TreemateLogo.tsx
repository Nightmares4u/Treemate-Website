import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import logoMark from "../../assets/logo-treemate.png";
interface TreemateLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "navy" | "white";
  wordmarkCase?: "upper" | "brand" | "simple";
  className?: string;
  asLink?: boolean;
}
const sizeMap = {
  sm: { mark: "h-7", text: "text-[17px] md:text-[18px]", gap: "gap-2" },
  md: { mark: "h-[30px] md:h-[34px]", text: "text-[20px] md:text-[23px]", gap: "gap-2.5" },
  lg: { mark: "h-10 md:h-12", text: "text-[26px] md:text-[30px]", gap: "gap-3" },
};
export function TreemateLogo({
  size = "md",
  variant = "navy",
  wordmarkCase = "simple",
  className,
  asLink = true,
}: TreemateLogoProps) {
  const s = sizeMap[size];
  const isWhite = variant === "white";

  const renderWordmark = () => {
    if (wordmarkCase === "upper") {
      return (
        <span
          className={cn(
            "font-heading font-semibold leading-none tracking-[0.14em]",
            s.text,
            isWhite ? "text-white" : "text-navy",
          )}
        >
          TREEMATE
        </span>
      );
    }

    return (
      <span
        className={cn(
          "font-heading font-semibold leading-none tracking-[0.03em] inline-block",
          s.text,
        )}
      >
        <span className={isWhite ? "text-white" : "text-navy"}>Tree</span>
        <span className={isWhite ? "text-teal-light" : "text-teal"}>mate</span>
      </span>
    );
  };

  const content = (
    <span className={cn("flex items-end", s.gap, className)}>
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className={cn(
          s.mark,
          "w-auto shrink-0 block",
          isWhite && "brightness-0 invert",
        )}
      />
      <span className="leading-none pb-[1px]">
        {renderWordmark()}
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
