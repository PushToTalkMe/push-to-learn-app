import styles from './tag.module.css';
import { TagProps } from './tag.props';
import cn from 'classnames';

export const Tag = ({
  children,
  size = 'small',
  className,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
      })}
      {...props}
    >
      {children}
    </div>
  );
};
