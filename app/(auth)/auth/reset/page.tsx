import Link from 'next/link';
import styles from './page.module.css';
import { SignInForm } from '@/app/components/pages';
import { ROUTES } from '@/constants/routes';

export default function Reset() {
  return (
    <div className={styles.contentForm}>
      <h1 className={styles.header}>Восстановление пароля</h1>
      <SignInForm />
      <div className={styles.actions}>
        <Link href={ROUTES.SIGN_IN} className={styles.link}>
          Страница входа
        </Link>
      </div>
    </div>
  );
}
