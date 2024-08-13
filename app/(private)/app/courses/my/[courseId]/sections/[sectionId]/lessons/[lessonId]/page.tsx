import { Lesson } from '@/app/components/pages';

export default function PageLesson({
  params,
}: {
  params: { courseId: number; sectionId: number; lessonId: number };
}) {
  return (
    <Lesson
      courseId={+params.courseId}
      sectionId={+params.sectionId}
      lessonId={+params.lessonId}
    />
  );
}
