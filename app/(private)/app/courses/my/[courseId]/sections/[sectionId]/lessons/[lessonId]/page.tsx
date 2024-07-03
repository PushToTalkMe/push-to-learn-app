import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Страница урока',
};

export default async function PageLesson({
  params,
}: {
  params: { courseId: number; sectionId: number; lessonId: number };
}) {
  return <div>Урок</div>;
}
