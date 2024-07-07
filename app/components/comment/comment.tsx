import React from 'react';
import { CommentProps } from './comment.props';
import styles from './Comment.module.css';
import cn from 'classnames';

export const Comment = ({
  firstName,
  lastName,
  createdAt,
  text,
}: CommentProps) => {
  return (
    <div className={styles.comment}>
      <h4>{firstName + ' ' + lastName}</h4>
      <div className={cn(styles.content)}>{text}</div>
    </div>
  );
};
