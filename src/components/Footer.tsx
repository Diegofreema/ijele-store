'use client';
import {
  Box,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  useColorModePreference,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link } from 'next-view-transitions';
import { colors } from '../../constants';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { DarkContainer } from './DarkContainer';

interface Props {}

const links = [
  {
    label: 'News',
    subLinks: [
      {
        label: 'Ijele News',
        href: 'https://www.ijelesportsclub.ng/news',
      },
      {
        label: 'Ijele Tv',
        href: 'https://www.ijelesportsclub.ng/tv',
      },
    ],
  },
  {
    label: 'Football',
    subLinks: [
      {
        label: 'Our team',
        href: 'https://www.ijelesportsclub.ng/football/our-team',
      },
      // {
      //   label: "Women's first team",
      //   href: '/football/women-teams',
      // },
      // {
      //   label: 'Academy',
      //   href: '/football/academy',
      // },
    ],
  },
  {
    label: 'Other sports',
    subLinks: [
      {
        label: 'Basketball',
        href: 'https://www.ijelesportsclub.ng/basketball',
      },
    ],
  },

  {
    label: 'Club',
    subLinks: [
      {
        label: 'About us',
        href: 'https://www.ijelesportsclub.ng/about-us',
      },
    ],
  },
];
export const Footer = ({}: Props) => {
  const color = useColorModeValue('white', colors.black);
  return (
    <DarkContainer height={{ base: '100vh', md: '300px' }}>
      <SimpleGrid
        columns={{ base: 2, md: 4 }}
        gap={5}
        width={{ base: '80%', md: '90%' }}
        mx={'auto'}
        pt={{ base: 20, md: 50 }}
      >
        {links.map((link) => (
          <Box display={'flex'} flexDir={'column'} gap={5} key={link.label}>
            <Text
              textColor={'white'}
              fontSize={{ base: 15, md: 20 }}
              fontWeight={'bold'}
              fontFamily={'var(--font-rubik)'}
            >
              {link.label}
            </Text>
            <Box display={'flex'} flexDir={'column'} gap={5}>
              {link.subLinks.map((subLink) => (
                <Link href={subLink.href} key={subLink.href} className="w-fit">
                  <Text
                    as={motion.p}
                    initial={{ x: 0 }}
                    whileHover={{
                      x: 20,

                      transition: {
                        type: 'spring',
                      },
                    }}
                    viewport={{ once: true }}
                    key={subLink.label}
                    textColor={'white'}
                    fontSize={{ base: 10, md: 15 }}
                    fontWeight={'400'}
                    fontFamily={'var(--font-rubik)'}
                  >
                    {subLink.label}
                  </Text>
                </Link>
              ))}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <FooterLinks />
    </DarkContainer>
  );
};

const socialLinks = [
  {
    href: 'https://www.instagram.com/ijelesportsclub?igsh=aXdoc3Y1bnB3YmJo',
    icon: FaInstagram,
  },
  {
    href: 'https://twitter.com/ijelesportsclub?s=11',
    icon: FaTwitter,
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61560226838987',
    icon: FaFacebook,
  },
];

const FooterLinks = () => {
  const bg = useColorModeValue('white', 'white');
  const color = useColorModeValue('white', 'white');

  return (
    <Flex gap={5} justifyContent={'center'} mt={5}>
      {socialLinks.map(({ href, icon: CustomIcon }) => (
        <Link href={href} key={href} target="_blank">
          <IconButton
            aria-label="icon"
            bg={bg}
            color={colors.darkBlue}
            icon={<Icon as={CustomIcon} boxSize={5} />}
          />
        </Link>
      ))}
    </Flex>
  );
};
