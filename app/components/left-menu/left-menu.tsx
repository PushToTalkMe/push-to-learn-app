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
import { useEffect, useState } from 'react';
import { Button } from '../button/button';
import { P } from '..';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSignOut } from '@/hooks/auth';

const menu: ILeftMenu[] = [
  { route: 'app/courses', name: 'Курсы', icon: <CoursesIcon /> },
  { route: 'app/profile/my', name: 'Профиль', icon: <ProfileIcon /> },
  { route: 'app/help', name: 'Помощь', icon: <HelpIcon /> },
];

export default function LeftMenu() {
  const [expanded, setExpanded] = useState(false);
  const { isPending, signOut } = useSignOut();
  const pathname = usePathname();

  return (
    <div
      className={cn(styles.leftMenu, {
        [styles.leftMenuExpanded]: expanded,
      })}
    >
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <Button
            appearance="ghost"
            className={cn(styles.burger, {
              [styles.buttonExpanded]: expanded,
            })}
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? <CloseIcon /> : <BurgerIcon />}
          </Button>
          {expanded ? (
            <div className={styles.user}>
              <Avatar />
              <P size="medium">Влад Ильин</P>
            </div>
          ) : (
            <AvatarMini />
          )}
        </div>
        <nav
          className={cn(styles.routes, {
            [styles.routesExpanded]: expanded,
          })}
        >
          {menu.map((menuItem) => (
            <Link
              href={`/${menuItem.route}`}
              key={menuItem.route}
              className={cn(styles.route, {
                [styles.active]: pathname.includes(menuItem.route),
              })}
            >
              <div className={cn(styles.routeItem)}>
                {menuItem.icon}
                {expanded ? <span>{menuItem.name}</span> : null}
              </div>
            </Link>
          ))}
        </nav>
        <Button
          appearance="ghost"
          onClick={() => {
            signOut({});
          }}
        >
          {expanded ? (
            <div className={cn(styles.signOutExpanded)}>
              <LogoutIcon />
              <span>Выход</span>
            </div>
          ) : (
            <LogoutIcon />
          )}
        </Button>
        <div
          className={cn(styles.logo, {
            [styles.logoExpanded]: expanded,
          })}
        >
          {expanded ? (
            <>
              <LogoIcon />
              <span>PushToLearn</span>
            </>
          ) : (
            <LogoIcon />
          )}
        </div>
      </div>
    </div>
  );
}
