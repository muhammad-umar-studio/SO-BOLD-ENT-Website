'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  children,
  icon,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-body text-label-caps uppercase tracking-[0.15em] py-4 px-8 border transition-all duration-300 flex items-center justify-center gap-3 relative group overflow-hidden active:scale-[0.98] cursor-pointer';

  const variants = {
    primary:
      'bg-primary text-onyx-black border-primary hover:bg-onyx-black hover:text-primary',
    outline:
      'bg-transparent text-primary border-surface-variant hover:border-primary hover:text-primary',
    ghost:
      'bg-transparent text-silver-leaf border-transparent hover:text-primary hover:border-surface-variant',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? 'w-full' : 'w-max'
      } ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {icon && (
          <span className="transition-transform group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
}
