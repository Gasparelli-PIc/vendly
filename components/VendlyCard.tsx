import React from 'react';
import { View, ViewProps } from 'react-native';

interface VendlyCardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function VendlyCard({ children, className = '', ...props }: VendlyCardProps) {
  return (
    <View
      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 ${className}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
      }}
      {...props}
    >
      {children}
    </View>
  );
}
