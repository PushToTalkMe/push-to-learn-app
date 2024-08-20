import React, { useEffect, useState } from 'react';
import { TheoryProps } from './theory-edit.props';
import styles from './theory-edit.module.css';
import { TheoryDto } from '@/api/generated';
import {
  TextEditor,
  ToolPanel,
  TextEditorProvider,
} from '@/app/components/pages';

export const TheoryEdit = ({ lesson }: TheoryProps) => {
  const content = (lesson.data as TheoryDto).content;
  return (
    <div className={styles.theory}>
      <TextEditorProvider>
        <ToolPanel />
        <TextEditor />
      </TextEditorProvider>
    </div>
  );
};
