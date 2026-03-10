import React, { useState } from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface VendlyDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string; // Optional label if needed externally
}

export function VendlyDatePicker({ value, onChange }: VendlyDatePickerProps) {
  const [show, setShow] = useState(false);

  // Helper to parse the YYYY-MM-DD string back into a Date object safely
  const getDateFromValue = () => {
    if (!value) return new Date();
    // Use part separation to avoid timezone shift issues on Date construction
    const [year, month, day] = value.split('-');
    if (year && month && day) {
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return new Date();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (selectedDate) {
      // Format as YYYY-MM-DD safely taking local time into account
      const formatted = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
      onChange(formatted);
    }
  };

  const displayFormat = () => {
    if (!value) return 'Selecionar data';
    const [year, month, day] = value.split('-');
    if (year && month && day) {
       return `${day}/${month}/${year}`;
    }
    return value;
  };

  return (
    <>
      <TouchableOpacity
        style={{
          height: 44,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 8,
          paddingHorizontal: 12,
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: value ? '#111827' : '#9CA3AF' }}>{displayFormat()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={getDateFromValue()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          textColor="#111827"
        />
      )}
    </>
  );
}
