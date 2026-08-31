'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block font-body text-label-caps text-silver-leaf uppercase tracking-[0.15em] mb-2 font-semibold"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full bg-transparent border-b border-surface-variant focus:border-primary text-primary font-body text-body-lg py-2 transition-colors outline-none placeholder:text-silver-leaf/60 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-red-400 font-body text-xs tracking-wider uppercase mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
}
