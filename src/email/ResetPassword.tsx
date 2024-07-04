import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface VerificationLink {
  resetLink?: string;
}

export const ResetPassword = ({ resetLink }: VerificationLink) => {
  return (
    <Html>
      <Head />

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black  text-center">
              This is from IjeleSC Membership.
            </Heading>

            <Section className="flex justify-center">
              <Text className="text-black text-[14px] leading-[24px] text-center">
                follow this link to reset your password{' '}
                <Link href={resetLink} className="text-blue-600 no-underline">
                  {resetLink}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPassword;
