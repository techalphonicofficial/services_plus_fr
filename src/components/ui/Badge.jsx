import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function Badge({
  children,
  className,
  variant = "tint",
  size = "md",
  ...props
}) {
  // Clean editorial tag — no pill badges with dots, no monospace micro-labels
  const baseStyles =
    "inline-flex items-center font-sans font-medium rounded-sp-sm whitespace-nowrap";

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 gap-1.5",
    md: "text-xs px-3 py-1 gap-1.5"
  };

  const variantStyles = {
    default: "bg-sp-primary/8 text-sp-primary border border-sp-border",
    tint: "bg-sp-tint/70 text-sp-primary border border-sp-border",
    accent: "bg-sp-accent/10 text-sp-primary border border-sp-accent/25",
    outline: "bg-white text-sp-slate border border-sp-border",
    navy: "bg-sp-navy text-sp-sky border border-sp-sky/25"
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
