import type { Block } from 'payload'

export const Galeria: Block = {
  slug: 'galeria',
  interfaceName: 'GaleriaBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '05 — Galería',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'imagesDriveUrl',
      type: 'text',
      label: 'Drive con imágenes (link compartido)',
    },
    {
      name: 'videosDriveUrl',
      type: 'text',
      label: 'Drive con videos (link compartido, integrar con YouTube)',
    },
  ],
}
