'use client';
import { createContext, useContext, ReactNode } from 'react';
import { EditorApi, useEditor } from './useEditor';

const TextEditorContext = createContext<EditorApi | undefined>(undefined);

export const useEditorApi = () => {
  const context = useContext(TextEditorContext);
  if (context === undefined) {
    throw new Error('useEditorApi должен быть внутри TextEditorProvider');
  }

  return context;
};

export const TextEditorProvider = ({
  children,
  content,
  readOnly,
}: {
  children: ReactNode;
  content: string;
  readOnly: boolean;
}) => {
  const editorApi = useEditor(readOnly, content);

  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  );
};
