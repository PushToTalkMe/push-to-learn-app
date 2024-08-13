import styles from './span.module.css';
import { SpanProps } from './span.props';
import cn from 'classnames';

export const Span = ({
  children,
  className,
  type = 'text',
  ...props
}: SpanProps): JSX.Element => {
  return (
    <span
      className={cn(styles.span, className, {
        [styles.text]: type === 'text',
        [styles.number]: type === 'number',
      })}
      {...props}
    >
      {children}
    </span>
  );
};
