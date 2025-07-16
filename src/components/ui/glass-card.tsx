import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'soft' | 'strong';
  hover?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/40 border-white/20 backdrop-blur-md',
      soft: 'bg-white/60 border-white/30 backdrop-blur-sm',
      strong: 'bg-white/20 border-white/10 backdrop-blur-lg'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl border shadow-glass transition-all duration-500',
          variants[variant],
          hover && 'hover:bg-white/50 hover:shadow-glow hover:scale-[1.02]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };