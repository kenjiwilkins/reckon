import React from 'react';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

const textInputClasses = cva([
  'appearance-none',
  'w-full',
  'h-5',
  'box-border',
  'border-none',
  'text-base',
  'focus-visible:outline-transparent'
]);

export type TextInputProps = React.ComponentProps<'input'> & VariantProps<typeof textInputClasses>;

export const TextInput: React.FC<TextInputProps> = ({ className, ...props }) => {
  const classes = clsx(textInputClasses(), className);
  return <input className={classes} {...props} />;
};
