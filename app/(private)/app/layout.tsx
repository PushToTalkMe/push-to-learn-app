'use client';
import LeftMenu from '../../components/left-menu/left-menu';
import styles from './page.module.css';
import { ProtectedPageProvider } from '@/app/providers/protected-page.provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedPageProvider>
      <div className={styles.wrapper}>
        <div className={styles.header}>Header</div>
        <LeftMenu />
        {children}
      </div>
    </ProtectedPageProvider>
  );
}
