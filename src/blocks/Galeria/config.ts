import type { Block } from 'payload'

export const Galeria: Block = {
  slug: 'galeria',
  interfaceName: 'GaleriaBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: 'Galería',
      required: true,
    },
  ],
}
