import Immutable from 'immutable';
import { DefaultDraftBlockRenderMap, DraftEditorCommand } from 'draft-js';
import { BlockType, InlineStyle, InlineStyleFontSize } from './constants';

const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
  [BlockType.cite]: {
    element: 'cite',
  },
});

export const CUSTOM_STYLE_MAP = {
  [InlineStyle.accent]: {
    backgroundColor: '#F7F6F3',
    color: '#A41E68',
  },
  [InlineStyle.alignCenter]: {
    display: 'block',
    textAlign: 'center' as 'center',
  },
  [InlineStyleFontSize.fontSize8]: {
    fontSize: '8px',
  },
  [InlineStyleFontSize.fontSize10]: {
    fontSize: '10px',
  },
  [InlineStyleFontSize.fontSize12]: {
    fontSize: '12px',
  },
  [InlineStyleFontSize.fontSize14]: {
    fontSize: '14px',
  },
  [InlineStyleFontSize.fontSize16]: {
    fontSize: '16px',
  },
  [InlineStyleFontSize.fontSize18]: {
    fontSize: '18px',
  },
  [InlineStyleFontSize.fontSize20]: {
    fontSize: '20px',
  },
  [InlineStyleFontSize.fontSize22]: {
    fontSize: '22px',
  },
  [InlineStyleFontSize.fontSize24]: {
    fontSize: '24px',
  },
  [InlineStyleFontSize.fontSize26]: {
    fontSize: '26px',
  },
  [InlineStyleFontSize.fontSize28]: {
    fontSize: '28px',
  },
  [InlineStyleFontSize.fontSize30]: {
    fontSize: '30px',
  },
  [InlineStyleFontSize.fontSize32]: {
    fontSize: '32px',
  },
  [InlineStyleFontSize.fontSize34]: {
    fontSize: '34px',
  },
  [InlineStyleFontSize.fontSize36]: {
    fontSize: '36px',
  },
  [InlineStyleFontSize.fontSize48]: {
    fontSize: '48px',
  },
  [InlineStyleFontSize.fontSize72]: {
    fontSize: '72px',
  },
};

export type KeyCommand = DraftEditorCommand | 'accent' | 'split-code' | 'tab'; // произвольная команда

export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(
  CUSTOM_BLOCK_RENDER_MAP,
);
