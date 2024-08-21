import {
  AtomicBlockUtils,
  CompositeDecorator,
  ContentBlock,
  DraftEditorCommand,
  DraftEntityMutability,
  DraftHandleValue,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
  RichUtils,
} from 'draft-js';
import {
  useState,
  useMemo,
  useCallback,
  KeyboardEvent,
  ClipboardEvent,
} from 'react';
import {
  BlockType,
  EntityType,
  INLINE_STYLES_CODES_FONT_SIZE,
  InlineStyle,
  InlineStyleFontSize,
} from './constants';
import { LinkDecorator } from './link';
import { KeyCommand } from './config';
import { Image } from './image/image';
import { ImageProps } from './image/image.props';
import { imageValidation } from '@/helpers/image-validation';

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
  toggleBlockType: (blockType: BlockType) => void;
  currentBlockType: BlockType;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
  toggleInlineStyleFontSize: (inlineStyleFontSize: InlineStyleFontSize) => void;
  currentFontSize: () => InlineStyleFontSize | '';
  addLink: (url: string) => void;
  setEntityData: (entityKey: string, data: any) => void;
  handleKeyCommand: (
    command: DraftEditorCommand,
    editorState: EditorState,
  ) => 'handled' | 'not-handled';
  handleKeyBinding: (e: KeyboardEvent) => KeyCommand | null;
  blockRendererFn: (contentBlock: ContentBlock) => {
    component: ({ block, contentState }: ImageProps) => JSX.Element;
    editable: boolean;
  } | null;
  insertImage: (url: string) => void;
  handlePastedFiles: (files: Blob[]) => DraftHandleValue;
};

const decorator = new CompositeDecorator([LinkDecorator]);

export const useEditor = (html?: string): EditorApi => {
  const [state, setState] = useState(() => {
    return EditorState.createEmpty(decorator);
  });

  const toggleBlockType = useCallback((blockType: BlockType) => {
    setState((currentState) =>
      RichUtils.toggleBlockType(currentState, blockType),
    );
  }, []);

  const currentBlockType = useMemo(() => {
    const selection = state.getSelection();
    const content = state.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    return block.getType() as BlockType;
  }, [state]);

  const toggleInlineStyle = useCallback((inlineStyle: InlineStyle) => {
    setState((currentState) =>
      RichUtils.toggleInlineStyle(currentState, inlineStyle),
    );
  }, []);

  function removeFontSizeStylesFromSelection(editorState: EditorState) {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    let newContentState = contentState;

    INLINE_STYLES_CODES_FONT_SIZE.forEach((fontSize) => {
      newContentState = Modifier.removeInlineStyle(
        newContentState,
        selectionState,
        fontSize,
      );
    });

    return EditorState.push(
      editorState,
      newContentState,
      'change-inline-style',
    );
  }

  function applyFontSizeToSelection(
    editorState: EditorState,
    newFontSize: InlineStyleFontSize,
  ) {
    const stateWithoutFontSizes =
      removeFontSizeStylesFromSelection(editorState);

    const newContentState = Modifier.applyInlineStyle(
      stateWithoutFontSizes.getCurrentContent(),
      stateWithoutFontSizes.getSelection(),
      newFontSize,
    );

    return EditorState.push(
      stateWithoutFontSizes,
      newContentState,
      'change-inline-style',
    );
  }

  function applyFontSizeToFutureText(
    editorState: EditorState,
    newFontSize: InlineStyleFontSize,
  ) {
    let currentStyle = editorState.getCurrentInlineStyle();

    INLINE_STYLES_CODES_FONT_SIZE.forEach((fontSize) => {
      if (currentStyle.has(fontSize)) {
        currentStyle = currentStyle.remove(fontSize);
      }
    });

    currentStyle = currentStyle.add(newFontSize);

    const newEditorState = EditorState.setInlineStyleOverride(
      editorState,
      currentStyle,
    );

    return newEditorState;
  }

  const toggleInlineStyleFontSize = useCallback(
    (inlineStyleFontSize: InlineStyleFontSize) => {
      const selectionState = state.getSelection();

      const selectionLength =
        selectionState.getEndOffset() - selectionState.getStartOffset();

      let newState;

      if (selectionLength > 0) {
        newState = applyFontSizeToSelection(state, inlineStyleFontSize);
      } else {
        newState = applyFontSizeToFutureText(state, inlineStyleFontSize);
      }

      setState(newState);
    },
    [state],
  );

  const hasInlineStyle = useCallback(
    (inlineStyle: InlineStyle) => {
      const currentStyle = state.getCurrentInlineStyle();
      return currentStyle.has(inlineStyle);
    },
    [state],
  );

  const currentFontSize = useCallback(() => {
    const currentStyle = state.getCurrentInlineStyle();
    const currentFontSize: InlineStyleFontSize[] = currentStyle
      .toJS()
      .filter((style: string) => style.match(/\d{1,}/));
    return currentFontSize[0] ? currentFontSize[0] : '';
  }, [state]);

  const addEntity = useCallback(
    (
      entityType: EntityType,
      mutability: DraftEntityMutability,
      data: Record<string, string>,
    ) => {
      setState((currentState) => {
        /* Получаем текущий контент */
        const contentState = currentState.getCurrentContent();
        /* Создаем Entity с данными */
        const contentStateWithEntity = contentState.createEntity(
          entityType,
          mutability,
          data,
        );
        /* Получаем уникальный ключ Entity */
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        if (entityType === EntityType.link) {
          /* Обьединяем текущее состояние с новым */
          const newState = EditorState.set(currentState, {
            currentContent: contentStateWithEntity,
          });
          /* Вставляем ссылку в указанное место */
          return RichUtils.toggleLink(
            newState,
            newState.getSelection(),
            entityKey,
          );
        } else {
          const newState = EditorState.set(currentState, {
            currentContent: contentStateWithEntity,
          });
          return AtomicBlockUtils.insertAtomicBlock(newState, entityKey, ' ');
        }
      });
    },
    [],
  );

  const addLink = useCallback(
    (url: string) => {
      addEntity(EntityType.link, 'MUTABLE', { url });
    },
    [addEntity],
  );

  const insertImage = useCallback(
    (url: string) => {
      addEntity(EntityType.image, 'IMMUTABLE', { src: url });
    },
    [addEntity],
  );

  const blockRendererFn = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === 'atomic') {
      return {
        component: Image,
        editable: false,
      };
    }
    return null;
  };

  const setEntityData = useCallback((entityKey: string, data: any) => {
    setState((currentState) => {
      /* Получаем текущий контент */
      const content = currentState.getCurrentContent();
      /* Объединяем текущие данные Entity с новыми */
      const contentStateUpdated = content.mergeEntityData(entityKey, data);
      /* Обновляем состояние редактора с указанием типа изменения */
      return EditorState.push(
        currentState,
        contentStateUpdated,
        'apply-entity',
      );
    });
  }, []);

  const handleKeyCommand = useCallback(
    (command: KeyCommand, editorState: EditorState) => {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const key = selectionState.getStartKey();
      const block = contentState.getBlockForKey(key);

      if (command === 'accent') {
        toggleInlineStyle(InlineStyle.accent);
        return 'handled';
      }

      if (command === 'tab') {
        const newContentState = Modifier.insertText(
          contentState,
          selectionState,
          '    ',
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          'adjust-depth',
        );
        setState(newEditorState);
        console.log(newEditorState);
        return 'handled';
      }

      if (command === 'split') {
        const newContentState = Modifier.insertText(
          contentState,
          selectionState,
          '\n',
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          'split-block',
        );
        setState(newEditorState);
        return 'handled';
      }

      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        setState(newState);
        return 'handled';
      }

      return 'not-handled';
    },
    [],
  );

  const handleKeyBinding = useCallback((e: KeyboardEvent) => {
    /* Проверяем нажата ли клавиша q + ctrl/cmd */
    if (e.key === 'q' && KeyBindingUtil.hasCommandModifier(e)) {
      return 'accent';
    }

    if (e.key === 'Enter' && e.shiftKey) {
      return 'split';
    }

    if (e.key === 'Tab') {
      return 'tab';
    }

    return getDefaultKeyBinding(e);
  }, []);

  function handlePastedFiles(files: Blob[]) {
    const curFiles = imageValidation(files);
    if (!curFiles) {
      return 'not-handled';
    }
    const reader = new FileReader();
    const file = files[0];
    reader.onload = () => {
      const url = reader.result as string;
      insertImage(url);
    };
    reader.readAsDataURL(file);
    return 'handled';
  }

  return useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      toggleInlineStyleFontSize,
      hasInlineStyle,
      addLink,
      setEntityData,
      handleKeyCommand,
      handleKeyBinding,
      currentFontSize,
      blockRendererFn,
      insertImage,
      handlePastedFiles,
    }),
    [state],
  );
};
