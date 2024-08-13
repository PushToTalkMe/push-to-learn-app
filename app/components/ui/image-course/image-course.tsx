import React from 'react';
import styles from './image-course.module.css';
import { ImageCourseProps } from './image-course.props';
import cn from 'classnames';
import CourseImageDefault from '@/public/images/course-image-default.png';

export function ImageCourse({ url, type }: ImageCourseProps) {
  return (
    <div
      className={cn(styles.imgContainer, {
        [styles.buy]: type === 'buy',
        [styles.editContainer]: type === 'edit',
      })}
    >
      {url ? (
        <img
          className={cn(styles.img, {
            [styles.edit]: type === 'edit',
          })}
          src={`http://localhost:3000/courses/download/${url}`}
          alt="Картинка курса"
        />
      ) : (
        <img
          className={cn(styles.img, {
            [styles.edit]: type === 'edit',
          })}
          src={CourseImageDefault.src}
          alt="Картинка курса по умолчанию"
        />
      )}
    </div>
  );
}
