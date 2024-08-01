import styles from './popup.module.css';
import cn from 'classnames';
import { PopupProps } from './popup.props';

export const Popup = ({
  children,
  background,
  avatar,
  editCourse,
  createLessons,
  setExpanded,
}: PopupProps): JSX.Element => {
  return (
    <div className={cn(styles.popup)}>
      <div
        className={cn(styles.shadowBack)}
        onClick={() => setExpanded(false)}
      ></div>
      <div
        className={cn(styles.module, {
          [styles.body]: background === 'body',
          [styles.avatar]: avatar === true,
          [styles.editCourse]: editCourse === true,
          [styles.createLessons]: createLessons === true,
        })}
      >
        {children}
      </div>
    </div>
  );
};
