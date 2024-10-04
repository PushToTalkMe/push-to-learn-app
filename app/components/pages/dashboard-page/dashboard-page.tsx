'use client';
import { useInfo } from '@/hooks/account';
import { useState } from 'react';
import styles from './dashboard-page.module.css';
import cn from 'classnames';
import { Htag, Loader, Popup, Table } from '@/app/components/ui';
import { CourseCreateForm, ListCourses } from '@/app/components/pages';
import { CreateIcon, EditIcon } from '@/public/icons';
import { InfoAboutAllUsers } from '@/api/generated';

export function DashboardPage() {
  const [editCourse, setEditCourse] = useState(false);
  const { info, isPending, isSuccess, errorInfo } = useInfo();

  return (
    <div className={cn(styles.page)}>
      {editCourse ? (
        <Popup setExpanded={setEditCourse} background="body" editCourse={true}>
          <ListCourses />
        </Popup>
      ) : null}
      <div className={cn(styles.settings)}>
        <div className={cn(styles.edit)}>
          <div
            className={cn(styles.card)}
            onClick={() => setEditCourse(!editCourse)}
          >
            <EditIcon />
          </div>
          <Htag tag="h2">Редактировать курсы</Htag>
        </div>
      </div>
      <div className={cn(styles.usersDashboard)}>
        {isPending && <Loader />}
        {isSuccess && info && (
          <Table
            caption="Пользователи"
            headers={['Id', 'Почта', 'Имя', 'Курсы', 'Роль']}
            items={info}
            renderItem={(item: InfoAboutAllUsers) => (
              <tr className={cn(styles.tableRow)} key={item.userId}>
                <td className={cn(styles.tableCell)}>{item.userId}</td>
                <td className={cn(styles.tableCell)}>{item.email}</td>
                <td className={cn(styles.tableCell)}>
                  {item.firstName} {item.lastName}
                </td>
                <td className={cn(styles.tableCell)}>{item.countCourses}</td>
                <td className={cn(styles.tableCell)}>{item.role}</td>
              </tr>
            )}
          />
        )}
      </div>
    </div>
  );
}
