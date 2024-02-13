import React from 'react';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

const dividerClasses = cva(['my-2', 'h-1px'], {
  variants: {
    variant: {
      default: 'bg-gray-400',
      focus: 'bg-blue-600',
      error: 'bg-red-600'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export type DividerProps = React.ComponentProps<'div'> & VariantProps<typeof dividerClasses>;

export const Divider: React.FC<DividerProps> = ({ className, ...props }) => {
  const classes = clsx(dividerClasses(props), className);
  return <div className={classes} />;
};
