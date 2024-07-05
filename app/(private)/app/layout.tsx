'use client';
import LeftMenu from '../../components/left-menu/left-menu';
import styles from './page.module.css';
import { protectedPage } from '@/hoc/protected-page';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <LeftMenu />
      {children}
    </div>
  );
}

export default protectedPage(Layout);
