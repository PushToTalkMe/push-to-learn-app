import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "small" | "medium";
  color?: "ghost" | "red" | "grey" | "green" | "primary";
  href?: "string";
  children: ReactNode;
}
