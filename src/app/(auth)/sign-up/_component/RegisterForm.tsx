'use client';

import {
  Box,
  Flex,
  Input,
  SimpleGrid,
  useToast,
  Image,
  Progress,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { ChangeEventHandler, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerSchema } from '../../../../../validators';
import { MyText } from '@/components/MyText';
import { CustomButton } from '@/components/CustomButton';
import { AuthHeader } from '@/components/AuthHeader';
import { ValidateInput } from '@/components/ValidateInput';
import { register } from '@/db/mutations';
import { createClient } from '@/util/supabase/client';
type Props = {};

export const RegisterForm = ({}: Props): JSX.Element => {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const toast = useToast();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      middleName: '',
      dateOfBirth: '',
      phoneNumber: '',
      salutation: '',
      title: '',
      img_url: '',
    },
    resolver: zodResolver(registerSchema),
  });
  const { img_url, dateOfBirth } = watch();
  console.log(dateOfBirth);

  const onOpenPicker = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      // @ts-ignore
      const res = await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName || '',
        salutation: data.salutation,
        imageUrl: data.img_url || '',
        title: data.title || '',
        dateOfBirth: data.dateOfBirth || '',
        gender: data.gender || '',
        phoneNumber: data.phoneNumber,
      });

      if (res?.message === 'Failed to create profile') {
        toast({
          title: 'Error',
          description: 'Failed to create profile',
          status: 'error',
          isClosable: true,
          duration: 9000,
          position: 'top-right',
        });
        return;
      }
      if (res?.message === 'Profile already exists') {
        toast({
          title: 'User already exists',
          description: 'Please use a different email',
          status: 'error',
          isClosable: true,
          duration: 9000,
          position: 'top-right',
        });
        return;
      }

      toast({
        title: 'Account has been created successfully',
        description: 'Please check your email to verify your account',
        status: 'success',
        isClosable: true,
        duration: 9000,
        position: 'top-right',
      });
      reset();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        isClosable: true,
        duration: 9000,
        position: 'top-right',
      });
    }
  };

  const onHandleImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const filePath = `/profile/${file?.name}`;
      const { data, error } = await supabase.storage
        .from('files')
        .upload(filePath, file);
      if (error) {
        console.log(error);
        setUploading(false);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }
      setValue(
        'img_url',
        `https://eqywbgkagvejgblbjpwm.supabase.co/storage/v1/object/public/files/${data?.path}`
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setUploading(false);
    }
  };
  return (
    <Flex mt={{ base: 150, md: 100 }} pb={50}>
      <Flex
        width={{ base: '90%', md: '70%', lg: '70%' }}
        mx="auto"
        justifyContent={'center'}
        flexDir={'column'}
      >
        <AuthHeader
          type="Sign up"
          href="/sign-in"
          text="Already have an account? Log in"
        />
        <Flex width="100%" mt={5} justifyContent={'center'}>
          {!img_url ? (
            <Box
              width={200}
              height={200}
              borderWidth={1}
              borderStyle={'dashed'}
              borderRadius={10}
              bg={'#eee'}
              cursor={'pointer'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              px={5}
              onClick={onOpenPicker}
              onMouseEnter={onOpenPicker}
            >
              <MyText
                textColor={'black'}
                text="Click to select profile image"
                fontWeight={'bold'}
                textAlign={'center'}
              />
              <Input
                onChange={onHandleImage}
                display={'none'}
                ref={inputRef}
                type="file"
              />
            </Box>
          ) : (
            <Flex
              width={200}
              height={200}
              borderWidth={1}
              borderStyle={'dashed'}
              borderRadius={10}
              position={'relative'}
            >
              <Image
                src={img_url}
                width={'100%'}
                height={'100%'}
                alt="profile-image"
                objectFit={'cover'}
              />
              <IconButton
                as={X}
                aria-label="icon"
                bg={'red'}
                color="white"
                onClick={() => setValue('img_url', '')}
                position="absolute"
                right={0}
                top={0}
                cursor="pointer"
              />
            </Flex>
          )}
        </Flex>
        <Flex
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          my={5}
          flexDirection={'column'}
        >
          {errors.img_url?.message && (
            <Text textColor={'red'} fontWeight={'bold'} textAlign={'center'}>
              {errors.img_url?.message?.toString()}
            </Text>
          )}
          {uploading && <Progress width={300} isIndeterminate hasStripe />}
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
            <ValidateInput
              label="Email"
              control={control}
              errors={errors}
              name={'email'}
              placeholder="Enter your email address"
            />
            <ValidateInput
              label="First name"
              control={control}
              errors={errors}
              name={'firstName'}
              placeholder="Enter your first name"
            />
            <ValidateInput
              label="Last name"
              control={control}
              errors={errors}
              name={'lastName'}
              placeholder="Enter your last name"
            />
            <ValidateInput
              label="Middle name (optional)"
              control={control}
              errors={errors}
              name={'middleName'}
              placeholder="Enter your middle name"
            />
            <ValidateInput
              label="Password"
              control={control}
              errors={errors}
              name={'password'}
              placeholder="Enter a password"
            />
            <ValidateInput
              label="Confirm password"
              control={control}
              errors={errors}
              name={'confirmPassword'}
              placeholder="Confirm your password"
            />
          </Box>
          <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
            <ValidateInput
              label="Phone number"
              control={control}
              errors={errors}
              name={'phoneNumber'}
              placeholder="Enter your phone number"
            />
            <ValidateInput
              label="Title"
              control={control}
              errors={errors}
              name={'title'}
              placeholder="Enter your title"
            />
            <ValidateInput
              label="Salutation"
              control={control}
              errors={errors}
              type="select"
              data={['Mr', 'Mrs', 'Miss']}
              name={'salutation'}
              placeholder="Select a salutation"
            />
            <ValidateInput
              label="Gender"
              control={control}
              errors={errors}
              type="select"
              data={['Male', 'Female']}
              name={'gender'}
              placeholder="Select a Gender"
            />
            <ValidateInput
              label="Date of birth"
              control={control}
              errors={errors}
              type={'date'}
              name={'dateOfBirth'}
              placeholder="Select a date"
            />
          </Box>
        </SimpleGrid>
        <Flex width={'100%'} justifyContent={'center'}>
          <CustomButton
            title="Sign up"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            mt={5}
            width={'250px'}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
