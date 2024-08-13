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
  price?: number;
  inDeveloping?: boolean;
  type?: 'myCourses' | 'notMyCourses' | 'buy';
  className?: string;
}

export interface CardFooterProps {
  courseId: number;
  sectionId?: number;
  lessonId?: number;
  type?: 'myCourses' | 'notMyCourses' | 'buy';
}
