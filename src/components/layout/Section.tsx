import * as React from "react";
import { cn } from "../../lib/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
  id?: string;
}

export function Section({ className, containerClass, children, id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-32 relative", className)}
      {...props}
    >
      {children}
    </section>
  );
}
