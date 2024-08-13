import React, { useEffect, useState } from 'react';
import { TheoryProps } from './theory.props';
import styles from './theory.module.css';
import { TheoryDto } from '@/api/generated';
import { MarkdownComponent } from '@/app/components/ui';

export const Theory = ({ lesson }: TheoryProps) => {
  const content = (lesson.data as TheoryDto).content;
  return (
    <div className={styles.theory}>
      <h1>{lesson.title}</h1>
      <MarkdownComponent text={content} />
    </div>
  );
};
