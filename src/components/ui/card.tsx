import {forwardRef, HTMLAttributes} from "react"

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className = "", ...props}, ref) => <div
  ref={ref}
  className={`rounded-lg border bg-zinc-100 dark:bg-zinc-800 text-neutral-800 dark:text-neutral-100 shadow-sm ${className}`}
  {...props}
/>)

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className = "", ...props}, ref) => <div
  ref={ref}
  className={`flex flex-col space-y-1.5 p-6 ${className}`}
  {...props}
/>)

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(({className = "", ...props}, ref) => <h3
  ref={ref}
  className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  {...props}
/>)

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({className = "", ...props}, ref) => <p
  ref={ref}
  className={`text-sm text-neutral-500 dark:text-neutral-300 ${className}`}
  {...props}
/>)

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className = "", ...props}, ref) => <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />)

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({className = "", ...props}, ref) => <div
  ref={ref}
  className={`flex items-center p-6 pt-0 ${className}`}
  {...props}
/>)

export {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent}