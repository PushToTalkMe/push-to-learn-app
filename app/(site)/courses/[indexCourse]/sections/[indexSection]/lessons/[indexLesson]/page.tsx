import { getCourse } from '@/api/page';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Страница курса',
};

export default async function PageCourse({
  params,
}: {
  params: { indexCourse: string; indexSection: string; indexLesson: string };
}) {
  const course = await getCourse(params.indexCourse);
  if (!course) {
    notFound();
  }
  return (
    <div>
      Курс по индексу {params.indexCourse}:{course.title}
    </div>
  );
}
