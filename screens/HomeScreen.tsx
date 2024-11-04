import React from 'react';
import { VStack, Center, Heading } from 'native-base';

export default function HomeScreen() {
  return (
    <VStack flex={1} bg="white" justifyContent="center" alignItems="center">
      <Center>
        <Heading>Bem-vindo à Página Inicial</Heading>
      </Center>
    </VStack>
  );
}
