import { ReactNode } from 'react';

interface WarmGlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function WarmGlassCard({ children, className = '', hover = true }: WarmGlassCardProps) {
  return (
    <div
      className={`rounded-[20px] transition-all duration-300 ${
        hover ? 'hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(245,143,124,0.2)]' : ''
      } ${className}`}
      style={{
        background: 'rgba(44, 43, 48, 0.7)',
        backdropFilter: 'blur(20px) saturate(160%)',
        border: '1px solid rgba(240, 237, 232, 0.08)',
        borderTop: '2px solid rgba(245, 143, 124, 0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,143,124,0.08)',
      }}
    >
      {children}
    </div>
  );
}
