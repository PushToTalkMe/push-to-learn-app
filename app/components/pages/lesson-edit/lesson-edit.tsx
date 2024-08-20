'use client';
import styles from './lesson-edit.module.css';
import cn from 'classnames';
import { ExerciseEdit, TestEdit, TheoryEdit } from '@/app/components/pages';
import { useLessonItem } from '@/hooks/courses/use-lesson-item ';
import { Loader } from '@/app/components/ui';
import { LessonEditProps } from './lesson-edit.props';

export function LessonEdit({ lessonId }: LessonEditProps) {
  const { lesson, isPending, isSuccess } = useLessonItem(lessonId);
  return (
    <>
      {isPending && <Loader />}
      {isSuccess && lesson && (
        <div className={cn(styles.page)}>
          {lesson.type === 'Theory' && <TheoryEdit lesson={lesson} />}
          {lesson.type === 'Exercise' && <ExerciseEdit lesson={lesson} />}
          {lesson.type === 'Test' && <TestEdit lesson={lesson} />}
        </div>
      )}
    </>
  );
}
