import React from 'react';
import { View, Text } from 'react-native';

interface StatusBadgeProps {
  status: 'active' | 'inactive';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 'active';
  
  return (
    <View
      className={`px-2 py-1 rounded-md self-start ${
        isActive ? 'bg-green-100' : 'bg-gray-100'
      }`}
    >
      <Text
        className={`text-xs font-medium ${
          isActive ? 'text-vendly-primary' : 'text-gray-600'
        }`}
      >
        {isActive ? 'Ativo' : 'Inativo'}
      </Text>
    </View>
  );
}
