'use client';
import { Button } from '@/app/(site)/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import { authenticate } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { MouseEvent } from 'react';

export default function Form() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form className={styles.loginForm} action={dispatch}>
      <Input
        type="email"
        name="email"
        label="Email"
        autoComplete="email"
        required
      />
      <Input
        type="password"
        name="password"
        label="Пароль"
        autoComplete="current-password"
        required
      />
      {errorMessage && <p>{errorMessage}</p>}
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: MouseEvent) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      aria-disabled={pending}
      type="submit"
      className={styles.button}
      appearance="primary"
      onClick={handleClick}
    >
      Войти
    </Button>
  );
}
