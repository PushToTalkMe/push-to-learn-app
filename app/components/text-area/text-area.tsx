import styles from './text-area.module.css';
import cn from 'classnames';
import { TextAreaProps } from './text-area.props';
import { useId, useState } from 'react';

export const TextArea = ({
  className,
  label,
  textAreaProps,
  textAreaValue,
}: TextAreaProps): JSX.Element => {
  const id = useId();
  return (
    <div className={cn(className, styles.textAreaContainer)}>
      <label
        htmlFor={id}
        className={cn(styles.label, {
          [styles.labelFilled]: textAreaValue,
        })}
      >
        {label}
      </label>
      <textarea id={id} className={cn(styles.textArea)} {...textAreaProps} />
    </div>
  );
};
