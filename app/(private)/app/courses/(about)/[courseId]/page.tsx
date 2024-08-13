import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { idValidation } from '@/helpers/id-validation';

export const metadata: Metadata = {
  title: 'О курсе - PushToLearn',
};

export default function About({ params }: { params: { courseId: number } }) {
  if (!params.courseId || !idValidation(String(params.courseId))) {
    notFound();
  }
  return <div>Курс с id: {params.courseId}</div>;
}
