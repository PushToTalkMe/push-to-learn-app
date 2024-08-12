'use client';
import {
  Button,
  Htag,
  ImageCourse,
  RightMenu,
  SectionsForAdmin,
} from '@/app/components';
import { Loader } from '@/app/components/loader/loader';
import { idValidation } from '@/helpers/id-validation';
import { useCourseWithSectionsForEdit } from '@/hooks/courses';
import { notFound } from 'next/navigation';
import styles from './layout.module.css';
import cn from 'classnames';

export default function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { courseId: string; sectionId: string };
}>) {
  if (
    !params.courseId ||
    !params.sectionId ||
    !idValidation(params.courseId) ||
    !idValidation(params.sectionId)
  ) {
    notFound();
  }
  const { course, isPending, isSuccess } = useCourseWithSectionsForEdit(
    +params.courseId,
  );

  return (
    <>
      <div className={styles.content}>
        {isSuccess && course && (
          <div className={styles.courseInfo}>
            <ImageCourse type={'edit'} url={course.img} />
            <div className={styles.editInfo}>
              <div className={cn(styles.info, styles.title)}>
                <h3>Заголовок курса:</h3>
                {'\u00A0'}
                <p>{course.title}</p>
              </div>
              <div className={cn(styles.info, styles.duration)}>
                <h3>Длительность:</h3>
                {'\u00A0'}
                <p>{course.duration}</p>
              </div>
              <div className={cn(styles.info, styles.price)}>
                <h3>Цена:</h3>
                {'\u00A0'}
                <p>{course.price}</p>
              </div>
              <div className={cn(styles.info, styles.tags)}>
                <h3>Теги:</h3>
                {'\u00A0'}
                {course.tags.map((tag) => (
                  // Взять из course-create-form(Большую часть логики впринципе брать оттуда для всех остальных потенциальных input'ов изменения курса)
                  <p>{tag}</p>
                ))}
              </div>
            </div>
            <div className={styles.inDeveloping}>
              <h2>
                {course.inDeveloping
                  ? 'Курс находится в разработке'
                  : 'Курс опубликован'}
              </h2>
              {course.inDeveloping ? (
                <Button
                  appearance="primary"
                  className={styles.developButton}
                  onClick={() => {
                    console.log(course);
                  }}
                >
                  Опубликовать курс
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
      {isPending && <Loader />}
      {isSuccess && course && (
        <RightMenu
          expandedFromParent={true}
          title={<Htag tag="h1">Конструктор</Htag>}
          withoutButton={true}
        >
          <SectionsForAdmin
            courseId={course.id}
            sectionsWithLessons={course.sectionsWithLessons}
            paramsSectionId={+params.sectionId}
          />
        </RightMenu>
      )}
    </>
  );
}
