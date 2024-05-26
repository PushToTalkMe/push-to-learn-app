import styles from './span.module.css';
import { SpanProps } from './span.props';
import cn from 'classnames';

export const Span = ({
  children,
  className,
  ...props
}: SpanProps): JSX.Element => {
  return (
    <span
      className={cn(styles.span, styles['gray-dark'], className)}
      {...props}
    >
      {children}
    </span>
  );
};
