import { Wrapper } from '@/components/Wrapper';
import React from 'react';
import { RegisterForm } from './_component/RegisterForm';

type Props = {};

const page = (props: Props) => {
  return (
    <Wrapper>
      <RegisterForm />
    </Wrapper>
  );
};

export default page;
