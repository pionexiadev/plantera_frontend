import React from 'react';
import { cn } from '@/lib/utils';

interface CultureProgressBarProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'growth' | 'health' | 'irrigation' | 'default';
  striped?: boolean;
  animated?: boolean;
}

export function CultureProgressBar({
  value,
  label,
  size = 'md',
  colorScheme = 'default',
  striped = false,
  animated = false,
}: CultureProgressBarProps) {
  const width = Math.max(0, Math.min(100, value)); // Clamp between 0 and 100

  const getProgressColor = () => {
    switch (colorScheme) {
      case 'growth':
        return 'bg-gradient-to-r from-blue-500 via-green-500 to-amber-500';
      case 'health':
        return width > 80
          ? 'bg-green-500'
          : width > 50
          ? 'bg-amber-500'
          : 'bg-red-500';
      case 'irrigation':
        return width > 70
          ? 'bg-blue-500'
          : width > 40
          ? 'bg-amber-500'
          : 'bg-red-500';
      default:
        return 'bg-plantera-green';
    }
  };

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-plantera-green/70">{label}</span>
          <span className="text-xs font-medium text-plantera-green">{width}%</span>
        </div>
      )}
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", sizeClasses[size])}>
        <div
          className={cn(
            getProgressColor(),
            sizeClasses[size],
            "rounded-full transition-all duration-300",
            striped && "bg-stripes",
            animated && "animate-progress"
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
