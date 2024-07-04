import { Avatar, Box, Heading, Image, Text } from '@chakra-ui/react';
import { Link } from 'next-view-transitions';
import { CustomHeading, CustomText } from './typography';

type Props = {
  type: string;
  href: string;
  text: string;
};

export const AuthHeader = ({ href, text, type }: Props): JSX.Element => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={5}
      alignItems={'center'}
    >
      <Image
        alt="logo"
        src="/logo.png"
        width={100}
        height={100}
        objectFit={'contain'}
      />
      <CustomHeading text={type} textColor={'black'} />
      <Link href={href}>
        <CustomText
          text={text}
          textColor={'black'}
          textDecoration={href === '' ? 'none' : 'underline'}
          textAlign={'center'}
        />
      </Link>
    </Box>
  );
};
