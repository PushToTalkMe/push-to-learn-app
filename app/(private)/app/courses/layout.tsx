import cn from 'classnames';
import styles from './layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn(styles.layout)}>
      <main className={styles.main}>
        <div className={styles.innerContainer}>{children}</div>
      </main>
    </div>
  );
}
