import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'sunset' | 'ocean';
  animate?: boolean;
}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, variant = 'primary', animate = false, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-primary-600 to-primary-400',
      accent: 'bg-gradient-to-r from-accent-600 to-accent-400',
      sunset: 'bg-gradient-to-r from-orange-500 to-pink-500',
      ocean: 'bg-gradient-to-r from-blue-500 to-cyan-400'
    };

    return (
      <span
        ref={ref}
        className={cn(
          'bg-clip-text text-transparent font-bold',
          variants[variant],
          animate && 'animate-pulse',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

GradientText.displayName = 'GradientText';

export { GradientText };