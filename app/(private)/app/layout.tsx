import LeftMenu from '../../components/left-menu/left-menu';
import styles from './page.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <LeftMenu />
      {children}
    </div>
  );
}
