import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  showPlus = false,
  external = false,
  disabled,
  ...props
}) {
  // Buttons: 48px (h-12), radius 12 (rounded-sp-btn), subtle inner highlight,
  // clear pressed and focus states (3px focus ring), "+" rotates 90deg on hover, nowrap always.
  const baseStyles =
    "group inline-flex items-center justify-center font-sans font-medium whitespace-nowrap shrink-0 transition-all duration-200 rounded-sp-btn focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sp-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-y-[1px] active:scale-[0.99] select-none";

  const sizeStyles = {
    sm: "h-10 text-sm px-4 gap-2",
    md: "h-12 text-sm px-5 gap-2",
    lg: "h-12 text-[15px] px-6 gap-2.5"
  };

  const variantStyles = {
    primary:
      "bg-sp-navy text-white hover:bg-sp-primary border border-sp-navy hover:border-sp-primary shadow-sp-btn-primary",
    secondary:
      "bg-sp-bg text-sp-ink hover:bg-sp-tint/30 border border-sp-border-strong font-semibold shadow-sp-btn-outline",
    outline:
      "bg-white text-sp-ink hover:text-sp-primary border border-sp-border-strong hover:border-sp-primary/45 hover:bg-sp-bg shadow-sp-btn-outline",
    ghost: "text-sp-slate hover:text-sp-ink hover:bg-sp-bg",
    navy: "bg-white/10 text-white hover:bg-white/15 border border-white/20 shadow-sp-btn-primary"
  };

  const combinedClassName = twMerge(
    clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
  );

  const content = (
    <>
      <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
      {showPlus && (
        <span
          className="inline-flex items-center justify-center w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-90 text-base font-semibold leading-none text-current"
          aria-hidden="true"
        >
          +
        </span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
          {...props}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {content}
    </button>
  );
}

export { Button };
