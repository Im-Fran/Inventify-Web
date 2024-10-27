import React from "react"
import {clsx} from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer"

  const variants = {
    default: "bg-pink-600 text-primary-foreground hover:bg-pink-600/70",
    destructive: "bg-red-600 text-primary-foreground hover:bg-red-600/70",
    success: "bg-green-600 text-primary-foreground hover:bg-green-600/70",
    warning: "bg-yellow-600 text-primary-foreground hover:bg-yellow-600/70",
    info: "bg-blue-600 text-primary-foreground hover:bg-blue-600/70",
    outline: "border border-neutral-300 text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-700 hover:bg-neutral-50",
    secondary: "bg-neutral-700 text-neutral-100 hover:bg-neutral-600",
    ghost: "text-neutral-700 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700",
    link: "text-red-600 hover:text-red-700 decoration-transparent hover:decoration-red-600 transform underline underline-offset-0 transition-all duration-300 hover:underline hover:underline-offset-4"
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return <button
    className={clsx([
      baseStyles,
      variants[variant],
      sizes[size],
      className
    ])}
    ref={ref}
    {...props}
  />
})

Button.displayName = "Button"

export { Button }