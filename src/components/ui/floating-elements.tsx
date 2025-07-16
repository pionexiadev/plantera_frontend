import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementsProps {
  className?: string;
  count?: number;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  className, 
  count = 8 
}) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full opacity-20",
            i % 3 === 0 && "bg-gradient-to-br from-primary-200 to-primary-300 w-32 h-32 animate-float",
            i % 3 === 1 && "bg-gradient-to-br from-accent-200 to-accent-300 w-24 h-24 animate-bounce-gentle",
            i % 3 === 2 && "bg-gradient-to-br from-primary-100 to-primary-200 w-40 h-40 animate-pulse-soft"
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export { FloatingElements };