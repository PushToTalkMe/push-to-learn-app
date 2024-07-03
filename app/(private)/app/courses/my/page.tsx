'use client';
import { Htag, P, RightMenu } from '../../../../components';
import styles from './page.module.css';
import { Loader } from '@/app/components/loader/loader';
import { useCoursesMyItems } from '@/hooks/courses/use-courses-my-items';
import { Card } from '@/app/components/card/card';
import { Tabs } from '@/app/components/tabs/tabs';

// export const metadata: Metadata = {
//   title: 'Курсы',
// };

export default function MyCourses() {
  const { isPending, courses } = useCoursesMyItems();
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
              type="myCourses"
              id={course.id}
              author={course.author}
              title={course.title}
              duration={course.duration}
              tags={course.tags}
              price={course.price}
              lessonCompleted={279}
              countLessons={course.lessonCount}
              img="https://media.proglib.io/posts/2019/11/03/c236c35c960c7016e0d785b0558026c4.png"
              key={course.id}
            />
          ))}
      </div>
      <RightMenu>
        {<Htag tag="h2">Обновление</Htag>}
        {<Htag tag="h3">Версия 1.0</Htag>}
      </RightMenu>
    </>
  );
}
