import React from "react"
import {clsx} from "clsx";
import {VariantProps} from "class-variance-authority";
import {buttonVariants} from "@/components/ui/button/buttonVariants.ts";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => <button
  className={clsx([buttonVariants({variant, size}), className])}
  ref={ref}
  {...props}
/>)