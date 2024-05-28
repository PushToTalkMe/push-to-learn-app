import styles from './input.module.css';
import cn from 'classnames';
import { InputProps } from './input.props';

export const Input = ({
  className,
  label,
  ...props
}: InputProps): JSX.Element => {
  return (
    <div className={styles.inputContainer}>
      <input className={cn(className, styles.input)} {...props} />
      <label className={cn(styles.label)}>{label}</label>
    </div>
  );
};
