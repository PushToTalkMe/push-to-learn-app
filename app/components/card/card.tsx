import React from 'react';
import { CardProps } from './card.props';
import styles from './card.module.css';
import Link from 'next/link';
import { Button } from '../button/button';
import cn from 'classnames';
import Htag from '../htag/htag';
import { Tag } from '../tag/tag';
import { Span } from '../span/span';
import { P } from '../paragraph/paragraph';
import { CardFooter } from './card-footer';
import { Progress } from '..';
import { progressValue } from '@/helpers/progress-value';
export function Card({
  id,
  img,
  title,
  author,
  duration,
  tags,
  countLessons,
  type,
  className,
  sectionId,
  lessonId,
}: CardProps): JSX.Element {
  return (
    <div
      className={cn(styles.card, className, { [styles.buy]: type === 'buy' })}
    >
      <img className={cn(styles.img)} src={img} alt="card" />
      <div className={cn(styles.cardContent)}>
        {type === 'myCourses' ? <Progress courseId={id} /> : <></>}
        <Htag tag="h2">{title}</Htag>
        <P size="large" color="author">
          {author}
        </P>
        <Span className={cn(styles.duration)}>{duration}</Span>
        <div className={cn(styles.tags)}>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
        {countLessons && type === 'buy' ? (
          <P>Количество уроков: {countLessons}</P>
        ) : (
          <></>
        )}
      </div>
      <CardFooter
        type={type}
        courseId={+id}
        sectionId={sectionId}
        lessonId={lessonId}
      />
    </div>
  );
}
