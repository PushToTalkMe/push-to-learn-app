import React from 'react';
import { TestProps } from './test-edit.props';
import styles from './test-edit.module.css';
import cn from 'classnames';
import { TestDto } from '@/api/generated';
import { Htag } from '@/app/components/ui';

export const TestEdit = ({ lesson }: TestProps) => {
  const content = (lesson.data as TestDto).questions;
  return (
    <div className={styles.test}>
      <Htag tag="h3">{lesson.title}</Htag>
      <div className={cn(styles.content)}>{content}</div>
    </div>
  );
};
