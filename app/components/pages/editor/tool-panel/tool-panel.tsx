'use client';
import cn from 'classnames';
import styles from './tool-panel.module.css';
import { useEditorApi } from '../context';
import {
  BLOCK_TYPES_CODES,
  BLOCK_TYPES_CODES_TRANSLATE,
  INLINE_STYLES_CODES,
  INLINE_STYLES_CODES_TRANSLATE,
  INLINE_STYLES_CODES_FONT_SIZE,
  InlineStyleFontSize,
} from '../constants';
import { ChangeEvent, useState } from 'react';
import { AngleDownIcon } from '@/public/icons';
import { imageValidation } from '@/helpers/image-validation';

export const ToolPanel = ({
  className,
}: {
  className?: string;
}): JSX.Element => {
  const {
    toggleBlockType,
    currentBlockType,
    toggleInlineStyle,
    hasInlineStyle,
    toggleInlineStyleFontSize,
    currentFontSize,
    addLink,
    insertImage,
  } = useEditorApi();
  const [expanded, setExpanded] = useState(false);

  const handleAddLink = () => {
    const url = prompt('URL:');

    if (url) {
      addLink(url);
    }
  };

  const handleChange = (
    e: React.SyntheticEvent,
    fontSize: InlineStyleFontSize,
  ) => {
    e.preventDefault();
    toggleInlineStyleFontSize(fontSize);
    setExpanded(false);
  };

  const handleExpanded = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = imageValidation(event.target.files);
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
  };

  return (
    <div className={cn(styles.toolPanel, className)}>
      <div className={styles.selectFontSize}>
        <div className={cn(styles.currentOption)} onMouseDown={handleExpanded}>
          <p>{currentFontSize()}</p>
          <AngleDownIcon />
        </div>
        {expanded ? (
          <div className={cn(styles.options)}>
            {INLINE_STYLES_CODES_FONT_SIZE.map((fontSize) => {
              return (
                <p
                  key={fontSize}
                  className={cn(styles.option, {
                    [styles.activeOption]: fontSize === currentFontSize(),
                  })}
                  onMouseDown={(e) => handleChange(e, fontSize)}
                >
                  {fontSize}
                </p>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
      {INLINE_STYLES_CODES.map((code) => {
        const handleMouseDown = (e: React.SyntheticEvent) => {
          e.preventDefault();
          toggleInlineStyle(code);
        };

        const Icon = INLINE_STYLES_CODES_TRANSLATE[code].icon;

        return (
          <button
            key={code}
            className={cn(styles.inlineStyle, {
              [styles.active]: hasInlineStyle(code) === true,
            })}
            onMouseDown={handleMouseDown}
          >
            <Icon />
          </button>
        );
      })}
      {BLOCK_TYPES_CODES.map((block) => {
        const handleMouseDown = (e: React.SyntheticEvent) => {
          e.preventDefault();
          toggleBlockType(block);
        };

        return (
          <button
            key={block}
            className={cn(styles.block, {
              [styles.active]: currentBlockType === block,
            })}
            onMouseDown={handleMouseDown}
          >
            {BLOCK_TYPES_CODES_TRANSLATE[block].rus}
          </button>
        );
      })}
      <button onMouseDown={handleAddLink}>Добавить ссылку</button>
      <input
        type="file"
        className={cn(styles.inputFile)}
        id="upload-file"
        accept="image/jpeg, image/png, image/jpg, image/x-icon"
        onChange={(event) => handleFileUpload(event)}
      />
    </div>
  );
};
