'use client';
import { Button } from '@/app/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import { useAccount, useAccountUpdate } from '@/hooks/account';
import { Loader } from '../loader/loader';

export function ProfileForm() {
  const {
    handleSubmit,
    setValue,
    isPending,
    isPendingAccount,
    register,
    errorMessage,
    account,
    isSuccess,
  } = useAccountUpdate();
  if (isPendingAccount) {
    return <Loader />;
  }
  if (isSuccess && account.data) {
    setValue('firstName', account.data.firstName);
    setValue('lastName', account.data.lastName);
    setValue('username', account.data.username);

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
          label="Никнейм"
          autoComplete="username"
          inputProps={{
            type: 'text',
            ...register('username'),
          }}
        />
        <Button
          disabled={isPending}
          aria-disabled={isPending}
          type="submit"
          className={styles.button}
          appearance="primary"
        >
          Изменить
        </Button>
        {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
      </form>
    );
  }
}
