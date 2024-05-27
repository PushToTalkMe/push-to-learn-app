import styles from './page.module.css';
import { Metadata } from 'next';
import { Button, Htag, P, Tag } from '@/app/(site)/components';
import { RedirectType, redirect } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Главная страница',
  };
}

export default function Home() {
  const auth = true;
  if (auth) {
    redirect('/courses', RedirectType.replace);
  } else {
    redirect('/auth/login', RedirectType.replace);
  }
}
