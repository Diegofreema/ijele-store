'use client';
import { DarkContainer } from '@/components/DarkContainer';
import { Box, Image, useColorModeValue } from '@chakra-ui/react';
import { colors } from '../../../constants';

type Props = {};

export const Landing = ({}: Props): JSX.Element => {
  const bg = useColorModeValue(colors.darkBlue, '#181818');
  return (
    <Box height={'100vh'} bg={bg} width="100%" mt={{ base: 150, md: 50 }}>
      <Image
        alt="image"
        src="/bg.png"
        height={'100%'}
        width={'100%'}
        objectFit={'contain'}
      />
    </Box>
  );
};
