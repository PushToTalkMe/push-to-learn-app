'use client';
import React, { useEffect, useState } from 'react';
import { SectionProps } from './section.props';
import styles from './section.module.css';
import { Htag, LessonTab } from '..';
import ArrowIcon from '../button/arrow.svg';
import cn from 'classnames';

export function Section({
  id,
  courseId,
  title,
  sequence,
  lessonsStat,
  paramsSectionId,
}: SectionProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  const handleClickButton = () => {
    setOpened(() => !opened);
  };

  useEffect(() => {
    if (paramsSectionId === id) {
      setOpened(true);
    }
  }, []);

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
      <div className={styles.lessons}>
        {lessonsStat.map((lesson) => {
          return (
            <LessonTab
              id={lesson.id}
              sectionId={id}
              courseId={courseId}
              key={lesson.id}
              title={lesson.title}
              type={lesson.type}
              viewed={lesson.viewed}
              sequence={lesson.sequence}
              sectionSequence={sequence}
              opened={opened}
            />
          );
        })}
      </div>
    </div>
  );
}
