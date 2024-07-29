'use client';
import { useCoursesAll } from '@/hooks/courses';
import { Loader, Table, Time, Date } from '..';
import styles from './list-courses.module.css';
import { CourseDto, CourseDtoLastLessons } from '@/api/generated';
import { dateExecute } from '@/helpers/date-execute';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export function ListCourses() {
  const router = useRouter();
  const { courses, isPending, isSuccess, errorInfo } = useCoursesAll();
  return (
    <>
      {isPending && <Loader />}
      {isSuccess && courses && (
        <Table
          caption="Список курсов"
          headers={[
            'Id',
            'Название',
            'Автор',
            'Цена',
            'Состояние',
            'Дата последнего обновления',
          ]}
          items={courses}
          renderItem={(item: CourseDtoLastLessons) => (
            <tr
              className={styles.tableRow}
              key={item.id}
              onClick={() =>
                router.push(
                  ROUTES.EDIT_COURSE +
                    `/${item.id}` +
                    `/sections/${item.lastSectionId}` +
                    `/lessons/${item.lastLessonId}`,
                )
              }
            >
              <td className={styles.tableCell}>{item.id}</td>
              <td className={styles.tableCell}>{item.title}</td>
              <td className={styles.tableCell}>{item.author}</td>
              <td className={styles.tableCell}>{item.price}</td>
              <td className={styles.tableCell}>
                {item.inDeveloping ? <>В разработке</> : <>Выпущен</>}
              </td>
              <td className={styles.tableCell}>
                <Date value={item.updatedAt} /> <Time value={item.updatedAt} />
              </td>
            </tr>
          )}
        />
      )}
    </>
  );
}
