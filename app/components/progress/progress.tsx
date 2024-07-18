import { progressValue } from '@/helpers/progress-value';
import { Htag, Loader, P, Span } from '..';
import styles from './progress.module.css';
import { ProgressProps } from './progress.props';
import cn from 'classnames';
import { useCoursesProgress } from '@/hooks/courses/use-courses-progress';

export const Progress = ({
  className,
  courseId,
  ...props
}: ProgressProps): JSX.Element => {
  const { progress, isPending, isSuccess } = useCoursesProgress(courseId);
  return (
    <>
      {isSuccess &&
      progress &&
      (progress.lessonCompleted || progress.lessonCompleted === 0) &&
      progress.lessonCount ? (
        <div className={styles.lessonCompleted}>
          <div className={cn(styles.progressHeader)}>
            <P size="medium" className={cn(styles.percentage)}>
              {progressValue(progress.lessonCompleted, progress.lessonCount)}%
            </P>
            <P size="medium">
              {progress.lessonCompleted}/{progress.lessonCount}
            </P>
          </div>

          <div className={cn(styles.progress, className)} {...props}>
            <div
              className={cn(styles.bar)}
              style={{
                width: `${progressValue(progress.lessonCompleted, progress.lessonCount)}%`,
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      {isPending && <Loader />}
    </>
  );
};
