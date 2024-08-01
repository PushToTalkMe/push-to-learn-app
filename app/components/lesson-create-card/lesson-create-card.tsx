import styles from './lesson-create-card.module.css';
import cn from 'classnames';
import { LessonCreateCardProps } from './lesson-create-card.props';
import TestIcon from '@/public/icons/test.svg';
import ExerciseIcon from '@/public/icons/exercise.svg';
import TheoryIcon from '@/public/icons/theory.svg';
import { Htag } from '..';

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
