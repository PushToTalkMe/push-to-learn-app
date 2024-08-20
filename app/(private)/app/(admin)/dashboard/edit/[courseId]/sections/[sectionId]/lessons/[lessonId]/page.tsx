import { idValidation } from '@/helpers/id-validation';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import { LessonEdit } from '@/app/components/pages';

export default function CreateLessons({
  params,
}: {
  params: { lessonId: number };
}) {
  if (!params.lessonId || !idValidation(String(params.lessonId))) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <LessonEdit lessonId={+params.lessonId} />
    </div>
  );
}
