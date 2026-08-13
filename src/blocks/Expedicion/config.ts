import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const Expedicion: Block = {
  slug: 'expedicion',
  interfaceName: 'ExpedicionBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '04 — La Expedición',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Tres días. Una transformación.',
      required: true,
    },
    {
      name: 'days',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      defaultValue: [
        {
          title: 'Ascenso desde Olleros',
          altitude: '2,800 → 4,100 msnm',
          duration: '5–6 horas',
        },
        {
          title: 'El Paso de los Andes',
          altitude: '4,100 → 4,700 → 3,800 msnm',
          duration: '7–8 horas',
        },
        {
          title: 'Llegada a Chavín',
          altitude: '3,800 → 3,177 msnm',
          duration: '4–5 horas',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'altitude',
          type: 'text',
          required: true,
        },
        {
          name: 'duration',
          type: 'text',
          required: true,
        },
        {
          name: 'paragraphV2',
          type: 'richText',
          editor: defaultLexical,
          required: true,
        },
      ],
    },
  ],
}
