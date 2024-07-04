'use client';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { z } from 'zod';

import { Text } from '@chakra-ui/react';
import { HTMLInputTypeAttribute } from 'react';
import { CustomInput } from './CustomeInput';

type Props = {
  control: Control<any>;
  name: any;
  errors: FieldErrors<any>;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  data?: string[];
};

export const ValidateInput = ({
  control,
  errors,
  name,
  placeholder,
  type,
  label,
  data,
}: Props): JSX.Element => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomInput
            {...field}
            label={label}
            id={label}
            type={type}
            placeholder={placeholder}
            data={data}
          />
        )}
      />
      {errors[name]?.message && (
        <Text textColor={'red'} fontWeight={'bold'}>
          {errors[name]?.message?.toString()}
        </Text>
      )}
    </>
  );
};
