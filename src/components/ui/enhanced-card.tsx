import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from './glass-card';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'floating';
  hover?: boolean;
  glow?: boolean;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant = 'default', hover = true, glow = false, children, ...props }, ref) => {
    const baseClasses = 'rounded-3xl transition-all duration-500 border';
    
    const variants = {
      default: 'bg-card border-border shadow-card',
      glass: '', // Will use GlassCard component
      gradient: 'bg-gradient-card border-white/20 shadow-card',
      floating: 'bg-white border-border shadow-card-hover hover:shadow-glow'
    };

    const hoverClasses = hover ? 'hover:scale-[1.02] hover:shadow-card-hover' : '';
    const glowClasses = glow ? 'shadow-glow hover:shadow-accent-glow animate-glow' : '';

    if (variant === 'glass') {
      return (
        <GlassCard
          ref={ref}
          className={cn(
            baseClasses,
            hoverClasses,
            glowClasses,
            className
          )}
          {...props}
        >
          {children}
        </GlassCard>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          hoverClasses,
          glowClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EnhancedCard.displayName = 'EnhancedCard';

export { EnhancedCard };