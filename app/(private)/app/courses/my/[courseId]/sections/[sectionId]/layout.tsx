'use client';
import {
  Htag,
  LessonTab,
  Progress,
  RightMenu,
  Section,
} from '@/app/components';
import { Loader } from '@/app/components/loader/loader';
import { idValidation } from '@/helpers/id-validation';
import { useCoursesSectionsList } from '@/hooks/courses/use-courses-sections-list';
import { notFound } from 'next/navigation';

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
  const { course, isPending, isSuccess } = useCoursesSectionsList(
    +params.courseId,
  );
  return (
    <>
      {children}
      {isPending && <Loader />}
      {isSuccess && course && (
        <RightMenu
          expandedFromParent={true}
          title={<Progress courseId={+params.courseId} />}
        >
          {course.sectionsWithLessonsStat.map((section) => {
            return (
              <Section
                id={section.id}
                paramsSectionId={+params.sectionId}
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
