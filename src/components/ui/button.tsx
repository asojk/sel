import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'selected';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out',
          variant === 'default'
            ? 'bg-p-2 text-grey-6 hover:bg-p-3 hover:text-white'
            : 'bg-p text-white hover:bg-red active:bg-a-darker',
          'focus:outline-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };