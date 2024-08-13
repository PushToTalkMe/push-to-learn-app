import Link from 'next/link';
import styles from './page.module.css';
import { SignInForm } from '@/app/components/pages';
import { ROUTES } from '@/constants/routes';

export default function SignIn() {
  return (
    <div className={styles.contentForm}>
      <h1 className={styles.header}>Вход</h1>
      <SignInForm />
      <div className={styles.actions}>
        <Link href={ROUTES.RESET} className={styles.link}>
          Восстановить пароль
        </Link>
        <Link href={ROUTES.SIGN_UP} className={styles.link}>
          Регистрация
        </Link>
      </div>
    </div>
  );
}
