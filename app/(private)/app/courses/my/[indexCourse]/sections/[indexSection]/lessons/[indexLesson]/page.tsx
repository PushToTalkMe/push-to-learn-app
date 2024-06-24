import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Страница урока',
};

export default async function PageLesson({
  params,
}: {
  params: { indexCourse: string; indexSection: string; indexLesson: string };
}) {
  const course = '';
  if (!course) {
    notFound();
  }
  return <div>Урок</div>;
}
