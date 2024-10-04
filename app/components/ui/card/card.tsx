import React from 'react';
import { CardProps } from './card.props';
import styles from './card.module.css';
import cn from 'classnames';
import { Tag, Htag, Span, P, ImageCourse } from '@/app/components/ui';
import { Progress } from '@/app/components/pages';
import { CardFooter } from './card-footer';
import { InDevelopingIcon } from '@/public/icons';

export function Card({
  id,
  title,
  author,
  duration,
  tags,
  img,
  countLessons,
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
      {inDeveloping && type !== 'created' && (
        <div className={cn(styles.stub)}>
          <InDevelopingIcon />
        </div>
      )}
      <ImageCourse type={type} url={img} />
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
        {countLessons && (type === 'buy' || type === 'created') ? (
          <P>Количество уроков: {countLessons}</P>
        ) : (
          <></>
        )}
      </div>
      {inDeveloping && type !== 'created' ? (
        <div className={cn(styles.cardFooter, styles.cardFooterHtag)}>
          <Htag tag="h1">Курс в разработке</Htag>
        </div>
      ) : (
        <CardFooter
          type={type}
          inDeveloping={inDeveloping}
          courseId={+id}
          sectionId={sectionId}
          lessonId={lessonId}
        />
      )}
    </div>
  );
}
