import { Htag, P } from '../components';
import styles from './page.module.css';
import { Tabs } from './components/tabs/tabs';
export default function Courses() {
  return (
    <div className={styles.page}>
      <Tabs></Tabs>
    </div>
  );
}
