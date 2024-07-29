'use client';
import { useInfo } from '@/hooks/account';
import styles from './page.module.css';
import CreateIcon from '@/public/icons/create.svg';
import EditIcon from '@/public/icons/edit.svg';
import { Htag, Loader, Popup, Table, ListCourses } from '@/app/components';
import { ROUTES } from '@/constants/routes';
import { useState } from 'react';
import { CourseCreateForm } from '@/app/components/form/course-create-form';
import { InfoAboutAllUsers } from '@/api/generated';

export default function Dashboard() {
  const [createCourse, setCreateCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(false);
  const { info, isPending, isSuccess, errorInfo } = useInfo();
  return (
    <div className={styles.page}>
      {createCourse ? (
        <Popup setExpanded={setCreateCourse} background="body">
          <CourseCreateForm />
        </Popup>
      ) : null}
      {editCourse ? (
        <Popup setExpanded={setEditCourse} background="body" editCourse={true}>
          <ListCourses />
        </Popup>
      ) : null}
      <div className={styles.settings}>
        <div className={styles.create}>
          <div
            className={styles.card}
            onClick={() => setCreateCourse(!createCourse)}
          >
            <CreateIcon />
          </div>
          <Htag tag="h2">Создать курс</Htag>
        </div>
        <div className={styles.edit}>
          <div
            className={styles.card}
            onClick={() => setEditCourse(!editCourse)}
          >
            <EditIcon />
          </div>
          <Htag tag="h2">Редактировать курсы</Htag>
        </div>
      </div>
      <div className={styles.usersDashboard}>
        {isPending && <Loader />}
        {isSuccess && info && (
          <Table
            caption="Пользователи"
            headers={['Id', 'Почта', 'Имя', 'Курсы', 'Роль']}
            items={info}
            renderItem={(item: InfoAboutAllUsers) => (
              <tr className={styles.tableRow} key={item.userId}>
                <td className={styles.tableCell}>{item.userId}</td>
                <td className={styles.tableCell}>{item.email}</td>
                <td className={styles.tableCell}>
                  {item.firstName} {item.lastName}
                </td>
                <td className={styles.tableCell}>{item.countCourses}</td>
                <td className={styles.tableCell}>{item.role}</td>
              </tr>
            )}
          />
        )}
      </div>
    </div>
  );
}
