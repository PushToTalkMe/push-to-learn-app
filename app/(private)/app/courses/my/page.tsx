import { Htag } from '@/app/components/ui';
import { Tabs, CoursesMy, RightMenu } from '@/app/components/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мои курсы - PushToLearn',
};

export default function MyCourses() {
  return (
    <>
      <Tabs />
      <CoursesMy />
      <RightMenu title={<Htag tag="h2">Обновление</Htag>}>
        <Htag tag="h2">Обновление</Htag>
      </RightMenu>
    </>
  );
}
