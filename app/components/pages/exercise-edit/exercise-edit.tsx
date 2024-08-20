import React from 'react';
import { ExerciseProps } from './exercise-edit.props';
import styles from './exercise-edit.module.css';
import cn from 'classnames';
import { ExerciseDto } from '@/api/generated';
import { Htag } from '@/app/components/ui';

export const ExerciseEdit = ({ lesson }: ExerciseProps) => {
  const content = (lesson.data as ExerciseDto).tasks;
  return (
    <div className={styles.exercise}>
      <Htag tag="h3">{lesson.title}</Htag>
      <div className={cn(styles.content)}>{content}</div>
    </div>
  );
};
