'use client';
import { idValidation } from '@/helpers/id-validation';
import { notFound } from 'next/navigation';

export default function About({ params }: { params: { courseId: number } }) {
  if (!params.courseId || !idValidation(String(params.courseId))) {
    notFound();
  }
  return <div>Курс с id: {params.courseId}</div>;
}
