'use client';
import { resetPasswordFn } from '@/actions/auth.action';
import { AuthHeader } from '@/components/AuthHeader';
import { CustomButton } from '@/components/form/CustomButton';
import { ValidateInput } from '@/components/form/ValidateInput';
import { resetPassword } from '@/utils/validator';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type Props = {};

export const ResetPassword = ({}: Props): JSX.Element => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const toast = useToast();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof resetPassword>>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    resolver: zodResolver(resetPassword),
  });
  if (!id) {
    return notFound();
  }
  const onSubmit = async (data: z.infer<typeof resetPassword>) => {
    try {
      const { message } = await resetPasswordFn(id, data.password);
      if (message === 'Failed to change password') {
        toast({
          status: 'error',
          title: 'Failed to change password',
          description: 'Please try again later',
          position: 'top-right',
          duration: 5000,
        });
        return;
      }

      if (message === 'Password changed successfully') {
        toast({
          status: 'success',
          title: 'Password changed successfully',
          description: 'Please login with your new password',
          position: 'top-right',
          duration: 5000,
        });
        reset();
        router.replace('/sign-in');
      }
    } catch (error) {
      toast({
        status: 'error',
        title: "Password Couldn't reset password",
        description: 'Please try again later',
        position: 'top-right',
        duration: 5000,
      });
    }
  };
  return (
    <Flex mt={{ base: 150, md: 50 }}>
      <Flex
        width={{ base: '90%', md: '50%' }}
        mx="auto"
        justifyContent={'center'}
        flexDir={'column'}
      >
        <AuthHeader
          type="Create new password"
          href=""
          text="Enter your email and we will send you a reset link"
        />

        <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
          <ValidateInput
            label="Password"
            control={control}
            errors={errors}
            name={'password'}
            placeholder="Enter your new password"
          />
          <ValidateInput
            label="Confirm Password"
            control={control}
            errors={errors}
            name={'confirmPassword'}
            placeholder="Confirm your new password"
          />

          <CustomButton
            text="Reset Password"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
