'use client';
import { protectedPage } from '@/hoc/protected-page';
import { protectedPageAdmin } from '@/hoc/protected-page-admin';

function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default protectedPage(protectedPageAdmin(Layout));
