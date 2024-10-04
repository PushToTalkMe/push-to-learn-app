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
  const { course, isPending, isSuccess, error } =
    useCourseWithSectionsForEdit(courseId);
  return (
    <>
      <div className={styles.content}>{children}</div>
      {isPending && <Loader />}
      {isSuccess && course && (
        <RightMenu
          expandedFromParent={true}
          title={<Htag tag="h1">Конструктор</Htag>}
          withoutButton={false}
          courseEdit={true}
          course={course}
        >
          <SectionsForAdmin
            courseId={course.id}
            sectionsWithLessons={course.sectionsWithLessons}
            paramsSectionId={sectionId}
          />
        </RightMenu>
      )}
      {error && <div>У вас нет доступа к этому курсу</div>}
    </>
  );
}
