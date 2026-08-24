import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const Secciones: Block = {
  slug: 'secciones',
  interfaceName: 'SeccionesBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Sección',
        plural: 'Secciones',
      },
      defaultValue: [
        {
          label: '04 – Escuelas de Artes y Oficios',
          title: 'Escuelas de Artes y Oficios',
          imagePosition: 'left',
        },
        {
          label: '05 – Feria Viva',
          title: 'Feria Viva',
          subtitle: '25 de julio, espacio público de Shancayán',
          imagePosition: 'right',
        },
        {
          label: '06 – Conexión Territorial',
          title: 'Conexión Territorial',
          subtitle: 'Conexión con Olleros y Chavín de Huantar',
          imagePosition: 'left',
        },
      ],
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
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'imagePosition',
          type: 'radio',
          label: 'Posición de la imagen',
          defaultValue: 'left',
          required: true,
          options: [
            {
              label: 'Izquierda',
              value: 'left',
            },
            {
              label: 'Derecha',
              value: 'right',
            },
          ],
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'contentV2',
          type: 'richText',
          editor: defaultLexical,
        },
      ],
    },
  ],
}
