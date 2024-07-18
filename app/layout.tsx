import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from './providers/app.provider';
import localFont from 'next/font/local';

const notoSans = localFont({
  src: [
    {
      path: '../public/font/NotoSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/font/NotoSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/font/NotoSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/font/NotoSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/font/NotoSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/font/NotoSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/NotoSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/font/NotoSans-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/font/NotoSans-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
  ],
});

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
