import React, { useEffect, useState } from 'react';
import { TheoryProps } from './theory-edit.props';
import styles from './theory-edit.module.css';
import cn from 'classnames';
import { TheoryDto } from '@/api/generated';
import {
  TextEditor,
  ToolPanel,
  TextEditorProvider,
} from '@/app/components/pages';
import { useLessonPatchTheory } from '@/hooks/courses';
import { SideUp } from '../../ui';

export const TheoryEdit = ({ lesson }: TheoryProps) => {
  const content = (lesson.data as TheoryDto).content;
  const { error, handlePatchTheory, isPending, isSuccess } =
    useLessonPatchTheory(lesson.id);

  return (
    <div className={styles.theory}>
      {isSuccess && <SideUp status="success">Урок сохранен</SideUp>}
      {!!error && <SideUp status="error">{error}</SideUp>}
      <TextEditorProvider content={content} readOnly={false}>
        <ToolPanel handlePatchTheory={handlePatchTheory} />
        <TextEditor />
      </TextEditorProvider>
    </div>
  );
};
