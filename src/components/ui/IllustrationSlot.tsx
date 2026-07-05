import { cn } from "../../lib/cn";
interface IllustrationSlotProps {
  src?: string;
  alt: string;
  aspect?: string;
  filenameHint?: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}
export function IllustrationSlot({
  src,
  alt,
  aspect = "aspect-[3/2]",
  filenameHint,
  className,
  imgClassName,
  loading = "lazy",
}: IllustrationSlotProps) {
  if (src) {
    return (
      <div className={cn("relative w-full", aspect, className)}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className={cn("h-full w-full object-contain", imgClassName)}
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center",
        aspect,
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <span className="text-[10px] font-mono text-navy/25 tracking-tight">
        {filenameHint ?? "illustration"}
      </span>
    </div>
  );
}
