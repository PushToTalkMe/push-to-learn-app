'use client';
import { useAccountUpdate } from '@/hooks/account';
import styles from './form.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { Button, Popup, Span, Input, Loader } from '@/app/components/ui';
import { AvatarEditForm } from './avatar-edit-form';

export function ProfileForm() {
  const [editAvatar, setEditAvatar] = useState(false);
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
      <div className={cn(styles.edit)}>
        {editAvatar ? (
          <Popup setExpanded={setEditAvatar} avatar={true}>
            <AvatarEditForm />
          </Popup>
        ) : null}
        <div className={cn(styles.avatar)}>
          <button
            className={cn(styles.buttonAvatar)}
            onClick={() => setEditAvatar(!editAvatar)}
          >
            📷
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.messages}>
            <Input
              label="Имя"
              inputValue={firstName}
              inputProps={{
                autoComplete: 'firstName',
                type: 'text',
                ...register('firstName'),
              }}
            />
          </div>
          <div className={styles.messages}>
            <Input
              label="Фамилия"
              inputValue={lastName}
              inputProps={{
                autoComplete: 'lastName',
                type: 'text',
                ...register('lastName'),
              }}
            />
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
            disabled={isPendingUpdate || (!firstName && !lastName && !username)}
            aria-disabled={
              isPendingUpdate || (!firstName && !lastName && !username)
            }
            type="submit"
            className={cn(styles.button)}
            appearance="primary"
          >
            Изменить
          </Button>
          <div className={styles.messages}>
            {!firstName && !lastName && !username && (
              <Span className={styles.errorInput}>
                Для изменения данных заполните хотя бы одно поле
              </Span>
            )}
            {errorMessage && (
              <div className={cn(styles.errorMessage)}>{errorMessage}</div>
            )}
            {isSuccessUpdate && !errors.firstName && !errors.lastName && (
              <div className={cn(styles.successMessage)}>
                Данные успешно изменены
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}
