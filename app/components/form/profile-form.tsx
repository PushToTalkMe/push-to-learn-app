'use client';
import { Button, Span } from '@/app/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import { useAccountUpdate } from '@/hooks/account';
import { Loader } from '../loader/loader';
import cn from 'classnames';
import { useEffect } from 'react';

export function ProfileForm() {
  const {
    handleSubmit,
    isPendingUpdate,
    isSuccessUpdate,
    isPendingAccount,
    register,
    formState: { errors },
    watch,
    errorMessage,
    account,
    isSuccess,
  } = useAccountUpdate();

  if (isPendingAccount) {
    return <Loader />;
  }

  if (isSuccess && account.data) {
    const [firstName, lastName, username] = watch([
      'firstName',
      'lastName',
      'username',
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
            <Span className={styles.errorInput}>
              {errors.firstName.message}
            </Span>
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
            label="Никнейм"
            inputValue={username}
            inputProps={{
              autoComplete: 'username',
              type: 'text',
              ...register('username'),
            }}
          />
        </div>

        <Button
          disabled={isPendingUpdate || !firstName || !lastName}
          aria-disabled={isPendingUpdate || !firstName || !lastName}
          type="submit"
          className={cn(styles.button)}
          appearance="primary"
        >
          Изменить
        </Button>
        <div className={styles.messages}>
          {errorMessage && (
            <div className={cn(styles.errorMessage)}>{errorMessage}</div>
          )}
          {isSuccessUpdate && !errors.firstName && !errors.lastName && (
            <div className={cn(styles.successMessage)}>
              Имя успешно изменено
            </div>
          )}
        </div>
      </form>
    );
  }
}
