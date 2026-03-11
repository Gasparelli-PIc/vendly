import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Link } from 'expo-router';

interface FloatingActionButtonProps {
  to: string;
}

export function FloatingActionButton({ to }: FloatingActionButtonProps) {
  return (
    <Link href={to as any} asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          backgroundColor: '#16A34A',
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#16A34A',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Plus color="#FFF" size={28} />
      </TouchableOpacity>
    </Link>
  );
}
