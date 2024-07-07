import React from 'react';
import { TheoryProps } from './theory.props';
import styles from './theory.module.css';
import cn from 'classnames';
import { Htag } from '..';
import { TheoryDto } from '@/api/generated';
import { Remarkable } from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';

export const Theory = ({ lesson }: TheoryProps) => {
  const content = (lesson.data as TheoryDto).content;
  const md = new Remarkable();
  md.renderer = new RemarkableReactRenderer();
  const htmlContent = md.render(content);
  return (
    <div className={styles.theory}>
      <Htag tag="h3">{lesson.title}</Htag>
      <div className={cn(styles.content)}>{htmlContent}</div>
    </div>
  );
};
