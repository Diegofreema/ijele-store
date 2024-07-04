'use client';
import { colors } from '../../constants';
import { Box, ResponsiveValue, useColorModeValue } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  height?:
    | ResponsiveValue<
        | number
        | (string & {})
        | 'inherit'
        | '-moz-initial'
        | 'initial'
        | 'revert'
        | 'revert-layer'
        | 'unset'
        | '-moz-max-content'
        | '-moz-min-content'
        | '-webkit-fit-content'
        | 'auto'
        | 'fit-content'
        | 'max-content'
        | 'min-content'
      >
    | undefined;
}

export const LightContainer = ({ children, height = '100vh' }: Props) => {
  const bg = useColorModeValue(colors.darkBlue, '#181818');
  return (
    <Box
      minH={height}
      bg={bg}
      py={{ base: '50px', md: '100px' }}
      display={'flex'}
      flexDir={'column'}
    >
      {children}
    </Box>
  );
};
