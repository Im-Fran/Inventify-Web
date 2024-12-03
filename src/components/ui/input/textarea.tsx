import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/forms/label.tsx"

export function TextareaComponent() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  )
}