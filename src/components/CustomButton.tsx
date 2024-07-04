import { Button, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {
  onClick: () => void;
  title: string;
  loading?: boolean;
};

export const CustomButton = ({
  onClick,
  title,
  loading,
  bg = 'black',
  borderRadius = 5,
  ...props
}: Props): JSX.Element => {
  return (
    <Button
      {...props}
      onClick={onClick}
      isLoading={loading}
      bg={bg}
      color="white"
      borderRadius={borderRadius}
      _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      {title}
    </Button>
  );
};
