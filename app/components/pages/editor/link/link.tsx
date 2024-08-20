import { ContentState } from 'draft-js';
import * as React from 'react';
import styles from './link.module.css';
import cn from 'classnames';
import { useEditorApi } from '../context';

type LinkProps = {
  children: React.ReactNode;
  contentState: ContentState;
  entityKey: string;
};

export const Link: React.FC<LinkProps> = ({
  contentState,
  entityKey,
  children,
}) => {
  /* Получаем url с помощью уникального ключа Entity */
  const { setEntityData } = useEditorApi();
  const { url } = contentState.getEntity(entityKey).getData();

  const handleClick = () => {
    const newUrl = prompt('URL:', url);
    if (newUrl) {
      setEntityData(entityKey, { url: newUrl });
    }
  };

  return (
    <a href={url} onClick={handleClick} className={cn(styles.link)}>
      {children}
    </a>
  );
};
