'use client';
import { Button } from '@/app/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import { useSignUpForm } from '../../../hooks';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function SignUpForm() {
  const { handleSubmit, isPending, register, errorMessage } = useSignUpForm();

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <Input
        type="email"
        label="Email"
        autoComplete="email"
        required
        {...register('email', { required: true })}
      />
      <Input
        type="password"
        label="Пароль"
        autoComplete="current-password"
        required
        {...register('password', { required: true })}
      />
      <Button
        disabled={isPending}
        aria-disabled={isPending}
        type="submit"
        className={styles.button}
        appearance="primary"
      >
        Sign Up
      </Button>
      <Link className="text-center" href={ROUTES.SIGN_UP}>
        Sign In
      </Link>
      {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
    </form>
  );
}
