// src/Componentes/button.tsx

import React from 'react';
import { Button as NativeBaseButton, Text } from 'native-base';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <NativeBaseButton onPress={onPress} backgroundColor="#007bff" borderRadius={5} padding={10} marginTop={5}>
      <Text color="#ffffff" textAlign="center">{title}</Text>
    </NativeBaseButton>
  );
};
