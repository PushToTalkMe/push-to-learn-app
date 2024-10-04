import { Htag } from '@/app/components/ui';
import {
  Tabs,
  CoursesMy,
  RightMenu,
  CoursesCreated,
} from '@/app/components/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мои курсы - PushToLearn',
};

export default function MyCourses() {
  return (
    <>
      <Tabs />
      <CoursesCreated />
      <RightMenu title={<Htag tag="h2">Обновление</Htag>}>
        <Htag tag="h2">Обновление</Htag>
      </RightMenu>
    </>
  );
}
