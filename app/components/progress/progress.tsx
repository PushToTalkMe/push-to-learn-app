import styles from './progress.module.css';
import { ProgressProps } from './progress.props';
import cn from 'classnames';

export const Progress = ({
  className,
  value,
  ...props
}: ProgressProps): JSX.Element => {
  return (
    <div className={cn(styles.progress, className)} {...props}>
      <div className={cn(styles.bar)} style={{ width: `${value}%` }} />
    </div>
  );
};
