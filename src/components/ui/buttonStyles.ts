import { cn } from "../../lib/cn";
export type ButtonVariant =
  "primary" | "secondary" | "ghost" | "outline" | "white" | "teal";
export type ButtonSize = "sm" | "md" | "lg";
const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "relative overflow-hidden",
    "bg-navy text-white border-0",
    "shadow-sm hover:shadow-md hover:bg-navy-light",
  ),
  secondary: cn(
    "bg-surface text-ink",
    "border border-ink/15",
    "hover:bg-ink/[0.04] hover:border-ink/25",
    "shadow-sm",
  ),
  ghost: cn(
    "bg-transparent text-ink/70",
    "hover:bg-ink/[0.06] hover:text-ink",
  ),
  outline: cn(
    "bg-transparent text-ink",
    "border border-ink/25",
    "hover:border-ink/50 hover:bg-ink/[0.04]",
  ),
  white: cn(
    "bg-white text-navy border-0",
    "shadow-sm hover:shadow-md hover:bg-slate-50",
  ),
  teal: cn(
    "bg-teal text-white border-0",
    "shadow-sm hover:shadow-md hover:bg-teal-light",
  ),
};
const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-[52px] px-8 text-base gap-2.5",
};
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center rounded-xl font-semibold font-body",
    "transition-all duration-300 ease-out-expo",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "select-none whitespace-nowrap cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}
