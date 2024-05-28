import { Htag } from '../components';
import styles from './page.module.css';
export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
      <Htag tag="h1">Загрузка</Htag>
    </div>
  );
}
