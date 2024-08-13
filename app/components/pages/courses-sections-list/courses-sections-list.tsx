'use client';
import { useCoursesSectionsList } from '@/hooks/courses';
import { CoursesSectionsListProps } from './courses-sections-list.props';
import { Loader } from '@/app/components/ui';
import { Progress, RightMenu, Section } from '@/app/components/pages';

export function CoursesSectionsList({
  courseId,
  sectionId,
  children,
}: CoursesSectionsListProps) {
  const { course, isPending, isSuccess } = useCoursesSectionsList(courseId);
  return (
    <>
      {children}
      {isPending && <Loader />}
      {isSuccess && course && (
        <RightMenu
          expandedFromParent={true}
          title={<Progress courseId={courseId} />}
        >
          {course.sectionsWithLessonsStat.map((section) => {
            return (
              <Section
                id={section.id}
                paramsSectionId={sectionId}
                courseId={course.id}
                key={section.id}
                title={section.title}
                sequence={section.sequence}
                lessonsStat={section.lessonsStat}
              />
            );
          })}
        </RightMenu>
      )}
    </>
  );
}
