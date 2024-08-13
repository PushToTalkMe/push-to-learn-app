import type { Metadata } from 'next';
import styles from './page.module.css';
import { LogoIcon, AuthLightIcon } from '@/public/icons';

export const metadata: Metadata = {
  title: 'Авторизация',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftWrapper}>
          <LogoIcon />
          <div className={styles.imageWrapper}>
            <AuthLightIcon />
          </div>
        </div>
        <div className={styles.rightWrapper}>{children}</div>
      </div>
    </div>
  );
}
