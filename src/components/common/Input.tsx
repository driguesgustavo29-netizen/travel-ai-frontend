import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input
      className={clsx(
        'rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all',
        error && 'border-red-500',
        className,
      )}
      {...props}
    />
    {error && <span className="text-sm text-red-500">{error}</span>}
  </div>
);
