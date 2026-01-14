import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard = ({ children, className = "", onClick }: GlassCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`glass rounded-2xl p-6 shadow-glass hover:shadow-glass-hover transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
