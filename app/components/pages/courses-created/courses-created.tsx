'use client';
import { useCoursesCreatedItems } from '@/hooks/courses';
import styles from './courses-created.module.css';
import cn from 'classnames';
import { Loader, Card, Popup, Htag } from '@/app/components/ui';
import { useState } from 'react';
import { CourseCreateForm } from '@/app/components/pages';
import { CreateIcon } from '@/public/icons';

export function CoursesCreated() {
  const [createCourse, setCreateCourse] = useState(false);
  const { isPending, courses } = useCoursesCreatedItems();
  const isLoader = isPending;
  const isEmptyText = !isPending && courses.length === 0;
  const isCourses = courses.length > 0;
  return (
    <div className={cn(styles.page)}>
      {createCourse ? (
        <Popup setExpanded={setCreateCourse} background="body">
          <CourseCreateForm />
        </Popup>
      ) : null}
      {isLoader && <Loader />}
      {isEmptyText && <div>У вас нет собственных курсов</div>}
      <div
        className={cn(styles.cardCreate)}
        onClick={() => setCreateCourse(!createCourse)}
      >
        <CreateIcon />
        <Htag tag="h1">Создать курс</Htag>
      </div>
      {isCourses &&
        courses.map((course) => (
          <Card
            type="created"
            id={course.id}
            lessonId={course.lastLessonId}
            sectionId={course.lastSectionId}
            inDeveloping={course.inDeveloping}
            author={course.author}
            title={course.title}
            duration={course.duration}
            tags={course.tags}
            countLessons={course.lessonCount}
            img={course.img}
            key={course.id}
          />
        ))}
    </div>
  );
}
