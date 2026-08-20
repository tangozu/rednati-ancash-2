import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'imageType',
      type: 'select',
      label: 'Tipo de imagen',
      defaultValue: 'unset',
      options: [
        { label: 'Logo', value: 'logo' },
        { label: 'Galería', value: 'gallery' },
        { label: 'Créditos', value: 'creditos' },
        { label: 'No definido', value: 'unset' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Redirige a un link',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Si se activa, esta imagen será clicable y redirigirá a la URL indicada.',
      },
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'URL de redirección',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
    {
      name: 'latitude',
      type: 'number',
      label: 'Latitud (GPS)',
      admin: {
        position: 'sidebar',
        description:
          'Extraída automáticamente de los metadatos EXIF de la imagen al subirla, si están disponibles.',
        components: {
          Field: '@/components/admin/GpsCapture#GpsCaptureField',
        },
      },
    },
    {
      name: 'longitude',
      type: 'number',
      label: 'Longitud (GPS)',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    mimeTypes: [
      'image/*',
      'video/*',
      'application/gpx+xml',
      'application/octet-stream',
      'application/xml',
      'text/xml',
      '.gpx',
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],

    modifyResponseHeaders: ({ headers }) => {
      const isSvg = headers.get('content-disposition')?.toLowerCase().includes('.svg')
      if (isSvg && headers.get('content-type') === 'application/xml') {
        headers.set('content-type', 'image/svg+xml; charset=utf-8')
      }
      return headers
    },
  },
}
