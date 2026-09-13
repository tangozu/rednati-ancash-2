import type { GlobalConfig } from 'payload'

import { revalidateSocialLinks } from './hooks/revalidateSocialLinks'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      labels: {
        singular: 'Red social',
        plural: 'Redes sociales',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSocialLinks],
  },
}
