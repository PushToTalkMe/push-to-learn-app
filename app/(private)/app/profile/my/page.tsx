import { ProfileForm } from '@/app/components/pages';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Личный профиль - PushToLearn',
};

export default function Profile() {
  return (
    <div className={styles.innerContainer}>
      <h1 className={styles.header}>Редактировать профиль</h1>
      <ProfileForm />
    </div>
  );
}
