'use client';
import { Button, Span } from '@/app/components';
import { Input } from '../input/input';
import styles from './form.module.css';
import { useAccount } from '@/hooks/account';
import { Loader } from '../loader/loader';
import cn from 'classnames';
import { useEffect } from 'react';

export function CommentForm() {
  const {
    account,
    isPending: isPendingAccount,
    isSuccess,
    error,
  } = useAccount();
  // const { comment, isPending, isSuccess, error } = useCommentCreate();

  if (isPendingAccount) {
    return <Loader />;
  }

  if (isSuccess && account) {
    // const [text] = watch(['text']);
    // return (
    //   <form className={styles.form} onSubmit={handleSubmit}>
    //     <div className={styles.messages}>
    //       <Input
    //         label="Имя"
    //         inputValue={text}
    //         inputProps={{
    //           autoComplete: 'firstName',
    //           type: 'text',
    //           ...register('firstName', {
    //             required: 'Введите имя',
    //           }),
    //         }}
    //       />
    //       {errors.firstName && (
    //         <Span className={styles.errorInput}>
    //           {errors.firstName.message}
    //         </Span>
    //       )}
    //     </div>
    //     <Button
    //       disabled={isPendingUpdate || !firstName || !lastName}
    //       aria-disabled={isPendingUpdate || !firstName || !lastName}
    //       type="submit"
    //       className={cn(styles.button)}
    //       appearance="primary"
    //     >
    //       Изменить
    //     </Button>
    //     <div className={styles.messages}>
    //       {errorMessage && (
    //         <div className={cn(styles.errorMessage)}>{errorMessage}</div>
    //       )}
    //       {isSuccessUpdate && !errors.firstName && !errors.lastName && (
    //         <div className={cn(styles.successMessage)}>
    //           Имя успешно изменено
    //         </div>
    //       )}
    //     </div>
    //   </form>
    // );
  }
}
