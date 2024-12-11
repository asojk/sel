import * as React from 'react'

import { cn } from '../../lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-9 w-full rounded-md border border-n-4 bg-transparent px-3 py-1 text-base text-n-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-n-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-s disabled:cursor-not-allowed disabled:opacity-50 dark:border-p-3 dark:text-white dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-p-light md:text-sm',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'

export { Input }
