'use client';
import { Button, Span, TextArea } from '@/app/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import { useAccount } from '@/hooks/account';
import { Loader } from '../loader/loader';
import cn from 'classnames';
import { useEffect } from 'react';
import { useCommentCreate } from '@/hooks/comment';

export function CommentForm({ lessonId }: { lessonId: number }) {
  const {
    register,
    errorMessage,
    handleSubmit,
    isPending,
    watch,
    formState: { errors },
    isSuccess,
  } = useCommentCreate(lessonId);

  const [text] = watch(['text']);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.messages}>
        <TextArea
          label="Комментарий"
          textAreaValue={text}
          textAreaProps={{
            autoComplete: 'text',
            ...register('text', {
              required: 'Введите комментарий',
            }),
          }}
        />
        {errors.text && (
          <Span className={styles.errorInput}>{errors.text.message}</Span>
        )}
      </div>
      <div className={cn(styles.buttonContainer)}>
        <Button
          disabled={isPending || !text}
          aria-disabled={isPending || !text}
          type="submit"
          className={cn(styles.button)}
          appearance="primary"
        >
          Опубликовать
        </Button>
      </div>

      <div className={styles.messages}>
        {errorMessage && (
          <div className={cn(styles.errorMessage)}>{errorMessage}</div>
        )}
        {isSuccess && !errors.text && (
          <div className={cn(styles.successMessage)}>Комментарий добавлен!</div>
        )}
      </div>
    </form>
  );
}
