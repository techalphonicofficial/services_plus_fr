import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
  variant?: 'white' | 'tint' | 'navy';
}

export function Card({
  children,
  className,
  hoverLift = true,
  variant = 'white',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-2xl border transition-all duration-300 relative';

  const variantStyles = {
    white: 'bg-white border-sp-tint/80 shadow-sp-soft',
    tint: 'bg-sp-tint/40 border-sp-tint shadow-2xs',
    navy: 'bg-sp-navy border-sp-sky/20 text-white shadow-xl',
  };

  const liftStyles = hoverLift
    ? 'hover:shadow-sp-lift hover:-translate-y-1 hover:border-sp-primary/30'
    : '';

  return (
    <div
      className={twMerge(clsx(baseStyles, variantStyles[variant], liftStyles, className))}
      {...props}
    >
      {children}
    </div>
  );
}
