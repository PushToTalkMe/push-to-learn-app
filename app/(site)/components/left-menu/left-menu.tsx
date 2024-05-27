'use client';
import { ILeftMenu } from '@/interfaces/left-menu.interface';
import styles from './left-menu.module.css';
import CoursesIcon from './icons/courses.svg';
import ProfileIcon from './icons/profile.svg';
import BurgerIcon from './icons/burger.svg';
import CloseIcon from './icons/close.svg';
import HelpIcon from './icons/help.svg';
import LogoutIcon from './icons/logout.svg';
import LogoIcon from './icons/logo.svg';
import Avatar from './icons/user.svg';
import AvatarMini from './icons/avatar_mini.svg';
import cn from 'classnames';
import { useState } from 'react';
import { Button } from '../button/button';

const menu: ILeftMenu[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon /> },
  { route: 'profile/my', name: 'Профиль', icon: <ProfileIcon /> },
  { route: 'help', name: 'Помощь', icon: <HelpIcon /> },
  { route: 'auth/login', name: 'Выход', icon: <LogoutIcon /> },
];

export default function LeftMenu() {
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      className={cn(styles.leftMenu, {
        [styles.leftMenuExpanded]: expanded,
      })}
    >
      <div className={styles.innerContainer}>
        <nav className={styles.sidebar}>
          <div className={styles.header}>
            <Button
              appearance="ghost"
              className={cn(styles.burger, {
                [styles.expanded]: expanded,
              })}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              {expanded ? <CloseIcon /> : <BurgerIcon />}
            </Button>
            {expanded ? <Avatar /> : <AvatarMini />}
          </div>

          {menu.map((menuItem) => (
            <div key={menuItem.route}>
              <a href={`/${menuItem.route}`}>
                <div className={cn(styles.menuItem)}>
                  {menuItem.icon}
                  {expanded ? <span>{menuItem.name}</span> : null}
                </div>
              </a>
            </div>
          ))}
          <LogoIcon />
        </nav>
      </div>
    </div>
  );
}
