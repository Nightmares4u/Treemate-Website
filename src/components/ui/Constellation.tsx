import { useRef, useEffect } from "react";
import { cn } from "../../lib/cn";

interface ConstellationProps {
  className?: string;
  nodeCount?: number;
  opacity?: number;
}

export function Constellation({
  className,
  nodeCount = 20,
  opacity = 0.5,
}: ConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const init = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      const maxDist = Math.min(w, h) * 0.3;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const a = (1 - dist / maxDist) * opacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(13,148,136,${a})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,148,136,${opacity * 0.65})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    init();
    draw();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [nodeCount, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 w-full h-full", className)}
      aria-hidden="true"
    />
  );
}