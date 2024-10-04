import React from 'react';
import { TheoryProps } from './theory.props';
import styles from './theory.module.css';
import { TheoryDto } from '@/api/generated';
import { TextEditor, TextEditorProvider } from '@/app/components/pages';

export const Theory = ({ lesson }: TheoryProps) => {
  const content = (lesson.data as TheoryDto).content;
  return (
    <div className={styles.theory}>
      <h1>{lesson.title}</h1>
      <TextEditorProvider content={content} readOnly={true}>
        <TextEditor />
      </TextEditorProvider>
    </div>
  );
};
