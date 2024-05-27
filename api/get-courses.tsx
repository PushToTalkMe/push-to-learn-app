import { API } from '@/app/api';
import { Course } from '@/interfaces/course.interface';

export async function getCourses(): Promise<Course[]> {
  const res = await fetch(API.courses.findAll, {
    method: 'GET',
  });
  return res.json();
}
