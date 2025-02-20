'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { createClient } from '@/app/utils/supabase';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import prisma from '../utils/prisma';

const supabase = createClient(cookies());

const UserSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Enter a valid email address' })
      .refine(
        async email => {
          const user = await prisma.user.findFirst({ where: { email } });
          return user ? false : true;
        },
        { message: 'A user has already registered with this email.' },
      ),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(32, { message: 'Username cannot exceed 32 characters in length' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "The given passwords don't match.",
    path: ['confirmPassword'],
  });

export type UserState = {
  message?: string | null;
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    username?: string[];
  };
};

export async function createUser(
  previousState: UserState,
  formData: FormData,
): Promise<UserState> {
  const validatedFields = await UserSchema.safeParseAsync({
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get('username'),
    confirmPassword: formData.get('confirm-password'),
  });

  if (!validatedFields.success) {
    return {
      message: null,
      errors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  const { email, password, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const defaultProfilePictureUrl = supabase.storage
    .from('convolink-images')
    .getPublicUrl('default-avatar.png');

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        firstTime: true,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: 'Database error: Failed to create user.',
    };
  }

  return { message: null };
}

// Used in search-friend-form
export type SimpleFormState = {
  message?: string;
  success?: boolean;
};

const EditAccountSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(32, { message: 'Username cannot exceed 32 characters in length' }),
});

export async function editAccount(
  userId: string,
  previousState: SimpleFormState,
  formData: FormData,
): Promise<SimpleFormState> {
  const username = formData.get('username');
  const profilePicture = formData.get('profile-picture');
  const parsedUsername = EditAccountSchema.safeParse({ username });

  if (!parsedUsername.success) {
    return {
      message: parsedUsername.error.message,
      success: false,
    };
  }

  await prisma.user.update({
    where: { userid: userId },
    data: {
      username: parsedUsername.data.username,
    },
  });

  revalidatePath('/home');
  return { success: true, message: 'Account updated successfully!' };
}
