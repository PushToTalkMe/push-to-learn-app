import { ProfileForm } from '@/app/components/form/profile-form';
import styles from './page.module.css';

export default function Profile() {
  return (
    <div className={styles.innerContainer}>
      <h1 className={styles.header}>Редактировать профиль</h1>
      <ProfileForm />
    </div>
  );
}
