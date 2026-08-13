import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const LaRuta: Block = {
  slug: 'laRuta',
  interfaceName: 'LaRutaBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '02 — La Ruta',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Cultura viva y Trekking',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'con llamas en alta montaña',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'paragraph1V2',
      type: 'richText',
      editor: defaultLexical,
      required: true,
    },
    {
      name: 'paragraph2V2',
      type: 'richText',
      editor: defaultLexical,
      required: true,
    },
    {
      name: 'days',
      type: 'text',
      defaultValue: '3',
      required: true,
    },
    {
      name: 'nights',
      type: 'text',
      defaultValue: '2',
      required: true,
    },
    {
      name: 'kilometers',
      type: 'text',
      defaultValue: '37 km en etapas de 12, 15 y 10 Km.',
      required: true,
    },
    {
      name: 'people',
      type: 'text',
      defaultValue: '8',
      required: true,
    },
    {
      name: 'stages',
      type: 'text',
      defaultValue: '3',
      required: true,
    },
  ],
}
