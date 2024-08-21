import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ParagraphIcon,
  AlignCenterIcon,
} from '@/public/icons';

export enum BlockType {
  blockquote = 'blockquote',
  code = 'code-block',
  list = 'unordered-list-item',
  orderList = 'ordered-list-item',
  cite = 'cite',
  default = 'unstyled',
}

export enum InlineStyle {
  bold = 'BOLD',
  italic = 'ITALIC',
  underline = 'UNDERLINE',
  accent = 'ACCENT',
  alignCenter = 'ALIGN-CENTER',
}

export enum InlineStyleFontSize {
  fontSize8 = '8',
  fontSize10 = '10',
  fontSize12 = '12',
  fontSize14 = '14',
  fontSize16 = '16',
  fontSize18 = '18',
  fontSize20 = '20',
  fontSize22 = '22',
  fontSize24 = '24',
  fontSize26 = '26',
  fontSize28 = '28',
  fontSize30 = '30',
  fontSize32 = '32',
  fontSize34 = '34',
  fontSize36 = '36',
  fontSize48 = '48',
  fontSize72 = '72',
}

export enum EntityType {
  link = 'link',
  image = 'atomic:image',
}

export const BLOCK_TYPES_CODES_TRANSLATE = {
  blockquote: { rus: 'Цитата' },
  'code-block': { rus: 'Блок кода' },
  'unordered-list-item': { rus: 'Список' },
  'ordered-list-item': { rus: 'Нумерованный список' },
  cite: { rus: 'Сноска' },
  unstyled: { rus: 'Обычный' },
};

export const INLINE_STYLES_CODES_TRANSLATE = {
  BOLD: { rus: 'Жирный', icon: BoldIcon },
  ITALIC: { rus: 'Курсив', icon: ItalicIcon },
  UNDERLINE: { rus: 'Подчеркнутый', icon: UnderlineIcon },
  ACCENT: { rus: 'Выделенный', icon: ParagraphIcon },
  'ALIGN-CENTER': { rus: 'Центровка', icon: AlignCenterIcon },
};

export const BLOCK_TYPES_CODES = Object.values(BlockType);
export const INLINE_STYLES_CODES = Object.values(InlineStyle);
export const INLINE_STYLES_CODES_FONT_SIZE = Object.values(InlineStyleFontSize);
