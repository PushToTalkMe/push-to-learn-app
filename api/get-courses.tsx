import { API } from '@/app/api';
import { Course } from '@/interfaces/course.interface';

export async function getCourses(): Promise<Course[]> {
  await new Promise((res) =>
    setTimeout(() => {
      res('');
    }, 3000),
  );
  const res = await fetch(API.courses.findAll, {
    method: 'GET',
  });
  return res.json();
}
