import styles from './lesson-create-card.module.css';
import cn from 'classnames';
import { LessonCreateCardProps } from './lesson-create-card.props';
import { Htag } from '@/app/components/ui';
import { TestIcon, ExerciseIcon, TheoryIcon } from '@/public/icons';

export function LessonCreateCard({
  type,
  lesson,
  setLesson,
}: LessonCreateCardProps) {
  return (
    <div
      className={cn(styles.lessonCreateCard, {
        [styles.active]: type === lesson,
      })}
      onClick={() => setLesson(type)}
    >
      {type === 'Test' ? (
        <>
          <TestIcon />
          <Htag tag="h1">Тест</Htag>
        </>
      ) : type === 'Theory' ? (
        <>
          <TheoryIcon />
          <Htag tag="h1">Теория</Htag>
        </>
      ) : type === 'Exercise' ? (
        <>
          <ExerciseIcon />
          <Htag tag="h1">Упражнение</Htag>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
