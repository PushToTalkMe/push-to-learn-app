'use client';
import { useCoursesMyItems } from '@/hooks/courses';
import styles from './courses-my.module.css';
import cn from 'classnames';
import { Loader, Card } from '@/app/components/ui';

export function CoursesMy() {
  const { isPending, courses } = useCoursesMyItems();
  const isLoader = isPending;
  const isEmptyText = !isPending && courses.length === 0;
  const isCourses = courses.length > 0;
  return (
    <div className={cn(styles.page)}>
      {isLoader && <Loader />}
      {isEmptyText && (
        <div className="text-xl py-1 text-center">У вас нет начатых курсов</div>
      )}
      {isCourses &&
        courses.map((course) => (
          <Card
            type="myCourses"
            id={course.id}
            lessonId={course.historyLessonId}
            sectionId={course.historySectionId}
            author={course.author}
            title={course.title}
            duration={course.duration}
            tags={course.tags}
            price={course.price}
            countLessons={course.lessonCount}
            img={course.img}
            key={course.id}
          />
        ))}
    </div>
  );
}
