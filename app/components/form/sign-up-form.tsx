'use client';
import { Button } from '@/app/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import { useSignUpForm } from '../../../hooks/auth';

export function SignUpForm() {
  const { handleSubmit, isPending, register, errorMessage } = useSignUpForm();
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Имя"
        autoComplete="firstName"
        inputProps={{
          type: 'text',
          ...register('firstName', { required: true }),
        }}
      />
      <Input
        label="Фамилия"
        autoComplete="lastName"
        inputProps={{
          type: 'text',
          ...register('lastName', { required: true }),
        }}
      />
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
        Зарегистрироваться
      </Button>
      {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
    </form>
  );
}
