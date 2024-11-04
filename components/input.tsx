// src/components/input.tsx
import React from 'react';
import { Input as NativeBaseInput, FormControl, IInputProps } from 'native-base';

interface InputProps extends IInputProps {
  errorMessage?: string;
  isInvalid?: boolean;
}

export const Input: React.FC<InputProps> = ({ errorMessage, isInvalid, ...rest }) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <NativeBaseInput {...rest} />
      {isInvalid && <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>}
    </FormControl>
  );
};
