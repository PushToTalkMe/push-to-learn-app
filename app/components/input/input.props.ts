import {
  InputHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  PropsWithRef,
} from 'react';

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
}
