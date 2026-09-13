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
      name: 'leftLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Logo shown on the left side of the header.',
      },
    },
    {
      name: 'leftShortLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Compact left logo without text, shown on narrow screens where the full logo would not fit.',
      },
    },
    {
      name: 'middleLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'middleLogoUrl',
      type: 'text',
      defaultValue: 'https://www.rednatiperu.com/',
      admin: {
        description: 'URL a la que redirige el logo central (RedNatí) al hacer clic.',
      },
    },
    {
      name: 'middleShortLogo',
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
        {
          name: 'group',
          type: 'text',
          admin: {
            description:
              'Nombre de grupo opcional. Los elementos consecutivos con el mismo grupo se muestran juntos bajo un encabezado en el menú.',
          },
        },
        link({
          appearances: false,
        }),
      ],
      maxRows: 24,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
