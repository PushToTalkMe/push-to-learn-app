'use client';
import { Button, Span } from '@/app/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import { useSignUpForm } from '../../../hooks/auth';

export function SignUpForm() {
  const {
    handleSubmit,
    isPending,
    register,
    errorMessage,
    formState: { errors },
    watch,
    isSuccess,
  } = useSignUpForm();

  const [firstName, lastName, email, password] = watch([
    'firstName',
    'lastName',
    'email',
    'password',
  ]);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.messages}>
        <Input
          label="Имя"
          inputValue={firstName}
          inputProps={{
            autoComplete: 'firstName',
            type: 'text',
            ...register('firstName', {
              required: 'Введите имя',
            }),
          }}
        />
        {errors.firstName && (
          <Span className={styles.errorInput}>{errors.firstName.message}</Span>
        )}
      </div>
      <div className={styles.messages}>
        <Input
          label="Фамилия"
          inputValue={lastName}
          inputProps={{
            autoComplete: 'lastName',
            type: 'text',
            ...register('lastName', {
              required: 'Введите фамилию',
            }),
          }}
        />
        {errors.lastName && (
          <Span className={styles.errorInput}>{errors.lastName.message}</Span>
        )}
      </div>
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
      <div className={styles.messages}>
        <Input
          label="Пароль"
          inputValue={password}
          inputProps={{
            type: 'password',
            autoComplete: 'new-password',
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
        disabled={isPending || !email || !password || !firstName || !lastName}
        aria-disabled={
          isPending || !email || !password || !firstName || !lastName
        }
        type="submit"
        className={styles.button}
        appearance="primary"
      >
        Зарегистрироваться
      </Button>
      <div className={styles.messages}>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        {isSuccess && (
          <>
            <div className={styles.successMessage}>
              Вы успешно зарегистрировались!
            </div>
            <div className={styles.successMessage}>
              Переход на страну приложения...
            </div>
          </>
        )}
      </div>
    </form>
  );
}
