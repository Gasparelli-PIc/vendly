import React from 'react';
import { View, Text } from 'react-native';

interface StatusBadgeProps {
  status: 'active' | 'inactive';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 'active';
  
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        backgroundColor: isActive ? '#DCFCE7' : '#F3F4F6'
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: isActive ? '#16A34A' : '#4B5563'
        }}
      >
        {isActive ? 'Ativo' : 'Inativo'}
      </Text>
    </View>
  );
}
