
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:scale-105 group relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white shadow-card hover:shadow-card-hover before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-card hover:shadow-card-hover hover:from-red-600 hover:to-red-700",
        outline: "border-2 border-primary-300/50 bg-white/80 text-plantera-green shadow-soft hover:bg-primary-50 hover:border-primary-400 backdrop-blur-sm",
        secondary: "bg-gradient-to-r from-primary-100 to-primary-200 text-plantera-darkGreen shadow-soft hover:from-primary-200 hover:to-primary-300",
        ghost: "hover:bg-primary-100/80 text-plantera-green hover:text-plantera-darkGreen backdrop-blur-sm",
        link: "text-plantera-green underline-offset-4 hover:underline decoration-2 decoration-primary-400",
        glass: "bg-gradient-glass border border-white/30 text-plantera-darkGreen shadow-glass backdrop-blur-md hover:bg-white/90",
        gradient: "bg-gradient-sunset text-plantera-darkGreen shadow-glow-accent hover:shadow-glow-accent animate-shimmer bg-size-200",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-10 text-base",
        icon: "h-12 w-12 rounded-2xl",
        xs: "h-8 px-3 text-xs rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
