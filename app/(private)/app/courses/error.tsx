'use client';
import styles from './page.module.css';

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <div className={styles.error}>Что-то пошло не так</div>
      <div>{JSON.stringify(error)}</div>
    </>
  );
}
