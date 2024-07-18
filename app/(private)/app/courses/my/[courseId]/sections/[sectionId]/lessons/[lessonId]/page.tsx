'use client';
import {
  Exercise,
  Test,
  Theory,
  Comment,
  CommentForm,
  Htag,
  Button,
} from '@/app/components';
import { Loader } from '@/app/components/loader/loader';
import { useLessonItemWithComments } from '@/hooks/courses/use-lesson-item';
import styles from './page.module.css';
import cn from 'classnames';
import { useLessonViewed } from '@/hooks/courses/use-lesson-viewed';

export default function PageLesson({
  params,
}: {
  params: { courseId: number; sectionId: number; lessonId: number };
}) {
  const { lesson, comments, isPending, isSuccess } = useLessonItemWithComments(
    +params.courseId,
    +params.sectionId,
    +params.lessonId,
  );
  const {
    errorMessage,
    handleViewed,
    isPending: isPendingViewed,
    isSuccess: isSuccessViewed,
  } = useLessonViewed(+params.courseId, +params.sectionId, +params.lessonId);
  return (
    <>
      {isPending && <Loader />}
      {isSuccess && lesson && (
        <div className={cn(styles.page)}>
          {lesson.type === 'Theory' && <Theory lesson={lesson} />}
          {lesson.type === 'Exercise' && <Exercise lesson={lesson} />}
          {lesson.type === 'Test' && <Test lesson={lesson} />}
          {
            <div className={cn(styles.buttonContainer)}>
              {lesson.viewed ? (
                <Button
                  appearance="primary"
                  className={cn(styles.buttonViewed)}
                >
                  Урок пройден
                </Button>
              ) : (
                <Button
                  appearance="ghost"
                  className={cn(styles.buttonNotViewed)}
                  onClick={handleViewed}
                >
                  <p className={cn(styles.notViewed)}>✔</p>
                </Button>
              )}
            </div>
          }
          {errorMessage && (
            <div className={cn(styles.errorMessage)}>{errorMessage}</div>
          )}
          <Htag tag="h2">Комментарии</Htag>
          <CommentForm lessonId={+params.lessonId} />
          {comments && comments.length > 0 && (
            <div className={cn(styles.comments)}>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  firstName={comment.firstName}
                  lastName={comment.lastName}
                  createdAt={comment.createdAt}
                  text={comment.text}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
