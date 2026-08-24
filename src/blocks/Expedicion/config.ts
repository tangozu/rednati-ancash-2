import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const Expedicion: Block = {
  slug: 'expedicion',
  interfaceName: 'ExpedicionBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '03 — La Ruta Cultural',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Puntos de interés en el recorrido',
      required: true,
    },
    {
      name: 'introduction',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'stops',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Punto de interés',
        plural: 'Puntos de interés',
      },
      defaultValue: [
        {
          title: 'Escalinatas de Ríos de Color',
          location: 'Jr. Pedro Pablo Palacios, San Miguel',
          category: 'Muralismo',
        },
        {
          title: 'Casa Cultural Shancayán',
          location: 'San Miguel, Independencia, Huaraz',
          category: 'Comunidad',
        },
        {
          title: 'Feria Viva del 25 de julio',
          location: 'Espacio público de Shancayán',
          category: 'Feria y gastronomía',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'paragraphV2',
          type: 'richText',
          editor: defaultLexical,
        },
      ],
    },
  ],
}
