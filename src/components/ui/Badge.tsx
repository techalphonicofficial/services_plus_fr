import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'tint' | 'accent' | 'outline' | 'navy';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  className,
  variant = 'tint',
  size = 'md',
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-mono',
    md: 'text-xs px-3 py-1 gap-1.5 font-mono',
  };

  const variantStyles = {
    default: 'bg-sp-primary/10 text-sp-primary border border-sp-primary/20',
    tint: 'bg-sp-tint text-sp-primary border border-sp-tint/80',
    accent: 'bg-sp-accent/15 text-sp-accent border border-sp-accent/30',
    outline: 'bg-white text-sp-slate border border-sp-tint shadow-2xs',
    navy: 'bg-sp-navy text-sp-sky border border-sp-sky/30',
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
