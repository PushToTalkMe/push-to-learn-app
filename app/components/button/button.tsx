import { Span } from '../span/span';
import styles from './button.module.css';
import { ButtonProps } from './button.props';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';

export const Button = ({
  appearance,
  children,
  className,
  arrow = 'none',
  count = 'none',
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(className, styles.button, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
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
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
