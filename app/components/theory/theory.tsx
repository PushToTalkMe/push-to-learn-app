import React from 'react';
import { TheoryProps } from './theory.props';
import styles from './theory.module.css';
import cn from 'classnames';
import { Htag } from '..';
import { TheoryDto } from '@/api/generated';

export const Theory = ({ lesson }: TheoryProps) => {
  const content = (lesson.data as TheoryDto).content;
  return (
    <div className={styles.theory}>
      <Htag tag="h3">{lesson.title}</Htag>
      <div className={cn(styles.content)}>{content}</div>
    </div>
  );
};
