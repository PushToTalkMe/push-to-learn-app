'use client';
export const Editor = dynamic(
  () => import('draft-js').then((mod) => mod.Editor),
  {
    ssr: false,
  },
);
import { useEditorApi } from '../context';
import cn from 'classnames';
import styles from './text-editor.module.css';
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from '../config';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

export const TextEditor = ({ className }: { className?: string }) => {
  const { state, onChange, handleKeyCommand, handleKeyBinding } =
    useEditorApi();

  return (
    <div className={cn(styles.textEditor, className)}>
      <Editor
        editorState={state}
        onChange={onChange}
        blockRenderMap={BLOCK_RENDER_MAP}
        customStyleMap={CUSTOM_STYLE_MAP}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={handleKeyBinding}
      />
    </div>
  );
};
