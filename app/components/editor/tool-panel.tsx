import { EditorApi } from './useEditor';
import cn from 'classnames';
import styles from './tool-panel.module.css';

const ToolPanel = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div className={cn(styles.toolBar, className)}>
      {/* Здесь будет код для элементов управления */}
    </div>
  );
};

export default ToolPanel;
