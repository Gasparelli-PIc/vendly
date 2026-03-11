import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = 'Carregando...', fullScreen = false }: LoadingStateProps) {
  return (
    <View style={[
      { alignItems: 'center', justifyContent: 'center' },
      fullScreen ? { flex: 1, backgroundColor: '#F9FAFB' } : { marginVertical: 32 }
    ]}>
      <ActivityIndicator size="large" color="#16A34A" />
      {message && (
        <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '500', color: '#6B7280' }}>
          {message}
        </Text>
      )}
    </View>
  );
}
