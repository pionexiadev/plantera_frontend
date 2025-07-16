import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full bg-primary animate-bounce',
            sizeClasses[size]
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );
};

export { LoadingDots };