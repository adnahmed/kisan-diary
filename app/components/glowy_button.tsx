import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { cx } from "~/helpers/form";

interface GlowyButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  glowColor?: string;
}

export default function GlowyButton({ 
  className, 
  children, 
  glowColor = "primary",
  ...props 
}: GlowyButtonProps) {
  return (
    <button
      className={cx(
        "relative px-6 py-3 font-bold text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group overflow-hidden",
        "bg-gradient-to-r from-primary-600 to-primary-500",
        "shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Glare effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
    </button>
  );
}
