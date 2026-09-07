import 'dotenv/config'
import { spawnSync } from 'node:child_process'
import { readdir } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const apiToken = process.env.CLOUDFLARE_API_TOKEN
const bucket = process.env.R2_BUCKET_NAME

if (!accountId || !apiToken || !bucket) {
  console.error(
    'Missing one of CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, R2_BUCKET_NAME in .env',
  )
  process.exit(1)
}

const sourceDir = join(process.cwd(), 'blob_storage')

const CONTENT_TYPES: Record<string, string> = {
  '.avif': 'image/avif',
  '.css': 'text/css',
  '.csv': 'text/csv',
  '.gif': 'image/gif',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.zip': 'application/zip',
}

function contentTypeFor(filePath: string): string {
  return CONTENT_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream'
}

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(fullPath)
    } else if (entry.isFile()) {
      yield fullPath
    }
  }
}

async function uploadAll() {
  let uploaded = 0
  let failed = 0

  for await (const filePath of walk(sourceDir)) {
    const key = relative(sourceDir, filePath).split('\\').join('/')
    const contentType = contentTypeFor(filePath)

    const result = spawnSync(
      'wrangler',
      [
        'r2',
        'object',
        'put',
        `${bucket}/${key}`,
        `--file=${filePath}`,
        `--content-type=${contentType}`,
        '--remote',
      ],
      { stdio: 'inherit', env: process.env },
    )

    if (result.status === 0) {
      uploaded++
    } else {
      failed++
      console.error(`Failed to upload ${key}`)
    }
  }

  console.log(`\nDone. Uploaded ${uploaded} file(s), ${failed} failure(s).`)
  if (failed > 0) process.exit(1)
}

uploadAll().catch((error) => {
  console.error('Failed to upload to R2:', error)
  process.exit(1)
})
