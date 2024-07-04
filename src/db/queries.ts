'use server';

import { eq } from 'drizzle-orm';
import { db } from '.';
import { SelectProduct, productTable } from './schema';

export const getMenProducts = async (): Promise<Array<SelectProduct>> => {
  try {
    const men = db
      .select()
      .from(productTable)
      .where(eq(productTable.category, 'men'));
    return men;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get product');
  }
};
export const getWomenProducts = async (): Promise<Array<SelectProduct>> => {
  try {
    return db
      .select()
      .from(productTable)
      .where(eq(productTable.category, 'women'));
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get products');
  }
};
export const getKidsProduct = async (): Promise<Array<SelectProduct>> => {
  try {
    return db
      .select()
      .from(productTable)
      .where(eq(productTable.category, 'children'));
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get products');
  }
};

export const getSingleProduct = async (id: number): Promise<SelectProduct> => {
  try {
    const product = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, id));

    return product[0];
  } catch (error) {
    throw new Error('Failed to get product');
  }
};
