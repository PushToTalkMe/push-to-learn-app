export interface CardProps {
  id: number;
  sectionId?: number;
  lessonId?: number;
  img: string;
  title: string;
  author?: string;
  duration?: string;
  tags: string[];
  countLessons?: number;
  lessonCompleted?: number | 0;
  inDeveloping?: boolean;
  type?: 'myCourses' | 'notMyCourses' | 'buy' | 'created';
  className?: string;
}

export interface CardFooterProps {
  courseId: number;
  sectionId?: number;
  lessonId?: number;
  inDeveloping?: boolean;
  type?: 'myCourses' | 'notMyCourses' | 'buy' | 'created';
}
