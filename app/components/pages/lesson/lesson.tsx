'use client';
import { useLessonItemWithComments, useLessonViewed } from '@/hooks/courses';
import { LessonProps } from './lesson.props';
import styles from './lesson.module.css';
import cn from 'classnames';
import { Button, Htag, Loader, Comment } from '@/app/components/ui';
import { CommentForm, Exercise, Test, Theory } from '@/app/components/pages';

export function Lesson({ courseId, sectionId, lessonId }: LessonProps) {
  const { lesson, comments, isPending, isSuccess } = useLessonItemWithComments(
    courseId,
    sectionId,
    lessonId,
  );

  const {
    errorMessage,
    handleViewed,
    isPending: isPendingViewed,
    isSuccess: isSuccessViewed,
  } = useLessonViewed(courseId, sectionId, lessonId);

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
              {lesson.viewed || isSuccessViewed ? (
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
                  disabled={isPendingViewed}
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
          <CommentForm lessonId={lessonId} />
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
