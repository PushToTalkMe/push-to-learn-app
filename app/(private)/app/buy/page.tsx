'use client';
import { Loader } from '@/app/components/loader/loader';
import { idValidation } from '@/helpers/id-validation';
import { useCoursesItem } from '@/hooks/courses/use-courses-item';
import { notFound, useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import cn from 'classnames';
import { Card } from '@/app/components/card/card';
import { Button } from '@/app/components';
import { useBuyCourse } from '@/hooks/buy';

export default function Buy() {
  const searchParams = useSearchParams();

  const courseId = searchParams.get('course');

  if (!courseId || !idValidation(courseId)) {
    notFound();
  }

  const { isPending, course, error } = useCoursesItem(+courseId);
  const {
    errorMessage,
    isPending: isPendingBuy,
    handleClick,
  } = useBuyCourse(+courseId);

  return (
    <>
      {isPending && <Loader />}
      {error && (
        <div className={cn(styles.error)}>
          <p>{error.data.message}</p>
          <p>Статус-код: {error.status}</p>
        </div>
      )}
      {course && (
        <div className={cn(styles.buy)}>
          <Card
            id={course.id}
            author={course.author}
            title={course.title}
            duration={course.duration}
            tags={course.tags}
            price={course.price}
            img="https://media.proglib.io/posts/2019/11/03/c236c35c960c7016e0d785b0558026c4.png"
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
