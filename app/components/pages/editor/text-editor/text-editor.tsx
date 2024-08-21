'use client';
import dynamic from 'next/dynamic';
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
import { DragEvent } from 'react';
import { imageValidation } from '@/helpers/image-validation';

export const TextEditor = ({ className }: { className?: string }) => {
  const {
    state,
    onChange,
    handleKeyCommand,
    handleKeyBinding,
    blockRendererFn,
    insertImage,
    handlePastedFiles,
  } = useEditorApi();

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const files = imageValidation(event.dataTransfer.files);
    if (!files) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      insertImage(url);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div
      className={cn(styles.textEditor, className)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Editor
        editorState={state}
        onChange={onChange}
        blockRenderMap={BLOCK_RENDER_MAP}
        customStyleMap={CUSTOM_STYLE_MAP}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={handleKeyBinding}
        blockRendererFn={blockRendererFn}
        handlePastedFiles={handlePastedFiles}
      />
    </div>
  );
};
