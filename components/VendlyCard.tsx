import React from 'react';
import { View, TouchableOpacity, ViewProps } from 'react-native';

interface VendlyCardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export function VendlyCard({ children, style, onPress, ...props }: VendlyCardProps) {
  const baseStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: 16, // rounded-2xl
    padding: 16, // p-4
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // shadow-sm
    shadowOpacity: 0.05, // shadow-sm
    shadowRadius: 5, // shadow-sm
    elevation: 2, // shadow-sm equivalent for Android
    borderWidth: 1, // border
    borderColor: '#F3F4F6', // border-gray-100
    marginBottom: 12, // mb-3
    ...(style as any),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={baseStyle}
        {...(props as any)}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={baseStyle}
      {...props}
    >
      {children}
    </View>
  );
}
