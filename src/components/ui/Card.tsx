import * as React from "react";
import { cn } from "../../lib/cn";
import { GradientBorder } from "./GradientBorder";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <GradientBorder containerClassName={className}>
      <div 
        className={cn("p-8 h-full flex flex-col bg-surface/50 backdrop-blur-xl", className)} 
        {...props}
      >
        {children}
      </div>
    </GradientBorder>
  );
}
