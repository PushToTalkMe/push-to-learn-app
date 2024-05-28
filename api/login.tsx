import { API } from '@/app/api';
import { Login } from '@/interfaces/login.interface';

export async function login(formData: FormData): Promise<Login> {
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch(API.auth.login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: new Headers({ 'content-type': 'application/json' }),
  });
  return res.json();
}
