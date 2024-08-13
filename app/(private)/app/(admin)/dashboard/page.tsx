import { DashboardPage } from '@/app/components/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Панель управления - PushToLearn',
};

export default function Dashboard() {
  return <DashboardPage />;
}
