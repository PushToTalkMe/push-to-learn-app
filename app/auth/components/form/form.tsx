import { Button } from '@/app/(site)/components';
import { Input } from '../input/input';
import styles from './form.module.css';

export default function Form() {
  return (
    <form className={styles.loginForm}>
      <Input type="email" name="email" label="Email" autoComplete="email" />
      <Input
        type="password"
        name="password"
        label="Пароль"
        autoComplete="current-password"
      />
      <Button className={styles.button} appearance="primary">
        Войти
      </Button>
    </form>
  );
}
