'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAccount } from '@/hooks/account/';
import { useSignOut } from '@/hooks/auth';
import styles from './left-menu.module.css';
import cn from 'classnames';
import {
  CoursesIcon,
  ProfileIcon,
  BurgerIcon,
  CloseIcon,
  HelpIcon,
  LogoutIcon,
  LogoIcon,
  DashboardIcon,
} from '@/public/icons';
import { Button, P, Loader, Avatar } from '@/app/components/ui';
import { ROUTES } from '@/constants/routes';
import { ILeftMenu } from '@/interfaces/left-menu.interface';

const menu: ILeftMenu[] = [
  {
    route: ROUTES.APP,
    name: 'Курсы',
    metaname: 'courses',
    icon: <CoursesIcon />,
  },
  {
    route: ROUTES.PROFILE,
    name: 'Профиль',
    metaname: 'profile',
    icon: <ProfileIcon />,
  },
  { route: ROUTES.HELP, name: 'Помощь', metaname: 'help', icon: <HelpIcon /> },
];

export default function LeftMenu() {
  const { account, isPending: isPendingAccount } = useAccount();
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
              {account && <Avatar url={account.avatar} />}
              <P size="large">
                {account ? (
                  account.firstName + ' ' + account.lastName
                ) : (
                  <Loader />
                )}
              </P>
            </div>
          ) : (
            <>{account && <Avatar url={account.avatar} mini={true} />}</>
          )}
        </div>
        <nav
          className={cn(styles.routes, {
            [styles.routesExpanded]: expanded,
          })}
        >
          {menu.map((menuItem) => (
            <Link
              href={`${menuItem.route}`}
              key={menuItem.route}
              className={cn(styles.route, {
                [styles.active]: pathname.includes(menuItem.metaname),
              })}
            >
              <div className={cn(styles.routeItem)}>
                {menuItem.icon}
                {expanded ? <span>{menuItem.name}</span> : null}
              </div>
            </Link>
          ))}
          {account.role === 'admin' && (
            <Link
              href={ROUTES.DASHBOARD}
              key={ROUTES.DASHBOARD}
              className={cn(styles.route, {
                [styles.active]: pathname.includes(ROUTES.DASHBOARD),
              })}
            >
              <div
                className={cn(styles.routeItem)}
                style={{ alignItems: 'center' }}
              >
                {<DashboardIcon />}
                {expanded ? <span>Панель управления</span> : null}
              </div>
            </Link>
          )}
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
