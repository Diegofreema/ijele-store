'use client';

import { addToCart } from '@/db/mutations';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

export const useCart = (productId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const { message } = await addToCart(productId);
      if (message === 'Please login') {
        toast({
          title: 'Please login',
          status: 'info',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'Error updating cart') {
        toast({
          title: 'Error',
          description: 'Error updating cart',
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'Cart updated') {
        toast({
          title: 'Success',
          description: 'Cart updated successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error updating cart',
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleAddToCart };
};
