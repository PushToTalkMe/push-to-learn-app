import React from 'react';
import styles from './loader.module.css';
import Htag from '../htag/htag';

export function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
      <Htag tag="h1">Загрузка</Htag>
    </div>
  );
}
