
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-soft hover:shadow-card animate-scale-in",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gradient-primary text-white hover:scale-105 shadow-glow",
        secondary: "border-transparent bg-gradient-field text-plantera-darkGreen hover:scale-105",
        destructive: "border-transparent bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105",
        outline: "border-primary-300 text-plantera-green bg-white/80 backdrop-blur-sm hover:bg-primary-50 hover:border-primary-400",
        success: "border-transparent bg-gradient-growth text-white hover:scale-105 shadow-glow",
        warning: "border-transparent bg-gradient-sunset text-plantera-darkGreen hover:scale-105 shadow-glow-accent",
        info: "border-transparent bg-gradient-ocean text-white hover:scale-105",
        glass: "border-white/30 bg-gradient-glass text-plantera-darkGreen backdrop-blur-md hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
