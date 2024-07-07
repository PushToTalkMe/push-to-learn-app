'use client';
import { Exercise, Test, Theory, Comment, CommentForm } from '@/app/components';
import { Loader } from '@/app/components/loader/loader';
import { idValidation } from '@/helpers/id-validation';
import { useLessonItem } from '@/hooks/courses/use-lesson-item';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import cn from 'classnames';

export default function PageLesson({
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
  const { lesson, isPending, isSuccess } = useLessonItem(
    params.courseId,
    params.sectionId,
    params.lessonId,
  );
  return (
    <>
      {isPending && <Loader />}
      {isSuccess && lesson && (
        <div className={cn(styles.page)}>
          {lesson.type === 'Theory' && <Theory lesson={lesson} />}
          {lesson.type === 'Exercise' && <Exercise lesson={lesson} />}
          {lesson.type === 'Test' && <Test lesson={lesson} />}
          {/* {lesson.comments.length > 0 &&
            lesson.comments.map((comment) => (
              <Comment
                firstName={comment.firstName}
                lastName={comment.lastName}
                createdAt={comment.createdAt}
                text={comment.text}
              />
            ))} */}
          <CommentForm />
        </div>
      )}
    </>
  );
}
