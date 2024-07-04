'use client';
import { useCartOpen } from '@/lib/zustand/useCartOpen';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react';
type Props = {};

export const CartDrawer = ({}: Props): JSX.Element => {
  const { isOpen, onClose } = useCartOpen();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Cart</DrawerHeader>

        <DrawerBody></DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
