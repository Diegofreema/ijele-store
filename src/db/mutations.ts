'use server';

import { and, eq } from 'drizzle-orm';
import { db } from '.';
import {
  cartTable,
  favoriteTable,
  InsertUser,
  SelectCart,
  SelectUser,
  usersTable,
} from './schema';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { hashPasswordBcrypt, verifyPasswordBcrypt } from '@/lib/helper';
import { Resend } from 'resend';
import VerifyEmail from '@/email/VerifyEmail';
import ResetPassword from '@/email/ResetPassword';

const resend = new Resend(process.env.RESEND_KEY);
const api = process.env.BASE_URL;
export const addToCart = async (productId: number) => {
  const userId = cookies().get('id')?.value;
  if (!userId) {
    redirect('/sign-in');
    return { message: 'Please login' };
  }
  try {
    const isInCart = await db
      .select()
      .from(cartTable)
      .where(
        and(eq(cartTable.userId, userId), eq(cartTable.productId, productId))
      );

    if (isInCart.length > 0) {
      await db
        .delete(cartTable)
        .where(
          and(eq(cartTable.userId, userId), eq(cartTable.productId, productId))
        );
    }

    if (!isInCart) {
      await db
        .insert(cartTable) // @ts-ignore
        .values({ productId: productId, userId: userId });
    }

    revalidatePath('/');
    return { message: 'Cart updated' };
  } catch (error) {
    console.log(error);

    return { message: 'Error updating cart' };
  }
};

export const addToFav = async (productId: number) => {
  const userId = cookies().get('id')?.value;
  if (!userId) {
    redirect('/sign-in');
    return { message: 'Please login' };
  }
  try {
    const isInFav = await db
      .select()
      .from(favoriteTable)
      .where(
        and(
          eq(favoriteTable.userId, userId),
          eq(favoriteTable.productId, productId)
        )
      );

    if (isInFav.length > 0) {
      await db
        .delete(favoriteTable)
        .where(
          and(
            eq(favoriteTable.userId, userId),
            eq(favoriteTable.productId, productId)
          )
        );
    }

    if (!isInFav) {
      await db
        .insert(favoriteTable) // @ts-ignore
        .values({ productId: productId, userId: userId });
    }

    return { message: 'Favorite updated' };
  } catch (error) {
    console.log(error);

    return { message: 'Error updating favorite' };
  }
};

export const register = async (values: InsertUser) => {
  try {
    const hashedPassword = await hashPasswordBcrypt(values.password);
    if (!hashedPassword) return { message: 'Failed to create profile' };
    const userExists = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, values.email));
    if (userExists.length > 0) {
      return { message: 'Profile already exists' };
    }

    await db.insert(usersTable).values(values);
    const { error: emailError } = await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: [values?.email],
      subject: 'Verify your email',
      react: VerifyEmail({
        userImage: values?.imageUrl as string,
        fullName: `${values?.firstName} ${values?.lastName}`,
        verificationLink: `${api}/confirm-email?id=${values?.user_id}`,
      }),
    });

    console.log('', emailError);
    return { message: 'success' };
  } catch (err) {
    return { message: 'Failed to create profile' };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    const user = userData?.[0];
    if (!user) {
      return { message: 'User not found' };
    }
    const hashPassword = await verifyPasswordBcrypt(user?.password, password);

    if (!hashPassword) {
      return { error: 'Invalid credentials' };
    }

    if (!user.verified) {
      return { message: 'not verified' };
    }
    cookies().set('id', user.user_id);
    return { message: 'success' };
  } catch (error) {
    return { message: 'Failed to login' };
  }
};

export const update = async (values: InsertUser, id: string) => {
  try {
    await db.update(usersTable).set(values).where(eq(usersTable.user_id, id));
    revalidatePath('/profile');
    return { message: 'success' };
  } catch (error) {
    console.log('', error);
    return { error: 'Failed to update' };
  }
};
export const getCookies = async () => {
  return cookies().get('id')?.value;
};

export const getProfile = async (id: string): Promise<SelectUser> => {
  try {
    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.user_id, id));
    return userData[0];
  } catch (error) {
    throw new Error('Failed to get profile');
  }
};

export const forgotPasswordFn = async (email: string) => {
  try {
    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    const user = userData[0];
    if (user) {
      const { error: emailError } = await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: [email],
        subject: 'Reset your password',
        react: ResetPassword({
          resetLink: `${api}/reset-password?id=${user.user_id}`,
        }),
      });
      return { message: 'success' };
    }

    return { message: 'user not found' };
  } catch (error) {
    return { message: 'failed' };
  }
};
export const logOut = async () => {
  cookies().delete('id');
  redirect('/');
};

export const verifyEmail = async (id: string) => {
  try {
    await db
      .update(usersTable)
      .set({ verified: true })
      .where(eq(usersTable.user_id, id));
    return { message: 'Email verified' };
  } catch (error) {
    return { message: 'Failed to verify email' };
  }
};
