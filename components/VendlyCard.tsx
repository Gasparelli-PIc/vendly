import React from 'react';
import { View, Pressable, ViewProps } from 'react-native';

interface VendlyCardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export function VendlyCard({ children, className = '', onPress, ...props }: VendlyCardProps) {
  const baseStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    ...(props.style as any)
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 ${className}`}
        style={({ pressed }) => [
          baseStyle,
          { backgroundColor: pressed ? '#F3F4F6' : '#FFFFFF' }
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 ${className}`}
      style={baseStyle}
      {...props}
    >
      {children}
    </View>
  );
}
