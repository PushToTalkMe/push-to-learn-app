import React, { useEffect, useState } from 'react';
import { TheoryProps } from './theory.props';
import styles from './theory.module.css';
import cn from 'classnames';
import { TheoryDto } from '@/api/generated';
import { Remarkable } from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import hljs from 'highlight.js';
import MarkdownComponent from '../markdown/markdown';

export const Theory = ({ lesson }: TheoryProps) => {
  const content = (lesson.data as TheoryDto).content;
  return (
    <div className={styles.theory}>
      <h1>{lesson.title}</h1>
      {<MarkdownComponent text={content} />}
    </div>
  );
};
