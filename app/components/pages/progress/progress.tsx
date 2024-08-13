import { useCoursesProgress } from '@/hooks/courses';
import { progressValue } from '@/helpers/progress-value';
import { Loader, P } from '@/app/components/ui';
import styles from './progress.module.css';
import cn from 'classnames';
import { ProgressProps } from './progress.props';

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
