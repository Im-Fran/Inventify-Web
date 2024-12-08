import * as React from "react"
import {type VariantProps} from "class-variance-authority"
import clsx from 'clsx'
import {badgeVariants} from "@/components/ui/badge/badgeVariants.ts";

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

const Badge = ({className, variant, ...props}: BadgeProps) => <div className={clsx(badgeVariants({variant}), className)} {...props} />;

export {Badge}
