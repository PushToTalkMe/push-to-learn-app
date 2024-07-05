import { progressValue } from '@/helpers/progress-value';
import { Htag, P, Span } from '..';
import styles from './progress.module.css';
import { ProgressProps } from './progress.props';
import cn from 'classnames';

export const Progress = ({
  className,
  lessonCompleted,
  countLessons,
  ...props
}: ProgressProps): JSX.Element => {
  const value = progressValue(lessonCompleted, countLessons);
  return (
    <div className={styles.lessonCompleted}>
      <div className={cn(styles.progressHeader)}>
        <P size="medium" className={cn(styles.percentage)}>
          {value}%
        </P>
        <P size="medium">
          {lessonCompleted}/{countLessons}
        </P>
      </div>

      <div className={cn(styles.progress, className)} {...props}>
        <div className={cn(styles.bar)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};
