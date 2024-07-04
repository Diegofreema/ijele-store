import { Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';

type Props = HeadingProps & {
  text: string;
  textColor?: string;
};

export const CustomHeading = ({
  text,
  textColor = 'white',
  ...props
}: Props): JSX.Element => {
  return (
    <Heading {...props} textColor={textColor}>
      {text}
    </Heading>
  );
};

type Props2 = TextProps & {
  text: string;
  textColor?: string;
};

export const CustomText = ({
  text,
  textColor = 'white',
  ...props
}: Props2): JSX.Element => {
  return (
    <Text {...props} textColor={textColor}>
      {text}
    </Text>
  );
};
