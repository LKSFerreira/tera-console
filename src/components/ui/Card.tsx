import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`min-w-0 rounded-xl border border-slate-800/60 bg-slate-900/50 p-4 shadow-xl backdrop-blur-sm sm:p-6 ${className}`}>
    {children}
  </div>
);
