import { Htag, P, RightMenu } from '../components';
import styles from './page.module.css';
import { Tabs } from './components/tabs/tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Курсы',
};

export default function Courses() {
  return (
    <main className={styles.main}>
      <div className={styles.innerContainer}>
        <div className={styles.page}>
          <Tabs />
        </div>
        <RightMenu>
          {<Htag tag="h2">Заголовок</Htag>}
          {<Htag tag="h3">Тело</Htag>}
        </RightMenu>
      </div>
    </main>
  );
}
