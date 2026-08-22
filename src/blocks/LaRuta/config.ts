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
      name: 'keyDate',
      type: 'text',
      defaultValue: '25 de julio',
      required: true,
    },
    {
      name: 'muralCount',
      type: 'text',
      defaultValue: '15+',
      required: true,
    },
    {
      name: 'visitDuration',
      type: 'text',
      defaultValue: '2–3 horas',
      required: true,
    },
  ],
}
