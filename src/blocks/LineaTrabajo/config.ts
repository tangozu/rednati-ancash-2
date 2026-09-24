import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const LineaTrabajo: Block = {
  slug: 'lineaTrabajo',
  interfaceName: 'LineaTrabajoBlock',
  labels: {
    singular: 'Línea de Trabajo',
    plural: 'Líneas de Trabajo',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'introduction',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'media',
      type: 'array',
      labels: {
        singular: 'Imagen',
        plural: 'Imágenes',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      editor: defaultLexical,
    },
  ],
}
