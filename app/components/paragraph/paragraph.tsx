import styles from "./paragraph.module.css";
import { ParagraphProps } from "./paragraph.props";
import cn from "classnames";

export const P = ({
  size = "medium",
  children,
  className,
  ...props
}: ParagraphProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.small]: size === "small",
        [styles.medium]: size === "medium",
        [styles.large]: size === "large",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
