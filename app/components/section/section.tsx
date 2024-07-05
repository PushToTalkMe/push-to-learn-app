'use client';
import React, { useState } from 'react';
import { SectionProps } from './section.props';
import styles from './section.module.css';
import { Htag, LessonTab } from '..';
import ArrowIcon from '../button/arrow.svg';
import cn from 'classnames';

export function Section({
  title,
  sequence,
  lessonsStat,
}: SectionProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  const handleClickButton = () => {
    setOpened(() => !opened);
  };

  return (
    <div className={styles.section}>
      <button className={styles.title} onClick={handleClickButton}>
        <Htag tag="h3">
          {sequence}. {title}
        </Htag>
        <div
          className={cn(styles.arrow, {
            [styles.arrowDown]: opened === true,
          })}
        >
          <ArrowIcon />
        </div>
      </button>
      {lessonsStat.map((lesson) => {
        return (
          <LessonTab
            key={lesson.id}
            title={lesson.title}
            type={lesson.type}
            viewed={lesson.viewed}
            sequence={lesson.sequence}
            opened={opened}
          />
        );
      })}
    </div>
  );
}
