import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function Home() {
  return (
    <div>
      <Link href={ROUTES.ALL_COURSES}>Начать обучение</Link>
    </div>
  );
}
