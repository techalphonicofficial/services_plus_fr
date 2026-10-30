import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  showPlus?: boolean;
  external?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  showPlus = false,
  external = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'group inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sp-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-sm',
  };

  const variantStyles = {
    primary:
      'bg-sp-primary text-white hover:bg-sp-primary-600 shadow-sm hover:shadow-sp-soft',
    secondary:
      'bg-sp-tint text-sp-primary hover:bg-sp-tint/80 border border-sp-tint font-semibold',
    outline:
      'bg-white text-sp-ink hover:text-sp-primary border border-sp-tint hover:border-sp-primary/40 hover:bg-sp-bg shadow-2xs',
    ghost:
      'text-sp-slate hover:text-sp-primary hover:bg-sp-tint/40',
    navy:
      'bg-sp-navy text-white hover:bg-sp-deep-1 border border-sp-sky/20 shadow-md',
  };

  const combinedClassName = twMerge(
    clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
  );

  const content = (
    <>
      <span>{children}</span>
      {showPlus && (
        <span
          className="inline-block transition-transform duration-300 group-hover:rotate-90 font-mono text-sm font-bold text-inherit"
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
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
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
