import type { Block } from 'payload'

import { contentBlocks } from '@/blocks/blockList'

export const Book: Block = {
  slug: 'book',
  interfaceName: 'BookBlock',
  labels: {
    singular: 'Libro (Navegación de Servicios)',
    plural: 'Libros (Navegación de Servicios)',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      admin: {
        description: 'Etiqueta mostrada encima de la navegación de páginas.',
      },
    },
    {
      name: 'paginas',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Página',
        plural: 'Páginas',
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Book/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Texto del botón de navegación (pestaña), ej: "01. Muralismo".',
          },
        },
        {
          name: 'contenido',
          type: 'blocks',
          blocks: contentBlocks,
          minRows: 1,
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
  ],
}
