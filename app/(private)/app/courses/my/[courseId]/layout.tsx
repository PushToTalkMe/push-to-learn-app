import cn from 'classnames';
import styles from './layout.module.css';
import { Htag, RightMenu } from '@/app/components';
import { idValidation } from '@/helpers/id-validation';
import { notFound } from 'next/navigation';

export default function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { courseId: number };
}>) {
  if (!params.courseId || !idValidation(String(params.courseId))) {
    notFound();
  }
  return (
    <div className={cn(styles.layout)}>
      <main className={styles.main}>
        <div className={styles.innerContainer}>
          {children}
          <RightMenu>
            {<Htag tag="h2">Обновление</Htag>}
            {<Htag tag="h3">Версия 1.0</Htag>}
          </RightMenu>
        </div>
      </main>
    </div>
  );
}
