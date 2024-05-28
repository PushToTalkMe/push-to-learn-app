import type { Metadata } from 'next';
import '../(site)/globals.css';
import { Noto_Sans } from 'next/font/google';
import styles from './page.module.css';
import LogoIcon from './icons/logo.svg';
import AuthImageIcon from './icons/authImage.svg';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Авторизация',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.leftWrapper}>
              <LogoIcon />
              <div className={styles.imageWrapper}>
                <AuthImageIcon />
              </div>
            </div>
            <div className={styles.rightWrapper}>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
