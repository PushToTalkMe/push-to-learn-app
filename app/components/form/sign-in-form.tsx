'use client';
import { Button } from '@/app/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import { useSignInForm } from '../../../hooks/auth';

export function SignInForm(): JSX.Element {
  const { handleSubmit, isPending, register, errorMessage } = useSignInForm();
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Email"
        autoComplete="email"
        inputProps={{ type: 'email', ...register('email', { required: true }) }}
      />
      <Input
        label="Пароль"
        autoComplete="current-password"
        inputProps={{
          type: 'password',
          ...register('password', { required: true }),
        }}
      />
      <Button
        disabled={isPending}
        aria-disabled={isPending}
        type="submit"
        className={styles.button}
        appearance="primary"
      >
        Войти
      </Button>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </form>
  );
}
