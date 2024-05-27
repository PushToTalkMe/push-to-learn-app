import { API } from '@/app/api';
import { Course } from '@/interfaces/course.interface';

export async function getCourse(index: string): Promise<Course | null> {
  const res = await fetch(API.courses.byIndex + index);
  if (!res.ok) {
    return null;
  }
  return res.json();
}
