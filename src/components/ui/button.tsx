import React from "react"
import {clsx} from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'light' | 'dark' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer"

  const variants = {
    default: 'bg-pink-600 text-neutral-100 border border-pink-600 hover:bg-transparent hover:text-pink-600',
    secondary: 'bg-neutral-700 text-neutral-100 border border-neutral-700 hover:bg-transparent hover:text-neutral-700',
    danger: 'bg-red-600 text-neutral-100 border border-red-600 hover:bg-transparent hover:text-red-600',
    warning: 'bg-yellow-600 text-neutral-100 border border-yellow-600 hover:bg-transparent hover:text-yellow-600',
    success: 'bg-green-600 text-neutral-100 border border-green-600 hover:bg-transparent hover:text-green-600',
    info: 'bg-blue-600 text-neutral-100 border border-blue-600 hover:bg-transparent hover:text-blue-600',
    light: 'bg-neutral-100 text-neutral-800 border border-neutral-100 hover:bg-neutral-200',
    dark: 'bg-neutral-800 text-neutral-100 border border-neutral-800 hover:bg-neutral-700',
    ghost: 'bg-transparent text-neutral-800 border border-transparent hover:bg-neutral-100',
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