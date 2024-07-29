import { Editor } from 'draft-js';
import { useEditorApi } from './context';
import cn from 'classnames';
import styles from './text-editor.module.css';
import { BLOCK_RENDER_MAP } from './config';

export const TextEditor = ({ className }: { className?: string }) => {
  const { state, onChange } = useEditorApi();

  return (
    <div className={cn(styles.textEditor, className)}>
      <Editor
        placeholder="Введите ваш текст"
        editorState={state}
        onChange={onChange}
        blockRenderMap={BLOCK_RENDER_MAP}
      />
    </div>
  );
};
