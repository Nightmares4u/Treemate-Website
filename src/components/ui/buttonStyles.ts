import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "white";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "relative overflow-hidden",
    "bg-navy text-white border-0",
    "shadow-sm hover:shadow-md hover:bg-navy-light",
  ),
  secondary: cn(
    "bg-white text-navy",
    "border border-slate-200",
    "hover:bg-slate-50 hover:border-slate-300",
    "shadow-sm",
  ),
  ghost: cn("bg-transparent text-slate-600", "hover:bg-slate-100 hover:text-navy"),
  outline: cn(
    "bg-transparent text-navy",
    "border border-slate-300",
    "hover:border-navy hover:bg-slate-50",
  ),
  white: cn("bg-white text-navy border-0", "shadow-sm hover:shadow-md hover:bg-slate-50"),
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
    "inline-flex items-center justify-center rounded-full font-semibold font-body",
    "transition-all duration-300 ease-out-expo",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "select-none whitespace-nowrap cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}
