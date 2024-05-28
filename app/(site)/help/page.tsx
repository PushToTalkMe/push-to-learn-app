'use client';
import styles from './page.module.css';
import { Metadata } from 'next';
import { Button, Htag, P, Tag } from '@/app/(site)/components';
import { RedirectType, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [state, setState] = useState({
    token: '',
  });
  useEffect(() => {
    const state = localStorage.getItem('state');
    if (state) {
      setState({ ...JSON.parse(state) });
    }
  }, []);

  // state.token
  true
    ? redirect('/courses', RedirectType.replace)
    : redirect('/auth/login', RedirectType.replace);
}
