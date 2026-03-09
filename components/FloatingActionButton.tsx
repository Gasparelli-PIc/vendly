import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
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
        className="absolute bottom-6 right-6 w-14 h-14 bg-vendly-primary rounded-full items-center justify-center shadow-lg"
        style={{
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
