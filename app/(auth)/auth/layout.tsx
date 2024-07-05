import type { Metadata } from 'next';
import styles from './page.module.css';
import LogoIcon from './icons/logo.svg';
import AuthImageLight from './icons/auth-image-light.svg';

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
            <AuthImageLight />
          </div>
        </div>
        <div className={styles.rightWrapper}>{children}</div>
      </div>
    </div>
  );
}
