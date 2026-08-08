import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Compact logo without text, shown on narrow screens where the full logo would not fit.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'whatsappContact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+51 958 848 684',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
