import hljs from 'highlight.js';
import React from 'react';
import { Remarkable } from 'remarkable';
import 'highlight.js/styles/github.css';

const md = new Remarkable();

export const MarkdownComponent = ({ text }: { text: string }) => {
  var md = new Remarkable('full', {
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    typographer: false,
    quotes: '“”‘’',
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (__) {}

      return '';
    },
  });
  const processedText = md.render(text);

  return <div dangerouslySetInnerHTML={{ __html: processedText }} />;
};
