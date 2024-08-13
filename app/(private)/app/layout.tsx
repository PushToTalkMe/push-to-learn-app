import { ReactNode } from 'react';
import LeftMenu from '../../components/pages/left-menu/left-menu';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Приложение - PushToLearn',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <LeftMenu />
      {children}
    </div>
  );
}
