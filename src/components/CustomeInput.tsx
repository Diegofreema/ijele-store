'use client';
import { Flex, Input, InputProps, Select } from '@chakra-ui/react';

type Props = InputProps & {
  label: string;
  id: string;
  data?: string[];
};

export const CustomInput = ({
  id,
  label,
  data,
  ...props
}: Props): JSX.Element => {
  const { onChange, value } = props;
  const onChangeFn = (e: any) => {
    onChange && onChange(e);
  };
  return (
    <Flex flexDir={'column'}>
      <label htmlFor={id} className="text-sm font-bold text-black">
        {label}
      </label>
      {props.type !== 'select' && (
        <Input
          {...props}
          borderColor={'#eee'}
          color="black"
          _hover={{
            borderColor: 'black',
          }}
        />
      )}

      {props.type === 'select' && (
        <Select
          value={value}
          onChange={(e) => onChangeFn(e.target.value)}
          placeholder={props.placeholder}
          borderColor={'#eee'}
          color="black"
          _hover={{
            borderColor: 'black',
          }}
        >
          {data?.map((v, i) => (
            <option key={i} value={v} className="capitalize text-black">
              {v}
            </option>
          ))}
        </Select>
      )}
    </Flex>
  );
};
