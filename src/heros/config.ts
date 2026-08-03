import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

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
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
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
