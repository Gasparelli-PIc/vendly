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
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', padding: 24, marginTop: 24 }}>
      {icon && <View style={{ marginBottom: 24, opacity: 0.8 }}>{icon}</View>}
      
      <Text style={{ fontSize: 20, fontWeight: '600', color: '#111827', textAlign: 'center', marginBottom: 8 }}>
        {title}
      </Text>
      
      <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32, paddingHorizontal: 16 }}>
        {message}
      </Text>

      {actionLabel && onAction && (
        <VendlyButton variant="primary" onPress={onAction} style={{ width: '100%' }}>
          {actionLabel}
        </VendlyButton>
      )}
    </View>
  );
}
