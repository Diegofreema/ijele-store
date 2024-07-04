'use client';
import { Text, TextProps, useColorModeValue } from '@chakra-ui/react';

type Props = TextProps & {
  text: string;
  textColor?: string;
};

export const MyText = ({ text, textColor = 'black', ...props }: Props) => {
  const color = useColorModeValue('#181818', 'white');
  return (
    <Text {...props} textColor={textColor} fontFamily={'var(--font-rubik)'}>
      {text}
    </Text>
  );
};
