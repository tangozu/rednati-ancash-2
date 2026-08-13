import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const Manifiesto: Block = {
  slug: 'manifiesto',
  interfaceName: 'ManifiestoBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '01 — Manifiesto',
      required: true,
    },
    {
      name: 'quoteV2',
      type: 'richText',
      editor: defaultLexical,
      required: true,
    },
  ],
}
