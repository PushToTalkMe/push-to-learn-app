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
import { useState } from 'react';
import { AngleDownIcon } from '@/public/icons';

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
    </div>
  );
};
