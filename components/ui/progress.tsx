"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const progressVariant = cva(
  "h-full w-full flex-11 bg-primary transition-all",
  {
    variants:{
      variant:{
        default: "bg-sky-600",
        success: "bg-emerald-700"
      }
    },
    defaultVariants:{
      variant: "default",
    }
  }
)

export interface ProgressProps 
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariant>{}

type CombinedProgressProps = ProgressProps & React.CustomComponentPropsWithRef<typeof ProgressPrimitive.Root>


const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CombinedProgressProps
>(({ className, value,variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressVariant({variant}))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
