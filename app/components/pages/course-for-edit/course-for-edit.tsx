'use client';
import { useCourseWithSectionsForEdit } from '@/hooks/courses';
import cn from 'classnames';
import styles from './course-for-edit.module.css';
import { CourseForEditProps } from './course-for-edit.props';
import { Button, Htag, ImageCourse, Loader } from '@/app/components/ui';
import { RightMenu, SectionsForAdmin } from '@/app/components/pages';

export function CourseForEdit({
  courseId,
  sectionId,
  children,
}: CourseForEditProps) {
  const { course, isPending, isSuccess } =
    useCourseWithSectionsForEdit(courseId);
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
            paramsSectionId={sectionId}
          />
        </RightMenu>
      )}
    </>
  );
}
