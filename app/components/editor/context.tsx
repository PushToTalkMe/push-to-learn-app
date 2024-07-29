import { createContext, useContext, FC, ReactNode } from 'react';
import { EditorApi, useEditor } from './useEditor';

const TextEditorContext = createContext<EditorApi | undefined>(undefined);

export const useEditorApi = () => {
  const context = useContext(TextEditorContext);
  if (context === undefined) {
    throw new Error('useEditorApi must be used within TextEditorProvider');
  }

  return context;
};

export const TextEditorProvider = ({ children }: { children: ReactNode }) => {
  const editorApi = useEditor();

  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  );
};
