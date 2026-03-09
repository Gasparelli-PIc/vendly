import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface VendlyButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
}

export function VendlyButton({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  textClassName = '',
  disabled,
  ...props
}: VendlyButtonProps) {
  
  const baseClasses = "h-12 flex-row items-center justify-center rounded-xl px-4 flex-1";
  
  const variantClasses = {
    primary: "bg-vendly-primary",
    secondary: "bg-white border border-vendly-primary",
    danger: "bg-vendly-error",
    ghost: "bg-transparent",
    outline: "bg-white border border-vendly-border",
  };

  const textVariantClasses = {
    primary: "text-white font-semibold text-base",
    secondary: "text-vendly-primary font-semibold text-base",
    danger: "text-white font-semibold text-base",
    ghost: "text-vendly-text-secondary font-medium text-base hover:bg-gray-100",
    outline: "text-vendly-text font-medium text-base",
  };

  const disabledClasses = disabled || loading ? "opacity-50" : "";

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : '#16A34A'} />
      ) : (
        typeof children === 'string' ? (
          <Text className={`${textVariantClasses[variant]} ${textClassName}`}>
            {children}
          </Text>
        ) : (
          children
        )
      )}
    </TouchableOpacity>
  );
}
