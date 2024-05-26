import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Курсы',
};

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <nav className={styles.rightMenu}>
        <ul>
          <li>новость 1</li>
          <li>новость 2</li>
          <li>новость 3</li>
        </ul>
      </nav>
    </>
  );
}
