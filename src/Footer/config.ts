import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { defaultLexical } from '@/fields/defaultLexical'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
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
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'rednatiLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Logo de REDNATI Perú' },
    },
    {
      name: 'alliesLabel',
      type: 'text',
      defaultValue: 'Nuestros Aliados',
    },
    {
      name: 'contactLabel',
      type: 'text',
      defaultValue: 'Contacto',
    },
    {
      name: 'contactEmail',
      type: 'text',
      defaultValue: 'contacto@rednatiperu.com',
    },
    {
      name: 'contactPhone',
      type: 'text',
      defaultValue: '+51 958 848 684',
      admin: {
        description: 'Número mostrado, ej: +51 958 848 684',
      },
    },
    {
      name: 'contactWhatsappLink',
      type: 'text',
      defaultValue: 'https://wa.me/51958848684',
    },
    {
      name: 'supportLabel',
      type: 'text',
      defaultValue: 'Con el Apoyo de',
    },
    {
      name: 'creditImages',
      type: 'array',
      label: 'Logos de colaboradores',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'aboutTextV2',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2025 REDNATI Perú · Todos los derechos reservados',
    },
    {
      name: 'creditsText',
      type: 'text',
      defaultValue: 'By: Franco Panizo, Anthony Aguilar & Julissa Cerna',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
