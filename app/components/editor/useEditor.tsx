import { EditorState, RichUtils } from 'draft-js';
import { useState, useMemo, useCallback } from 'react';
import { BlockType } from './config';

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
  toggleBlockType: (blockType: BlockType) => void;
  currentBlockType: BlockType;
};

export const useEditor = (html?: string): EditorApi => {
  const [state, setState] = useState(() => EditorState.createEmpty());

  const toggleBlockType = useCallback((blockType: BlockType) => {
    setState((currentState) =>
      RichUtils.toggleBlockType(currentState, blockType),
    );
  }, []);

  const currentBlockType = useMemo(() => {
    /* Шаг 1 */
    const selection = state.getSelection();
    /* Шаг 2 */
    const content = state.getCurrentContent();
    /* Шаг 3 */
    const block = content.getBlockForKey(selection.getStartKey());
    /* Шаг 4 */
    return block.getType() as BlockType;
  }, [state]);

  return useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
    }),
    [state],
  );
};
