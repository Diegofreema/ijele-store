'use client';
import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: Props) => {
  return (
    <Box minHeight={'100vh'} pb={10}>
      {children}
    </Box>
  );
};
