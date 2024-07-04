import { Wrapper } from '@/components/Wrapper';
import { NextPage } from 'next';
import { Landing } from './_component/Landing';
import { Sponsor } from '@/components/Sponsors';
import { ProductDisplay } from '@/components/PorductsDisplay';
import { getKidsProduct, getMenProducts, getWomenProducts } from '@/db/queries';

interface Props {}

const page = async () => {
  const menData = getMenProducts();
  const kidsData = getKidsProduct();
  const womenData = getWomenProducts();

  const [men, kids, women] = await Promise.all([menData, kidsData, womenData]);
  return (
    <Wrapper>
      <Landing />
      <Sponsor />
      <div className="mt-5 space-y-10">
        <ProductDisplay title="Men" products={men} />
        <ProductDisplay title="Women" products={women} />
        <ProductDisplay title="Children" products={kids} />
      </div>
    </Wrapper>
  );
};

export default page;
