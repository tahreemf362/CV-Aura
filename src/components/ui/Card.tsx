import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glass = false,
  hoverable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 ${
        glass 
          ? 'glass shadow-lg shadow-slate-100/10 dark:shadow-slate-950/20' 
          : 'bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800'
      } ${
        hoverable 
          ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-aura-500/5 dark:hover:shadow-aura-500/10' 
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;
