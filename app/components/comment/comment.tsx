import React from 'react';
import { CommentProps } from './comment.props';
import styles from './comment.module.css';
import cn from 'classnames';
import { P, Span } from '..';
import { dateExecute } from '@/helpers/date-execute';

export const Comment = ({
  firstName,
  lastName,
  createdAt,
  text,
}: CommentProps) => {
  const date = dateExecute(createdAt);
  return (
    <div className={cn(styles.comment)}>
      <div className={cn(styles.header)}>
        <h4>{firstName + ' ' + lastName}</h4>
        {date && (
          <Span>
            {date.day}.{date.month}.{date.year}
          </Span>
        )}
      </div>
      <div className={cn(styles.text)}>
        <P>{text}</P>
      </div>
    </div>
  );
};
