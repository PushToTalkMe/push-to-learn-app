'use client';
import { notFound } from 'next/navigation';
import { useCoursesItem } from '@/hooks/courses';
import { useBuyCourse } from '@/hooks/buy';
import styles from './course-for-buy.module.css';
import cn from 'classnames';
import { CourseForBuyProps } from './course-for-buy.props';
import { Button, Card, Loader } from '@/app/components/ui';

export function CourseForBuy({ courseId }: CourseForBuyProps) {
  const { isPending, course, error } = useCoursesItem(courseId);
  const {
    errorMessage,
    isPending: isPendingBuy,
    handleClick,
  } = useBuyCourse(courseId);

  return (
    <>
      {isPending && <Loader />}
      {error && (
        <div className={cn(styles.error)}>
          <p>{error.data.message}</p>
          <p>Статус-код: {error.status}</p>
        </div>
      )}
      {course && course.inDeveloping
        ? notFound()
        : course && (
            <div className={cn(styles.buy)}>
              <Card
                id={course.id}
                author={course.author}
                title={course.title}
                duration={course.duration}
                tags={course.tags}
                price={course.price}
                img={course.img}
                key={course.id}
                countLessons={course.lessonCount}
                type={'buy'}
              />
              <div className={cn(styles.button)}>
                <Button
                  appearance="primary"
                  onClick={handleClick}
                  disabled={isPendingBuy}
                >
                  Купить
                </Button>
              </div>
              {errorMessage && <div>Ошибка покупки</div>}
            </div>
          )}
    </>
  );
}
