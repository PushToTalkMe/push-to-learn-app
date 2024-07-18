import React from 'react';
import styles from './avatar.module.css';
import { AvatarProps } from './avatar.props';
import cn from 'classnames';
import AvatarDefault from './icons/avatar-default.svg';
import AvatarMiniDefault from './icons/avatar-mini-default.svg';

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
        <AvatarMiniDefault />
      ) : (
        <AvatarDefault />
      )}
    </div>
  );
}
