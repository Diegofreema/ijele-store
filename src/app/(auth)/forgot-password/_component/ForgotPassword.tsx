'use client';
import { forgotPasswordFn } from '@/actions/auth.action';
import { AuthHeader } from '@/components/AuthHeader';
import { CustomButton } from '@/components/form/CustomButton';
import { CustomInput } from '@/components/form/CustomInput';
import { ValidateInput } from '@/components/form/ValidateInput';
import { CustomText } from '@/components/ui/typography';
import { forgotPassword, loginSchema } from '@/utils/validator';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'next-view-transitions';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type Props = {};

export const ForgotPassword = ({}: Props): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof forgotPassword>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPassword),
  });

  const onSubmit = async (data: z.infer<typeof forgotPassword>) => {
    try {
      const res = await forgotPasswordFn(data.email);
      if (res?.message === 'email not found') {
        toast({
          title: 'Email not found',
          description: 'Please use a registered email',
          status: 'error',
          position: 'top-right',
          duration: 5000,
        });
      }
      if (res?.message === 'email sent') {
        toast({
          title: 'Email sent',
          description: 'Please check your email for a reset link',
          status: 'success',
          position: 'top-right',
          duration: 5000,
        });
        reset();
        router.push('/sign-in');
      }
    } catch (error) {
      toast({
        title: 'Email not sent',
        description: 'Please try again later',
        status: 'error',
        position: 'top-right',
        duration: 5000,
      });
    }
  };
  return (
    <Flex mt={{ base: 150, md: 50 }} minH={'100vh'}>
      <Flex
        width={{ base: '90%', md: '70%', lg: '50%' }}
        mx="auto"
        justifyContent={'center'}
        flexDir={'column'}
      >
        <AuthHeader
          type="Forgot Password?"
          href=""
          text="Enter your email and we will send you a reset link"
        />

        <Box
          display={'flex'}
          flexDir={'column'}
          gap={5}
          mt={5}
          mx={'auto'}
          maxWidth={500}
          width={'100%'}
        >
          <ValidateInput
            label="Email"
            control={control}
            errors={errors}
            name={'email'}
            placeholder="Enter your email address"
          />

          <CustomButton
            text="Submit"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            loadingText="Submitting..."
            maxWidth={300}
            width="100%"
            mx="auto"
          />
        </Box>
      </Flex>
    </Flex>
  );
};
