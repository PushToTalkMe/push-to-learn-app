import React from 'react';
import cn from 'classnames';
import styles from './comment.module.css';
import { CommentProps } from './comment.props';
import { P, Span } from '@/app/components/ui';
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
