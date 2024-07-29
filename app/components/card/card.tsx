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
import { ImageCourse, Progress } from '..';
import InDevelopingIcon from '@/public/icons/in-developing.svg';
export function Card({
  id,
  title,
  author,
  duration,
  tags,
  countLessons,
  price,
  type,
  className,
  inDeveloping,
  sectionId,
  lessonId,
}: CardProps): JSX.Element {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.buy]: type === 'buy',
      })}
    >
      {inDeveloping && (
        <div className={cn(styles.stub)}>
          <InDevelopingIcon />
        </div>
      )}
      <ImageCourse type={type} />
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
        {type === 'myCourses' ? <></> : <Htag tag="h3">{price} руб.</Htag>}
        {countLessons && type === 'buy' ? (
          <P>Количество уроков: {countLessons}</P>
        ) : (
          <></>
        )}
      </div>
      {inDeveloping ? (
        <div className={cn(styles.cardFooter, styles.cardFooterHtag)}>
          <Htag tag="h1">Курс в разработке</Htag>
        </div>
      ) : (
        <CardFooter
          type={type}
          courseId={+id}
          sectionId={sectionId}
          lessonId={lessonId}
        />
      )}
    </div>
  );
}
