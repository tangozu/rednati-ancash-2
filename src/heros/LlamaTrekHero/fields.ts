import type { Field } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const llamaTrekHeroFields: Field = {
  name: 'llamaTrekHeroFields',
  type: 'group',
  required: true,
  fields: [
    {
      name: 'imagenDeFondo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'region',
      type: 'text',
      defaultValue: 'Independencia',
      required: true,
    },
    {
      name: 'highlight',
      type: 'text',
      defaultValue: 'Arte Comunitario',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'SHANCAYÁN',
      required: true,
    },
    {
      name: 'subtitleV2',
      type: 'richText',
      editor: defaultLexical,
      required: true,
    },
    {
      name: 'emailContact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'text',
          defaultValue: '[correo pendiente]',
          required: true,
        },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      defaultValue: '2–3 horas',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Huaraz · Áncash · Perú',
      required: true,
    },
  ],
}
