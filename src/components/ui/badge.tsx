import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center select-none pointer-events-none uppercase rounded-full border px-2.5 py-0.5 text-xs font-medium font-mono tracking-wider transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-[#FFEC40] bg-[#474402] text-[#FFEC40]",
        solid:
          "border-[#FFEC40] bg-[#474402] text-[#FFEC40]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline:
          "border-black/20 bg-transparent text-black/60",
        ghost:
          "border-transparent bg-black/5 text-black/60",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
