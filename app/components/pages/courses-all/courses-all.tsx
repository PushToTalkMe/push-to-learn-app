'use client';
import { useCoursesAllItems } from '@/hooks/courses';
import styles from './courses-all.module.css';
import cn from 'classnames';
import { Loader, Card } from '@/app/components/ui';

export function CoursesAll() {
  const { isPending, courses } = useCoursesAllItems();
  const isLoader = isPending;
  const isEmptyText = !isPending && courses.length === 0;
  const isCourses = courses.length > 0;
  return (
    <div className={cn(styles.page)}>
      {isLoader && <Loader />}
      {isEmptyText && (
        <div className="text-xl py-1 text-center">List is empty...</div>
      )}
      {isCourses &&
        courses.map((course) => (
          <Card
            type="notMyCourses"
            id={course.id}
            author={course.author}
            title={course.title}
            duration={course.duration}
            tags={course.tags}
            price={course.price}
            inDeveloping={course.inDeveloping}
            img={course.img}
            key={course.id}
          />
        ))}
    </div>
  );
}
