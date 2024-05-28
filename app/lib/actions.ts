'use server';
import { login } from '@/api/login';

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await login(formData);
  } catch (error: unknown) {
    const knownError = error as {
      message: string;
      error: string;
      statusCode: number;
    };
    if (knownError) {
      return knownError.message;
    }
    throw knownError;
  }
}
