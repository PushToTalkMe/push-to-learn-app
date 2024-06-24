'use client';
import { queryClient } from '../../api/query-client'; // Будет хранить в себе весь кэш приложения
import { QueryClientProvider } from '@tanstack/react-query'; //  Будет оборачивать все приложение наше как раз этим query-client
import { ReactNode } from 'react';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
