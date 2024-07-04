'use client';

import { addToFav } from '@/db/mutations';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

export const useFav = (productId: number) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleFav = async () => {
    setLoading(true);
    try {
      const { message } = await addToFav(productId);
      if (message === 'Please login') {
        toast({
          title: 'Please login',
          status: 'info',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'Error updating favorite') {
        toast({
          title: 'Error',
          description: 'Error updating favorites',
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'Favorite updated') {
        toast({
          title: 'Success',
          description: 'Favorites updated successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error updating favorite',
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleFav };
};
