'use client';
import { ChakraProvider } from '@chakra-ui/react';
type Props = {
  children: React.ReactNode;
};

export const Provider = ({ children }: Props): JSX.Element => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
