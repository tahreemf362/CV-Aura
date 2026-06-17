import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
}

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, textarea = false, rows = 3, className = '', ...props }, ref) => {
    const inputStyles = `w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-all duration-200 focus:border-aura-500 focus:ring-1 focus:ring-aura-500/50 outline-none text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 ${
      error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
    } ${className}`;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </label>
        )}
        {textarea ? (
          <textarea
            rows={rows}
            className={inputStyles}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className={inputStyles}
            ref={ref as React.Ref<HTMLInputElement>}
            {...props}
          />
        )}
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
