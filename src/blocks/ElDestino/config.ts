import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const ElDestino: Block = {
  slug: 'elDestino',
  interfaceName: 'ElDestinoBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '06 — El Destino',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Chavín de Huántar',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'recognition',
      type: 'text',
      defaultValue: 'Patrimonio de la Humanidad UNESCO · Desde 1985',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Sierra oriental de Ancash',
      required: true,
    },
    {
      name: 'altitude',
      type: 'text',
      defaultValue: '3,177 msnm',
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
  ],
}
