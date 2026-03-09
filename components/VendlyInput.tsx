import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface VendlyInputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
}

export function VendlyInput({
  label,
  error,
  className = '',
  ...props
}: VendlyInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full mb-4 ${className}`}>
      {label && (
        <Text className="text-sm font-medium text-vendly-text mb-1.5">
          {label}
        </Text>
      )}
      
      <View
        className={`
          flex-row items-center h-12 px-4 rounded-xl border bg-white
          ${isFocused ? 'border-vendly-primary bg-green-50/10' : 'border-vendly-border'}
          ${error ? 'border-vendly-error' : ''}
        `}
      >
        <TextInput
          className="flex-1 text-base text-vendly-text h-full py-0"
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>

      {error && (
        <Text className="text-sm text-vendly-error mt-1.5">
          {error}
        </Text>
      )}
    </View>
  );
}
