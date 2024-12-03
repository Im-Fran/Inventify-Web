import { forwardRef } from "react"
import { Label } from "@/components/ui/forms/label.tsx"
import clsx from "clsx"


export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label:string
  }

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, ...props }, ref) => {
    return (
      <div className="grid w-full gap-1.5">
        <Label htmlFor={id}>{label}</Label>
        <textarea
        className={clsx(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }