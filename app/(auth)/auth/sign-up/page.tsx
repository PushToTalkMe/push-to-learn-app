import { SignUpForm } from '@/app/components/pages';
import styles from './page.module.css';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function SignUp() {
  return (
    <div className={styles.contentForm}>
      <h1 className={styles.header}>Регистрация</h1>
      <SignUpForm />
      <div className={styles.actions}>
        <Link href={ROUTES.SIGN_IN} className={styles.link}>
          Страница входа
        </Link>
      </div>
    </div>
  );
}
