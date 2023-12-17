'use server';

import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import sql from '../../sql';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
  
  const FormRegisterSchema = z.object({
    username: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    email: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    password: z.string({
      invalid_type_error: 'Please select a customer.',
    })
  });
  
  // This is temporary
  export type RegisterState = {
    errors?: {
      username?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string | null;
  };
  
  export async function register(
    prevState: RegisterState,
    formData: FormData,
  ) {
    // Validate form fields using Zod
    const validatedFields = FormRegisterSchema.safeParse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
  
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
  
    // Prepare data for insertion into the database
    const { username, email, password } = validatedFields.data;
  
    console.log(username, email, password)
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await sql`
          INSERT INTO users (name, email, password)
          VALUES (${username}, ${email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
  
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }