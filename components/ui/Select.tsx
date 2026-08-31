'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
}

export default function Select({
  label,
  options,
  error,
  id,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block font-body text-label-caps text-silver-leaf uppercase tracking-[0.15em] mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={`w-full bg-transparent border-b border-surface-variant focus:border-primary text-primary font-body text-body-lg py-2 appearance-none transition-colors outline-none cursor-pointer pr-8 ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-surface text-primary"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
      </div>
      {error && (
        <span className="text-red-400 font-body text-xs tracking-wider uppercase mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
}
