import * as React from "react";
import { Link } from "react-router-dom";
import {
  buttonClasses,
  type ButtonVariant,
  type ButtonSize,
} from "./buttonStyles";
interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
interface InternalLinkProps extends BaseProps {
  to: string;
  href?: never;
}
interface ExternalLinkProps extends BaseProps {
  href: string;
  to?: never;
  external?: boolean;
}
type LinkButtonProps = InternalLinkProps | ExternalLinkProps;
export function LinkButton(props: LinkButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    onClick,
  } = props;
  const classes = buttonClasses(variant, size, className);
  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={onClick}>
        <span className="relative z-10 flex items-center gap-[inherit]">
          {children}
        </span>
      </Link>
    );
  }
  const href = (props as ExternalLinkProps).href;
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="relative z-10 flex items-center gap-[inherit]">
        {children}
      </span>
    </a>
  );
}
