import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Страница не найдена</h2>
      <Link href={ROUTES.ALL_COURSES}>Вернуться на главную страницу</Link>
    </div>
  );
}
