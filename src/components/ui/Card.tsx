import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 backdrop-blur-sm shadow-xl ${className}`}>
    {children}
  </div>
);
