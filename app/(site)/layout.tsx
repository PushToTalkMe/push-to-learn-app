import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans } from 'next/font/google';
import styles from './page.module.css';
import LeftMenu from './components/left-menu/left-menu';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PushToLearn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <div className={styles.wrapper}>
          <div className={styles.header}>Header</div>
          <LeftMenu></LeftMenu>
          {children}
        </div>
      </body>
    </html>
  );
}
