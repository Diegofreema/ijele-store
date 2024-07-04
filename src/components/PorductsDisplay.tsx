'use client';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  IconButton,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { MyText } from './MyText';
import { SelectProduct } from '@/db/schema';
import { Link } from 'next-view-transitions';
import { formatText } from '@/lib/helper';
import { CustomButton } from './CustomButton';
import { colors } from '../../constants';
import { Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useFav } from '@/hooks/useFav';

type Props = {
  title: string;
  products: Array<SelectProduct>;
};

export const ProductDisplay = ({ title, products }: Props): JSX.Element => {
  return (
    <Box
      height={'auto'}
      py={{ base: 50, md: 100 }}
      width={{ base: '90%', md: '70%' }}
      mx="auto"
    >
      <MyText text={title} mb={10} fontSize={20} fontWeight={700} />
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={5}>
        {products?.length &&
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </SimpleGrid>
      {!products.length && (
        <MyText
          text="Coming soon"
          mt={15}
          textAlign={'center'}
          fontSize={30}
          fontWeight={700}
        />
      )}
    </Box>
  );
};

const ProductCard = ({
  category,
  id,
  imagePath,
  name,
  price,
  description,
}: SelectProduct) => {
  const { handleAddToCart, isLoading } = useCart(id);
  const { handleFav, loading } = useFav(id);

  return (
    <Card minHeight={400} overflow="hidden">
      <Link href={`/site/shop/${id}`} passHref>
        <Image
          alt="image"
          src={imagePath}
          width={'100%'}
          height={200}
          objectFit={'cover'}
          fallbackSrc="https://via.placeholder.com/150"
        />
        <CardBody bg="white">
          <Flex alignItems={'center'} justifyContent={'space-between'} mb={15}>
            <Text fontWeight={'bold'} fontSize={'sm'} textColor={'black'}>
              {name}
            </Text>
            <Text fontWeight={'bold'} fontSize={'sm'} textColor={'black'}>
              Price: ₦{price}
            </Text>
          </Flex>

          <Text fontWeight={'bold'} fontSize={'md'} mt={10} textColor={'black'}>
            {formatText(description)}
          </Text>
        </CardBody>
      </Link>
      <CardFooter bg="white" justifyContent={'space-between'}>
        <CustomButton
          isLoading={isLoading}
          isDisabled={isLoading}
          title="Add to cart"
          onClick={handleAddToCart}
          bg={colors.darkBlue}
        />
        <IconButton
          onClick={handleFav}
          isLoading={loading}
          isDisabled={loading}
          bg={colors.brown}
          aria-label="icon"
          icon={<Heart />}
        />
      </CardFooter>
    </Card>
  );
};
