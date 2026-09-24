import type { Field } from 'payload'

import { defaultHeroFields } from './DefaultHero/fields'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'default',
      label: 'Type',
      options: [
        {
          label: 'Shancayán Hero',
          value: 'default',
        },
      ],
      required: true,
    },
    {
      ...defaultHeroFields,
      admin: { condition: (_, { type } = {}) => type === 'default' },
    } as Field,
  ],
  label: false,
}
