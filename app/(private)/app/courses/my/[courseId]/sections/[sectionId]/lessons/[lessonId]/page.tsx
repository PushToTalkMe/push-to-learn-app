import { idValidation } from '@/helpers/id-validation';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: `Урок`,
};

export default async function PageLesson({
  params,
}: {
  params: { courseId: number; sectionId: number; lessonId: number };
}) {
  if (
    !params.courseId ||
    !params.sectionId ||
    !params.lessonId ||
    !idValidation(String(params.courseId)) ||
    !idValidation(String(params.sectionId)) ||
    !idValidation(String(params.lessonId))
  ) {
    notFound();
  }
  return <div>Урок</div>;
}
