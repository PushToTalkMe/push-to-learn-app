import styles from './button.module.css';
import cn from 'classnames';
import { ButtonProps } from './button.props';
import { Span } from '@/app/components/ui';
import { AngleDefaultIcon } from '@/public/icons';

export const Button = ({
  appearance,
  children,
  className,
  arrow = 'none',
  count = 'none',
  disabled,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(className, styles.button, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
        [styles.disabled]: disabled === true,
      })}
      {...props}
    >
      {children}
      {count !== 'none' && <Span>{count}</Span>}
      {arrow !== 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow == 'down',
          })}
        >
          <AngleDefaultIcon />
        </span>
      )}
    </button>
  );
};
