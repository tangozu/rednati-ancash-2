import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

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

export const llamaTrekHeroFields: Field = {
  name: 'llamaTrekHeroFields',
  type: 'group',
  required: true,
  fields: [
    {
      name: 'logo',
      type: 'text',
      defaultValue: 'REDNATI Perú',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'LLAMA\nTREK',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: heroRichTextEditor,
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'metadata',
      type: 'text',
      defaultValue: 'Ancash · 4,700 msnm',
      required: true,
    },
    {
      name: 'coordinates',
      type: 'text',
      defaultValue: "9°35'S 77°10'W",
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Ancash · Perú',
      required: true,
    },
  ],
}
