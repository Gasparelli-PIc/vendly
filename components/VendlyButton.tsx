import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface VendlyButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  loading?: boolean;
  children: React.ReactNode;
}

export function VendlyButton({
  variant = 'primary',
  loading = false,
  children,
  style,
  textStyle,
  disabled,
  ...props
}: VendlyButtonProps & { textStyle?: any }) {
  
  const baseButtonStyle = {
    height: 48, // h-12
    flexDirection: 'row' as const, // flex-row
    alignItems: 'center' as const, // items-center
    justifyContent: 'center' as const, // justify-center
    borderRadius: 12, // rounded-xl
    paddingHorizontal: 16, // px-4
    ...(disabled || loading ? { opacity: 0.5 } : {}), // opacity-50
  };
  
  const variantButtonStyles = {
    primary: { backgroundColor: '#16A34A' }, // bg-vendly-primary (assuming green-600)
    secondary: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#16A34A' },
    danger: { backgroundColor: '#DC2626' }, // bg-vendly-error (assuming red-600)
    ghost: { backgroundColor: '#F3F4F6' }, // bg-gray-100
    outline: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' }, // border-gray-200
  };

  const baseTextStyle = {
    fontSize: 16, // text-base
  };

  const textVariantStyles = {
    primary: { color: '#FFFFFF', fontWeight: '600' as const }, // text-white font-semibold
    secondary: { color: '#16A34A', fontWeight: '600' as const },
    danger: { color: '#FFFFFF', fontWeight: '600' as const },
    ghost: { color: '#6B7280', fontWeight: '500' as const }, // text-gray-500 font-medium
    outline: { color: '#111827', fontWeight: '500' as const }, // text-gray-900 font-medium
  };

  return (
    <TouchableOpacity
      style={[baseButtonStyle, variantButtonStyles[variant], style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : '#16A34A'} />
      ) : (
        typeof children === 'string' ? (
          <Text style={[baseTextStyle, textVariantStyles[variant], textStyle]}>
            {children}
          </Text>
        ) : (
          children
        )
      )}
    </TouchableOpacity>
  );
}
