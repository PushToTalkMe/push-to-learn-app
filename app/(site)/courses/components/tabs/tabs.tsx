import { getCourses } from '@/api/get-courses';
import React from 'react';
import styles from './tabs.module.css';

async function Tabs() {
  const courses = await getCourses();
  return (
    <div className={styles.tabsContainer}>
      <div>{courses.length}</div>
    </div>
  );
}

export { Tabs };
