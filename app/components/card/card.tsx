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
  lessonCompleted,
  price,
  type,
  className,
}: CardProps): JSX.Element {
  return (
    <div
      className={cn(styles.card, className, { [styles.buy]: type === 'buy' })}
    >
      <img className={cn(styles.img)} src={img} alt="card" />
      <div className={cn(styles.cardContent)}>
        {(lessonCompleted || lessonCompleted === 0) && countLessons ? (
          <div className={styles.lessonCompleted}>
            <Span>
              {lessonCompleted}/{countLessons}
            </Span>
            <Progress value={progressValue(lessonCompleted, countLessons)} />
          </div>
        ) : (
          <></>
        )}
        <Htag tag="h2">{title}</Htag>
        <P size="large" color="author">
          {'Влад Ильин'}
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
      <CardFooter type={type} courseId={+id} />
    </div>
  );
}
