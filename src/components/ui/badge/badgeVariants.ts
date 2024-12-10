import {cva} from "class-variance-authority";

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
  variants: {
    variant: {
      default: "border-transparent bg-pink-500 text-pink-50 hover:bg-pink-500/80",
      secondary: "border-transparent bg-pink-700 text-pink-50 hover:bg-pink-700/80",
      destructive: "border-transparent bg-red-600 text-red-600-foreground hover:bg-red-600/80",
      success: "border-transparent bg-green-600 text-green-600-foreground hover:bg-green-600/80",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export {badgeVariants}