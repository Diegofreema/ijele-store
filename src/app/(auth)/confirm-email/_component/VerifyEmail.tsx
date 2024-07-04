'use client';
import { verifyEmail } from '@/actions/auth.action';
import { Flex, Spinner, useToast } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface Props {}

export const VerifyEmail = ({}: Props) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      if (!id) {
        toast({
          title: 'Unauthorized',
          description: 'Please try again later',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        router.replace('/sign-in');
        return;
      }
      const { message } = await verifyEmail(id);
      if (message === 'Failed to verify email') {
        toast({
          title: 'Failed to verify email',
          description: 'Please try again later',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        router.replace('/sign-in');
      }

      if (message === 'Email verified') {
        toast({
          title: 'Success',
          description: 'Email has been verified',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });

        router.replace('/sign-in');
      }
    };

    verify();
  }, [id, router, toast]);

  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Spinner color="green" size="xl" />
    </Flex>
  );
};
