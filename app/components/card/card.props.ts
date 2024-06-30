export interface CardProps {
  id: number;
  img: string;
  title: string;
  author?: string;
  duration?: string;
  tags: string[];
  countLessons?: number;
  price?: number;
  type?: 'myCourses' | 'notMyCourses' | 'buy';
  className?: string;
}
