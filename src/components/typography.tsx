import React from 'react';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

const typographyClasses = cva([], {
  variants: {
    variant: {
      heading1: 'text-4xl font-bold',
      heading2: 'text-3xl font-bold',
      heading3: 'text-2xl font-bold',
      heading4: 'text-xl font-bold',
      heading5: 'text-lg font-bold',
      heading6: 'text-base font-bold',
      body1: 'text-base',
      body2: 'text-sm',
      caption: 'text-xs',
      overline: 'text-xs uppercase',
      code: 'text-xs bg-gray-200 p-1 rounded font-mono'
    },
    color: {
      default: 'text-black',
      primary: 'text-blue-600',
      secondary: 'text-gray-400',
      error: 'text-red-600'
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    },
    decoration: {
      none: 'no-underline',
      underline: 'underline'
    },
    transform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize'
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold'
    },
    italic: {
      normal: 'italic',
      reverse: 'not-italic'
    }
  },
  defaultVariants: {
    variant: 'body1',
    color: 'default',
    align: 'left',
    decoration: 'none',
    transform: 'none',
    weight: 'normal'
  }
});

export type TypographyProps = React.ComponentProps<'p' | 'h1'> &
  VariantProps<typeof typographyClasses> & { children?: React.ReactNode };

const Text: React.FC<TypographyProps> = ({ className, children, ...props }) => {
  const classes = clsx(typographyClasses(props), className);
  if (props.variant === 'heading1') {
    return (
      <h1 className={classes} {...props}>
        {children}
      </h1>
    );
  } else if (props.variant === 'heading2') {
    return (
      <h2 className={classes} {...props}>
        {children}
      </h2>
    );
  } else if (props.variant === 'heading3') {
    return (
      <h3 className={classes} {...props}>
        {children}
      </h3>
    );
  } else if (props.variant === 'heading4') {
    return (
      <h4 className={classes} {...props}>
        {children}
      </h4>
    );
  } else if (props.variant === 'heading5') {
    return (
      <h5 className={classes} {...props}>
        {children}
      </h5>
    );
  } else if (props.variant === 'heading6') {
    return (
      <h6 className={classes} {...props}>
        {children}
      </h6>
    );
  } else {
    return (
      <p className={classes} {...props}>
        {children}
      </p>
    );
  }
};

export const Typography: React.FC<TypographyProps> = ({ className, children, ...props }) => {
  return (
    <Text className={className} {...props}>
      {children}
    </Text>
  );
};
