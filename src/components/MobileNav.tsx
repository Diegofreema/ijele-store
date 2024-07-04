import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  Text,
  Flex,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { links } from './Header';
import { Link } from 'next-view-transitions';
import { Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { colors } from '../../constants';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileDrawer({ isOpen, onClose }: Props) {
  const color = useColorModeValue('black', '#fff');
  const bg = useColorModeValue('#fff', '#181818');
  const { colorMode, toggleColorMode } = useColorMode();
  const pathname = usePathname();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={bg}>
        <DrawerCloseButton color={color} />

        <DrawerBody>
          <Flex
            gap={5}
            flexDir={'column'}
            justifyContent={'center'}
            height={'100%'}
          >
            {links.map(({ href, label }) => {
              const isActive = pathname.includes(href);
              return (
                <Link key={href} href={href} onClick={onClose}>
                  <Text
                    textColor={isActive ? colors.orange : color}
                    fontWeight={'bold'}
                  >
                    {label}
                  </Text>
                </Link>
              );
            })}
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button
            borderRadius={50}
            width={50}
            height={50}
            bg={color}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? <Sun color={bg} /> : <Moon color={bg} />}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
