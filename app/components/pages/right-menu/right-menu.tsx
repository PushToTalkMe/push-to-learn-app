'use client';
import { useState } from 'react';
import styles from './right-menu.module.css';
import cn from 'classnames';
import { Button, ImageCourse } from '@/app/components/ui';
import { CourseInfoForEdit } from '@/app/components/pages';
import { BurgerIcon, CloseIcon } from '@/public/icons';
import { RightMenuProps } from './right-menu.props';

export const RightMenu = ({
  title,
  children,
  expandedFromParent,
  withoutButton,
  courseEdit,
  course,
}: RightMenuProps) => {
  const [expanded, setExpanded] = useState(expandedFromParent);
  return (
    <div
      className={cn(styles.rightMenu, {
        [styles.rightMenuExpanded]: expanded,
      })}
    >
      {expanded ? (
        <>
          <div
            className={cn(styles.header, {
              [styles.withoutButton]: withoutButton === true,
            })}
          >
            {title}
            {withoutButton ? (
              <></>
            ) : (
              <Button
                appearance="ghost"
                className={cn(styles.burger, {
                  [styles.buttonExpanded]: expanded,
                })}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                <CloseIcon />
              </Button>
            )}
          </div>
          {courseEdit && course ? <CourseInfoForEdit course={course} /> : <></>}
          <div className={styles.innerContainer}>{children}</div>
        </>
      ) : (
        <Button
          appearance="ghost"
          className={cn(styles.burger)}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <BurgerIcon />
        </Button>
      )}
    </div>
  );
};
