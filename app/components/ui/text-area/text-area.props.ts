import {
  TextareaHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  PropsWithRef,
} from 'react';

export interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  textAreaProps?: PropsWithRef<TextareaHTMLAttributes<HTMLTextAreaElement>>;
  textAreaValue?: string;
}
