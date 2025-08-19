/* eslint-disable react-refresh/only-export-components */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-point-900 rounded-md font-semibold disabled:pointer-events-none disabled:text-point-600 disabled:bg-gray-200 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-point-400 hover:bg-point-500',
        white: 'bg-white hover:bg-point-200',
        light: 'bg-point-200 hover:bg-point-400',
      },
      size: {
        default: 'px-4 py-4 text-xl leading-1.5',
        sm: 'px-3 py-1.5 text-sm',
        lg: 'px-6 py-3 text-lg',
        icon: 'w-9 h-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
