'use client';
import { Button, Loader, Popup, Span } from '@/app/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import cn from 'classnames';
import { useState, ChangeEvent, BaseSyntheticEvent } from 'react';
import AvatarDefault from '../avatar/icons/avatar-default.svg';
import { useAccountAvatarUpdate } from '@/hooks/account/use-account-avatar-update';
import { imageValidation } from '@/helpers/image-validation';

export function AvatarEditForm() {
  const {
    handleSubmit,
    isPending,
    register,
    formState: { errors },
    errorMessage,
    isSuccess,
  } = useAccountAvatarUpdate();

  const [image, setImage] = useState<string>();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = imageValidation(event.target.files, setImage);
    if (!files) {
      setImage('');
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const value = event.target;
      if (!value) {
        return;
      }
      const fileContent = value.result;
      if (!fileContent || typeof fileContent === 'string') {
        return;
      }
      const byteArray = new Uint8Array(fileContent);
      const blob = new Blob([byteArray], { type: file.type });
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <form
      className={styles.avatarForm}
      onSubmit={(e: BaseSyntheticEvent) => {
        setImage('');
        return handleSubmit(e);
      }}
    >
      <input
        type="file"
        className={cn(styles.inputFile)}
        id="upload-file"
        accept="image/jpeg, image/png, image/jpg"
        {...register('files', {
          required: 'Загрузите файл',
          onChange: (event) => handleFileUpload(event),
        })}
      />
      <label className={cn(styles.labelFile)} htmlFor="upload-file">
        <span>Загрузить файл для аватара</span>
      </label>
      {errors.files && (
        <div className={styles.messages}>
          <span className={styles.errorInput}>{errors.files.message}</span>
        </div>
      )}
      <div className={cn(styles.imgContainer)}>
        {image ? (
          <img className={cn(styles.img)} src={image} />
        ) : (
          <AvatarDefault />
        )}
      </div>
      <Button
        disabled={isPending || !image}
        aria-disabled={isPending || !image}
        type="submit"
        className={cn(styles.buttonChangeAvatar)}
        appearance="primary"
      >
        Подтвердить
      </Button>
      <div className={styles.messages}>
        {errorMessage && (
          <div className={cn(styles.errorMessage)}>{errorMessage}</div>
        )}
        {isSuccess && !errors.files && (
          <div className={cn(styles.successMessage)}>
            Данные успешно изменены
          </div>
        )}
      </div>
    </form>
  );
}
