import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

const textNode = (text: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

const paragraphNode = (text: string) => ({
  type: 'paragraph',
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const richTextDefault = (...paragraphs: string[]): DefaultTypedEditorState =>
  ({
    root: {
      type: 'root',
      children: paragraphs.map(paragraphNode),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as DefaultTypedEditorState
