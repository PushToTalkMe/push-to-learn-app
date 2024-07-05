import React from 'react';
import { LessonTabProps } from './lesson-tab.props';
import styles from './lesson-tab.module.css';
import { Htag } from '..';
import cn from 'classnames';

export function LessonTab({
  title,
  sequence,
  type,
  viewed,
  opened,
}: LessonTabProps): JSX.Element {
  return (
    <div
      className={cn(styles.lessonTab, {
        [styles.opened]: opened === true,
      })}
    >
      <button className={styles.title}>
        <Htag tag="h3">
          {sequence}. {title}
        </Htag>
      </button>
    </div>
  );
}
