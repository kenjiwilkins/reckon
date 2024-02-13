import React from 'react';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

const primaryButtonClasses = cva(['h-14', 'w-full', 'rounded', 'font-bold', 'text-white'], {
  variants: {
    variant: {
      primary: 'bg-blue-600',
      secondary: 'bg-gray-200'
    }
  }
});

export type PrimaryButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof primaryButtonClasses> & { children?: React.ReactNode };

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ className, children, ...props }) => {
  const classes = clsx(primaryButtonClasses(props), className);
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
