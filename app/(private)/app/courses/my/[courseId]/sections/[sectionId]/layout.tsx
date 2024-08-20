import { CoursesSectionsList } from '@/app/components/pages';
import { idValidation } from '@/helpers/id-validation';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Урок - PushToLearn',
};

export default function Layout({
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

  return (
    <CoursesSectionsList
      courseId={+params.courseId}
      sectionId={+params.sectionId}
    >
      {children}
    </CoursesSectionsList>
  );
}
