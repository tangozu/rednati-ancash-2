import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

const heroRichTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]
  },
})

const manifestoDefaultValue = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '“Hay caminos que no son rutas turísticas.',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Son memorias vivas. Pasos que generaciones recorrieron',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'antes que nosotros, y que hoy compartimos',
            version: 1,
          },
          { type: 'linebreak', version: 1 },
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'como acto de resistencia cultural.”',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
}

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'LlamaTrek Hero',
          value: 'llamaTrek',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: heroRichTextEditor,
      label: false,
    },
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'REDNATI Perú',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'LLAMA\nTREK',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'metadata',
      type: 'text',
      defaultValue: 'Ancash · 4,700 msnm',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'coordinates',
      type: 'text',
      defaultValue: "9°35'S 77°10'W",
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Ancash · Perú',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'manifestoLabel',
      type: 'text',
      defaultValue: '01 — Manifiesto',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'manifesto',
      type: 'richText',
      editor: heroRichTextEditor,
      defaultValue: manifestoDefaultValue,
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'manifestoAuthor',
      type: 'text',
      defaultValue: 'REDNATI Perú',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'manifestoKeywords',
      type: 'text',
      defaultValue: 'Buen Vivir · Turismo Indígena · Regenerativo',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'llamaTrek'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
