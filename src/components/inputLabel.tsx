import React from 'react';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

const inputLabelClasses = cva(['text-sm', 'flex', 'justify-start'], {
  variants: {
    variant: {
      default: 'text-gray-400',
      focus: 'text-blue-600',
      error: 'text-red-600'
    }
  }
});

export type InputLabelProps = React.ComponentProps<'label'> &
  VariantProps<typeof inputLabelClasses> & { children?: React.ReactNode };

export const InputLabel: React.FC<InputLabelProps> = ({ className, children, ...props }) => {
  const classes = clsx(inputLabelClasses(props), className);
  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
};
