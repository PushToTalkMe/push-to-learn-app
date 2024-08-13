import React from 'react';
import { AvatarProps } from './avatar.props';
import styles from './avatar.module.css';
import cn from 'classnames';
import { AvatarDefaultIcon, AvatarMiniDefaultIcon } from '@/public/icons';

export function Avatar({ url, mini }: AvatarProps) {
  return (
    <div
      className={cn(styles.imgContainer, {
        [styles.imgMiniContainer]: mini === true,
      })}
    >
      {url ? (
        <img
          className={cn(styles.img, {
            [styles.imgMini]: mini === true,
          })}
          src={`http://localhost:3000/account/download/${url}`}
        />
      ) : mini ? (
        <AvatarMiniDefaultIcon />
      ) : (
        <AvatarDefaultIcon />
      )}
    </div>
  );
}
