import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = 'Carregando...', fullScreen = false }: LoadingStateProps) {
  return (
    <View className={`${fullScreen ? 'flex-1 bg-vendly-bg' : 'my-8'} items-center justify-center`}>
      <ActivityIndicator size="large" color="#16A34A" />
      {message && (
        <Text className="mt-4 text-base font-medium text-vendly-text-secondary">
          {message}
        </Text>
      )}
    </View>
  );
}
