import { cx } from "~/utils/class-names";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverEffect = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cx(
        "backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-glass rounded-xl p-6",
        hoverEffect && "transition-transform hover:scale-[1.02] hover:shadow-glass-hover duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
