import { Htag } from '@/app/components/ui';
import { CoursesAll, RightMenu, Tabs } from '@/app/components/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Все курсы - PushToLearn',
};

export default function AllCourses() {
  return (
    <>
      <Tabs />
      <CoursesAll />
      <RightMenu title={<Htag tag="h2">Обновление</Htag>}></RightMenu>
    </>
  );
}
