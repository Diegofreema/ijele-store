'use client';
import {
  Box,
  Button,
  color,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  ResponsiveValue,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'next-view-transitions';
import {
  Moon,
  Sun,
  MenuIcon,
  Search,
  User,
  Heart,
  ShoppingCart,
} from 'lucide-react';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { colors } from '../../constants';
import { MobileDrawer } from './MobileNav';
import { MyText } from './MyText';

interface Props {}
export const links = [
  {
    href: '/men',
    label: 'Men',
  },
  {
    href: '/women',
    label: 'Women',
  },
  {
    href: '/kids',
    label: 'Kids',
  },
];
export const Header = ({}: Props) => {
  const bg = useColorModeValue(colors.darkBlue, '#181818');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as={motion.div}
      initial={{ y: -20, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, type: 'spring', damping: 9 },
      }}
      viewport={{ once: true }}
      bg={bg}
      position={'fixed'}
      top={0}
      right={0}
      left={0}
      zIndex={555}
      width={'100%'}
    >
      <Flex
        p={5}
        maxWidth={{ base: '90%', md: '80%' }}
        mx={'auto'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Flex alignItems={'center'} gap={10} justifyContent={'space-between'}>
          <Link href="/">
            <Image
              alt="logo"
              src="/logo.png"
              width={50}
              height={50}
              objectFit={'contain'}
            />
          </Link>
          <Links />
        </Flex>
        <OtherLinks />
        <ToggleDarkMode />
        <MobileDrawer isOpen={isOpen} onClose={onClose} />
        <IconButton
          hideFrom="md"
          onClick={onOpen}
          aria-label="button"
          icon={<MenuIcon />}
        />
      </Flex>
    </Box>
  );
};

export const Links = ({
  flexDirection = 'row',
  onClose,
}: {
  flexDirection?: 'row' | 'column' | ResponsiveValue<'row' | 'column'>;
  onClose?: () => void;
}) => {
  const pathname = usePathname();
  const color = useColorModeValue('black', 'white');
  const onPress = (e: any) => {
    e.stopPropagation();
    onClose && onClose();
  };

  return (
    <Flex gap={5} hideBelow={'md'} flexDirection={flexDirection}>
      {links.map(({ href, label }) => {
        const isActive = pathname.includes(href);
        return (
          <Link key={href} href={href} onClick={onPress} className="group">
            <Text
              className="group-hover:text-[#8ad5e7] transition duration-150 group-hover:-translate-y-1"
              fontFamily={'var(--font-rubik)'}
              textColor={isActive ? colors.lightBlue : 'white'}
              fontWeight={'bold'}
            >
              {label}
            </Text>
          </Link>
        );
      })}
    </Flex>
  );
};

export const ToggleDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue('#181818', 'white');
  const color = useColorModeValue('white', '#181818');

  return (
    <Button
      hideBelow={'md'}
      borderRadius={50}
      width={50}
      height={50}
      bg={bg}
      onClick={toggleColorMode}
    >
      {colorMode === 'light' ? <Sun color={color} /> : <Moon color={color} />}
    </Button>
  );
};

const OtherLinks = () => {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      hideBelow={'md'}
      gap={10}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search color="white" />
        </InputLeftElement>
        <Input placeholder="Search here..." />
      </InputGroup>

      <IconGroup />
    </Flex>
  );
};

const IconGroup = () => {
  return (
    <Flex alignItems={'center'} gap={5}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <IconButton aria-label="icon" icon={<User />} />
        <MyText text="Profile" mt={2} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <IconButton aria-label="icon" icon={<Heart />} />
        <MyText text="Favorite" mt={2} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <IconButton aria-label="icon" icon={<ShoppingCart />} />
        <MyText text="Cart" mt={2} />
      </Box>
    </Flex>
  );
};
