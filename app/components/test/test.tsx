import React from 'react';
import { TestProps } from './test.props';
import styles from './test.module.css';
import cn from 'classnames';
import { TestDto } from '@/api/generated';
import { Htag } from '..';

export const Test = ({ lesson }: TestProps) => {
  const content = (lesson.data as TestDto).questions;
  return (
    <div className={styles.test}>
      <Htag tag="h3">{lesson.title}</Htag>
      <div className={cn(styles.content)}>{content}</div>
    </div>
  );
};
