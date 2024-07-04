'use client';
import { useProfileOpen } from '@/lib/zustand/useProfileOpen';
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

export const ProfileDrawer = ({}: Props): JSX.Element => {
  const { isOpen, onClose } = useProfileOpen();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Profile</DrawerHeader>

        <DrawerBody></DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Edit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
