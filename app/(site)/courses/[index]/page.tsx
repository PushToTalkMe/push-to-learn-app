import { getCourse } from '@/api/page';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Страница курса',
};

export default async function PageCourse({
  params,
}: {
  params: { index: string };
}) {
  const course = await getCourse(params.index);
  if (!course) {
    notFound();
  }
  return (
    <div>
      Курс по индексу {params.index}:{course.title}
    </div>
  );
}
