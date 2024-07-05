import styles from './input.module.css';
import cn from 'classnames';
import { InputProps } from './input.props';
import { useId, useState } from 'react';

export const Input = ({
  className,
  label,
  inputProps,
  inputValue,
}: InputProps): JSX.Element => {
  const id = useId();
  return (
    <div className={cn(className, styles.inputContainer)}>
      <label
        htmlFor={id}
        className={cn(styles.label, {
          [styles.labelFilled]: inputValue,
        })}
      >
        {label}
      </label>
      <input id={id} className={cn(styles.input)} {...inputProps} />
    </div>
  );
};
