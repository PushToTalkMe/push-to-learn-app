'use client';
import { protectedPageAdmin } from '@/hoc/protected-page-admin';

function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default protectedPageAdmin(Layout);
