import { Htag, Button } from '@/app/(site)/components';
import styles from './page.module.css';
import Link from 'next/link';
import Form from '../components/form/form';

export default function Login() {
  return (
    <div className={styles.contentForm}>
      <Htag className={styles.header} tag="h1">
        Вход
      </Htag>
      <Form />
      <div className={styles.actions}>
        <Link href="/restore" className={styles.link}>
          Восстановить пароль
        </Link>
        <Link href="/register" className={styles.link}>
          Регистрация
        </Link>
      </div>
    </div>
  );
}
