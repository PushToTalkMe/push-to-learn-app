import styles from './tag.module.css';
import { TagProps } from './tag.props';
import cn from 'classnames';

export const Tag = ({
  children,
  className,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div className={cn(styles.tag, className)} {...props}>
      {children}
    </div>
  );
};
