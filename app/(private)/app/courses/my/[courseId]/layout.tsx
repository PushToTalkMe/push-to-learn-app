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
import { useCoursesSectionsList } from '@/hooks/courses/use-courses-sections-list-query';
import { notFound } from 'next/navigation';

export default function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { courseId: number };
}>) {
  if (!params.courseId || !idValidation(String(params.courseId))) {
    notFound();
  }
  const { course, isPending, isSuccess } = useCoursesSectionsList(
    params.courseId,
  );
  return (
    <>
      {children}
      {isPending && <Loader />}
      {isSuccess && course && (
        <RightMenu
          title={
            <Progress
              countLessons={course.lessonCount}
              lessonCompleted={course.lessonCompleted}
            />
          }
        >
          {course.sectionsWithLessonsStat.map((section) => {
            return (
              <Section
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
