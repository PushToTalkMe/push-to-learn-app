'use client';
import { useSignInForm } from '@/hooks/auth';
import styles from './form.module.css';
import { Button, Span, Input } from '@/app/components/ui';

export function SignInForm(): JSX.Element {
  const {
    handleSubmit,
    isPending,
    register,
    errorMessage,
    isSuccess,
    watch,
    formState: { errors },
  } = useSignInForm();
  const [email, password] = watch(['email', 'password']);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.messages}>
        <Input
          label="Email"
          inputValue={email}
          inputProps={{
            type: 'email',
            autoComplete: 'email',
            ...register('email', {
              required: 'Введите почту',
            }),
          }}
        />
        {errors.email && (
          <Span className={styles.errorInput}>{errors.email.message}</Span>
        )}
      </div>
      <div>
        <Input
          label="Пароль"
          inputValue={password}
          inputProps={{
            type: 'password',
            autoComplete: 'current-password',
            ...register('password', {
              required: 'Введите пароль',
            }),
          }}
        />
        {errors.password && (
          <Span className={styles.errorInput}>{errors.password.message}</Span>
        )}
      </div>

      <Button
        disabled={isPending || !email || !password}
        aria-disabled={isPending || !email || !password}
        type="submit"
        className={styles.button}
        appearance="primary"
      >
        Войти
      </Button>
      <div className={styles.messages}>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        {isSuccess && (
          <div className={styles.successMessage}>
            Успех! Переход на страну приложения...
          </div>
        )}
      </div>
    </form>
  );
}
