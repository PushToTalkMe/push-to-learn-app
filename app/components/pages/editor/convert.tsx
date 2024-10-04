import { convertFromHTML, convertToHTML } from 'draft-convert';
import { CUSTOM_STYLE_MAP } from './config';
import {
  InlineStyle,
  BlockType,
  InlineStyleFontSize,
  EntityType,
} from './constants';

export const stateToHTML = convertToHTML<
  InlineStyle | InlineStyleFontSize,
  BlockType | EntityType
>({
  styleToHTML: (style: InlineStyle | InlineStyleFontSize) => {
    switch (style) {
      case InlineStyle.bold:
        return <strong />;
      case InlineStyle.italic:
        return <em />;
      case InlineStyle.underline:
        return (
          <span className="underline" style={{ textDecoration: 'underline' }} />
        );
      case InlineStyle.accent:
        return (
          <span
            className="accent"
            style={CUSTOM_STYLE_MAP[InlineStyle.accent]}
          />
        );
      case InlineStyle.alignCenter:
        return (
          <span
            className="alignCenter"
            style={CUSTOM_STYLE_MAP[InlineStyle.alignCenter]}
          />
        );
      case InlineStyleFontSize.fontSize8:
        return (
          <span
            className="fontSize8"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize8]}
          />
        );
      case InlineStyleFontSize.fontSize10:
        return (
          <span
            className="fontSize10"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize10]}
          />
        );
      case InlineStyleFontSize.fontSize12:
        return (
          <span
            className="fontSize12"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize12]}
          />
        );
      case InlineStyleFontSize.fontSize14:
        return (
          <span
            className="fontSize14"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize14]}
          />
        );
      case InlineStyleFontSize.fontSize16:
        return (
          <span
            className="fontSize16"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize16]}
          />
        );
      case InlineStyleFontSize.fontSize18:
        return (
          <span
            className="fontSize18"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize18]}
          />
        );
      case InlineStyleFontSize.fontSize20:
        return (
          <span
            className="fontSize20"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize20]}
          />
        );
      case InlineStyleFontSize.fontSize22:
        return (
          <span
            className="fontSize22"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize22]}
          />
        );
      case InlineStyleFontSize.fontSize24:
        return (
          <span
            className="fontSize24"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize24]}
          />
        );
      case InlineStyleFontSize.fontSize26:
        return (
          <span
            className="fontSize26"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize26]}
          />
        );
      case InlineStyleFontSize.fontSize28:
        return (
          <span
            className="fontSize28"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize28]}
          />
        );
      case InlineStyleFontSize.fontSize30:
        return (
          <span
            className="fontSize30"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize30]}
          />
        );
      case InlineStyleFontSize.fontSize32:
        return (
          <span
            className="fontSize32"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize32]}
          />
        );
      case InlineStyleFontSize.fontSize34:
        return (
          <span
            className="fontSize34"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize34]}
          />
        );
      case InlineStyleFontSize.fontSize36:
        return (
          <span
            className="fontSize36"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize36]}
          />
        );
      case InlineStyleFontSize.fontSize48:
        return (
          <span
            className="fontSize48"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize48]}
          />
        );
      case InlineStyleFontSize.fontSize72:
        return (
          <span
            className="fontSize72"
            style={CUSTOM_STYLE_MAP[InlineStyleFontSize.fontSize72]}
          />
        );
      default:
        return null;
    }
  },
  blockToHTML: (block) => {
    switch (block.type) {
      case BlockType.cite:
        return <cite />;
      case BlockType.orderList:
        return {
          element: <li />,
          nest: <ol />,
        };
      case BlockType.list:
        return {
          element: <li />,
          nest: <ul />,
        };
      case BlockType.code:
        return {
          element: <pre />,
        };
      case BlockType.blockquote:
        return {
          element: <blockquote />,
        };
      case BlockType.default:
        return {
          element: <p />,
        };
      default:
        return null;
    }
  },
  entityToHTML: (entity, originalText) => {
    if (entity.type === EntityType.link) {
      return <a href={entity.data.url}>{originalText}</a>;
    }
    if (entity.type === EntityType.image) {
      return (
        <div style={{ textAlign: 'center' }}>
          <img
            src={entity.data.src}
            alt={'Твоя картинка'}
            style={{ maxWidth: '100%' }}
          />
        </div>
      );
    }
    return originalText;
  },
});

export const HTMLtoState = convertFromHTML<DOMStringMap, BlockType>({
  htmlToStyle: (nodeName, node, currentStyle) => {
    if (nodeName === 'strong') {
      return currentStyle.add(InlineStyle.bold);
    }

    if (nodeName === 'em') {
      return currentStyle.add(InlineStyle.italic);
    }

    if (nodeName === 'span' && node.classList.contains('underline')) {
      return currentStyle.add(InlineStyle.underline);
    }

    if (nodeName === 'span' && node.classList.contains('accent')) {
      return currentStyle.add(InlineStyle.accent);
    }

    if (nodeName === 'span' && node.classList.contains('alignCenter')) {
      return currentStyle.add(InlineStyle.alignCenter);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize8')) {
      return currentStyle.add(InlineStyleFontSize.fontSize8);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize10')) {
      return currentStyle.add(InlineStyleFontSize.fontSize10);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize12')) {
      return currentStyle.add(InlineStyleFontSize.fontSize12);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize14')) {
      return currentStyle.add(InlineStyleFontSize.fontSize14);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize16')) {
      return currentStyle.add(InlineStyleFontSize.fontSize16);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize18')) {
      return currentStyle.add(InlineStyleFontSize.fontSize18);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize20')) {
      return currentStyle.add(InlineStyleFontSize.fontSize20);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize22')) {
      return currentStyle.add(InlineStyleFontSize.fontSize22);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize24')) {
      return currentStyle.add(InlineStyleFontSize.fontSize24);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize26')) {
      return currentStyle.add(InlineStyleFontSize.fontSize26);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize28')) {
      return currentStyle.add(InlineStyleFontSize.fontSize28);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize30')) {
      return currentStyle.add(InlineStyleFontSize.fontSize30);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize32')) {
      return currentStyle.add(InlineStyleFontSize.fontSize32);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize34')) {
      return currentStyle.add(InlineStyleFontSize.fontSize34);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize36')) {
      return currentStyle.add(InlineStyleFontSize.fontSize36);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize48')) {
      return currentStyle.add(InlineStyleFontSize.fontSize48);
    }

    if (nodeName === 'span' && node.classList.contains('fontSize72')) {
      return currentStyle.add(InlineStyleFontSize.fontSize72);
    }
    return currentStyle;
  },
  /** Типизация пакета не предусматривает параметр last, но он есть */
  // @ts-ignore
  htmlToBlock(nodeName, node, last) {
    switch (nodeName) {
      case 'li':
        if (last === 'ol') {
          return BlockType.orderList;
        }
        return BlockType.list;
      case 'blockquote':
        return BlockType.blockquote;
      case 'cite':
        return BlockType.cite;
      case 'pre':
        return BlockType.code;
      case 'div':
      case 'p':
        return BlockType.default;
      case 'figure':
        return 'atomic';
      default:
        return null;
    }
  },
  htmlToEntity: (nodeName, node, createEntity) => {
    if (nodeName === 'a' && node.href) {
      return createEntity(EntityType.link, 'MUTABLE', { url: node.href });
    }

    if (nodeName === 'img' && node.src) {
      return createEntity(EntityType.image, 'IMMUTABLE', {
        src: node.src,
      });
    }

    return undefined;
  },
});
