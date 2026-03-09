import React from 'react';
import { View, Text } from 'react-native';
import { VendlyButton } from './VendlyButton';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-6 mt-10">
      {icon && <View className="mb-6 opacity-80">{icon}</View>}
      
      <Text className="text-xl font-semibold text-vendly-text text-center mb-2">
        {title}
      </Text>
      
      <Text className="text-base text-vendly-text-secondary text-center mb-8 px-4">
        {message}
      </Text>

      {actionLabel && onAction && (
        <VendlyButton variant="primary" onPress={onAction} className="w-full">
          {actionLabel}
        </VendlyButton>
      )}
    </View>
  );
}
