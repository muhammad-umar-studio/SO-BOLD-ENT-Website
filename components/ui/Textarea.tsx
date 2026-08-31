'use client';

import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  id,
  className = '',
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block font-body text-label-caps text-silver-leaf uppercase tracking-[0.15em] mb-2"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={`w-full bg-transparent border-b border-surface-variant focus:border-primary text-primary font-body text-body-lg py-2 transition-colors outline-none resize-none placeholder:text-surface-variant ${
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
