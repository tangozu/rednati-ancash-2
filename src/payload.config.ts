import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SocialLinks } from './SocialLinks/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { imageConverterPlugin } from 'payload-img-convert'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { s3Storage } from '@payloadcms/storage-s3'
import { importExportPlugin } from '@payloadcms/plugin-import-export'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
      // Renders the RedNatí logo + wordmark at the top of the collections/globals sidebar.
      beforeNavLinks: ['@/components/AdminNavBrand'],
      graphics: {
        Logo: '@/components/AdminGraphics#AdminLogo',
        Icon: '@/components/AdminGraphics#AdminIcon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/rednati.ico',
        },
      ],
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url: process.env.MONGODB_URI || '',
    connectOptions: {
      maxPoolSize: 5
    }
  }),
  collections: [Pages, Media, Users],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
        },
        imports: {
          disableLocalStorage: true
        },
        exports: {
          disableLocalStorage: true
        }
      },
      bucket: process.env.R2_BUCKET_NAME || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_ACCESS_KEY_SECRET || '',
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT || ''
      }
    }),
    imageConverterPlugin({
      collections: [Media.slug],
      defaultFormat: 'webp',
      quality: 80,
      maxFileSize: 50 * 1024 * 1024, // 50 MB
      maxWidth: 2560,
      maxHeight: 1440,
      oversizeThreshold: 2560,
      enableFormatSelector: true,
      enableResizeSelector: true,
      formats: ['webp']
    }),
    mcpPlugin({
      collections: {
        pages: {
          enabled: true,
        },
        media: {
          enabled: true,
        },
        'payload-folders': {
          enabled: true,
        },
      },
      globals: {
        header: {
          enabled: true,
        },
        footer: {
          enabled: true,
        },
      },
    }),
    importExportPlugin({

      collections: [{
        slug: "media",
        export: {
          format: "json",
          disableJobsQueue: true
        },
        import: {
          disableJobsQueue: true
        }
      }, {
        slug: "pages",
        export: {
          format: "json",
          disableJobsQueue: true
        },
        import: {
          disableJobsQueue: true
        }
      }],

    }),
  ],
  globals: [Header, Footer, SocialLinks],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
