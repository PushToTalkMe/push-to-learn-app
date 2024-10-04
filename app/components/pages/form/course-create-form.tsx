'use client';
import { useFieldArray } from 'react-hook-form';
import { useCoursesCreate } from '@/hooks/courses';
import { useAccount } from '@/hooks/account';
import styles from './form.module.css';
import cn from 'classnames';
import { Button, Htag, ImageCourse, P, Span } from '@/app/components/ui';
import { TrashIcon } from '@/public/icons';

export function CourseCreateForm() {
  const {
    handleSubmit,
    isPending,
    register,
    control,
    formState: { errors },
    errorMessage,
    isSuccess,
    watch,
  } = useCoursesCreate();

  const {
    isSuccess: isSuccessAccount,
    isPending: isPendingAccount,
    account,
  } = useAccount();

  const [title, duration, tags] = watch(['title', 'duration', 'tags']);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  return (
    <form className={styles.courseCreate} onSubmit={handleSubmit}>
      <ImageCourse />
      <div className={styles.courseInfo}>
        <input
          type="text"
          className={cn(styles.title)}
          autoComplete="title"
          placeholder="Заголовок"
          {...register('title', {
            required: 'Введите заголовок',
          })}
        />
        {errors.title && (
          <Span className={styles.errorInput}>{errors.title.message}</Span>
        )}
        <P size="large" color="author" style={{ cursor: 'default' }}>
          {account.firstName + ' ' + account.lastName}
        </P>
        <input
          type="text"
          className={cn(styles.duration)}
          autoComplete="duration"
          placeholder="Длительность"
          {...register('duration', {
            required: 'Введите длительность',
          })}
        />
        {errors.duration && (
          <Span className={styles.errorInput}>{errors.duration.message}</Span>
        )}
        <div className={cn(styles.tags)}>
          {fields.map((item, index) => (
            <div className={cn(styles.tag)} key={item.id}>
              <div>
                <input
                  placeholder={`Тэг ${index + 1}`}
                  className={cn(styles.tagInput)}
                  {...register(`tags.${index}.value`, {
                    required: `Заполните тэги`,
                  })}
                />
              </div>
              <button
                className={cn(styles.remove)}
                onClick={(e) => {
                  e.preventDefault();
                  return remove(index);
                }}
              >
                <TrashIcon />
              </button>
            </div>
          ))}
          <button
            className={cn(styles.append)}
            onClick={(e) => {
              e.preventDefault();
              return append({ value: '' });
            }}
          >
            +
          </button>
        </div>
        {(errors.tags || tags.length <= 0) && (
          <Span className={styles.errorInput}>Заполните тэги</Span>
        )}
      </div>
      <Button
        disabled={
          isPending ||
          !title ||
          !duration ||
          tags.length <= 0 ||
          tags.map((tag) => !!tag.value).includes(false)
        }
        aria-disabled={
          isPending ||
          !title ||
          !duration ||
          tags.length <= 0 ||
          tags.map((tag) => !!tag.value).includes(false)
        }
        type="submit"
        className={cn(styles.buttonCourseCreate)}
        appearance="primary"
      >
        Создать
      </Button>
      <div className={styles.messages}>
        {errorMessage && (
          <div className={cn(styles.errorMessage)}>{errorMessage}</div>
        )}
        {isSuccess && (
          <div className={cn(styles.successMessage)}>
            Курс создан! Переход к его редактированию.
          </div>
        )}
      </div>
    </form>
  );
}
