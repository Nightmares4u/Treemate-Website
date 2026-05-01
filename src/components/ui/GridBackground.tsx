import { cn } from "../../lib/cn";

export function GridBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 -z-20", className)}>
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 0%, #000 70%, transparent 100%)',
        }}
      />
    </div>
  );
}
