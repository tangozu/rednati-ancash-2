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

const rutaDescriptionDefaultValue = {
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
            text: 'Un sendero pre-inca de tres días a través de la Cordillera Blanca de Ancash. El camino asciende desde el poblado de Olleros cruzando pasos cordilleranos a 4,700 metros sobre el nivel del mar.',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Al final del recorrido aguarda el Centro Ceremonial de Chavín de Huántar —Patrimonio de la Humanidad UNESCO desde 1985—, testimonio de una civilización que moldeó el mundo andino tres mil años atrás.',
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
      defaultValue: 'llamaTrek',
      label: 'Type',
      options: [
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
    {
      name: 'rutaLabel',
      type: 'text',
      defaultValue: '02 — La Ruta',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'rutaImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'rutaTitle',
      type: 'text',
      defaultValue: 'Olleros hacia Chavín de Huántar',
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'rutaDescription',
      type: 'richText',
      editor: heroRichTextEditor,
      defaultValue: rutaDescriptionDefaultValue,
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
      },
    },
    {
      name: 'rutaStats',
      type: 'array',
      defaultValue: [
        { num: '3', label: 'Días' },
        { num: '4,700', label: 'msnm' },
        { num: 'UNESCO', label: '1985' },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'llamaTrek',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'num',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 4,
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
