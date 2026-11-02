import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function RegistrationMarks({ variant = "white" }) {
  const markColor =
    variant === "navy"
      ? "text-sp-sky/25 group-hover/card:text-sp-sky/60"
      : "text-sp-ink/15 group-hover/card:text-sp-accent/60";

  return (
    <div
      className={`pointer-events-none select-none transition-colors duration-200 ${markColor}`}
      aria-hidden="true"
    >
      <span className="absolute top-2 left-2.5 text-[10px] leading-none font-sans font-normal">
        +
      </span>
      <span className="absolute top-2 right-2.5 text-[10px] leading-none font-sans font-normal">
        +
      </span>
      <span className="absolute bottom-2 left-2.5 text-[10px] leading-none font-sans font-normal">
        +
      </span>
      <span className="absolute bottom-2 right-2.5 text-[10px] leading-none font-sans font-normal">
        +
      </span>
    </div>
  );
}

function Card({
  children,
  className,
  hoverLift = true,
  marks = true,
  variant = "white",
  ...props
}) {
  // Radius system: 16px (rounded-sp-md) for cards, 1px hairline border, 2px lift on hover, border to primary
  const baseStyles =
    "group/card rounded-sp-md border transition-all duration-300 ease-out relative";

  const variantStyles = {
    white: "bg-white border-sp-border shadow-sp-soft",
    tint: "bg-sp-tint/20 border-sp-border-strong",
    navy: "bg-sp-navy border-sp-sky/20 text-white shadow-sp-lift"
  };

  const liftStyles = hoverLift
    ? "hover:shadow-sp-lift hover:-translate-y-[2px] hover:border-sp-accent/45"
    : "";

  return (
    <div
      className={twMerge(clsx(baseStyles, variantStyles[variant], liftStyles, className))}
      {...props}
    >
      {marks && <RegistrationMarks variant={variant} />}
      {children}
    </div>
  );
}

export { Card, RegistrationMarks };
