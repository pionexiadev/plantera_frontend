
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorColor?: string;
  showGradient?: boolean;
  showStripes?: boolean;
  showAnimation?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value, 
  indicatorColor, 
  showGradient = false, 
  showStripes = false,
  showAnimation = false,
  ...props 
}, ref) => {
  // Generate dynamic gradient based on progress value
  const getGradientStyle = () => {
    if (!showGradient) return {};
    
    // Customize gradient based on growth stages
    return {
      backgroundImage: `linear-gradient(90deg, 
        #2E7D32 0%, 
        #7CB342 33%, 
        #FDD835 66%, 
        #E8A317 100%)`
    };
  };
  
  // Generate stripes for visual interest if requested
  const getStripesClass = () => {
    if (!showStripes) return "";
    
    // Add animation class if requested
    if (showAnimation) {
      return "bg-stripes animate-move-stripes";
    }
    
    return "bg-stripes";
  };

  // Get indicator color based on prop or default
  const getIndicatorClass = () => {
    if (indicatorColor) return indicatorColor;
    return "bg-primary";
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          getIndicatorClass(),
          getStripesClass()
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          ...getGradientStyle()
        }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
