'use client';
import styles from './page.module.css';
import { Loader } from '@/app/components/loader/loader';
import { useCoursesAllItems } from '@/hooks/courses/use-courses-all-items';
import { Card } from '@/app/components/card/card';
import { RightMenu, Htag } from '@/app/components';
import { Tabs } from '@/app/components/tabs/tabs';

export default function AllCourses() {
  const { isPending, courses } = useCoursesAllItems();
  const isLoader = isPending;
  const isEmptyText = !isPending && courses.length === 0;
  const isCourses = courses.length > 0;

  return (
    <>
      <Tabs />
      <div className={styles.page}>
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
      <RightMenu title={<Htag tag="h2">Обновление</Htag>}></RightMenu>
    </>
  );
}
