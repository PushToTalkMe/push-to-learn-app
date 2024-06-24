import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans } from 'next/font/google';
import { AppProvider } from './providers/app.provider';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PushToLearn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
