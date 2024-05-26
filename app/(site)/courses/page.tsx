import { Button, Htag, P, Tag } from '../components';
import styles from './page.module.css';

export default function Courses() {
  return (
    <div className={styles.main}>
      <div className={styles.innerContainer}>
        <Htag tag="h1">Текст</Htag>
        <Button appearance="ghost">Начать</Button>
        <Button appearance="primary" count={6}>
          Начать
        </Button>
        <Button appearance="ghost" count={10}>
          Начать
        </Button>
        <Tag>Frontend</Tag>
        <P size="small">Текст</P>
      </div>
    </div>
  );
}
