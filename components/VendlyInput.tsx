import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface VendlyInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function VendlyInput({
  label,
  error,
  style,
  ...props
}: VendlyInputProps & { style?: any }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[{ width: '100%'}, style]}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 6 }}>
          {label}
        </Text>
      )}
      
      <View
        style={[{
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
          paddingHorizontal: 16,
          borderRadius: 12,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          borderColor: isFocused ? '#16A34A' : '#E5E7EB',
        }, isFocused && { backgroundColor: 'rgba(22, 163, 74, 0.05)' },
        error && { borderColor: '#DC2626' }]}
      >
        <TextInput
          style={{ flex: 1, fontSize: 16, color: '#111827', height: '100%', paddingVertical: 0 }}
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>

      {error && (
        <Text style={{ fontSize: 14, color: '#DC2626', marginTop: 6 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
