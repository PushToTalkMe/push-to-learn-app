import { CourseForBuy } from '@/app/components/pages';
import { idValidation } from '@/helpers/id-validation';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Купить курс - PushToLearn',
};

export default function Buy({ params }: { params: { courseId: number } }) {
  if (!params.courseId || !idValidation(String(params.courseId))) {
    notFound();
  }
  return <CourseForBuy courseId={+params.courseId} />;
}
