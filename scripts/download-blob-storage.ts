import 'dotenv/config'
import { list } from '@vercel/blob'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const token = process.env.BLOB_READ_WRITE_TOKEN

if (!token) {
  console.error('Missing BLOB_READ_WRITE_TOKEN in .env')
  process.exit(1)
}

const outputDir = join(process.cwd(), 'blob_storage')

async function downloadAll() {
  let cursor: string | undefined
  let count = 0

  do {
    const result = await list({ token, cursor, limit: 1000 })

    for (const blob of result.blobs) {
      const destPath = join(outputDir, blob.pathname)
      await mkdir(dirname(destPath), { recursive: true })

      const response = await fetch(blob.url)
      if (!response.ok) {
        console.error(`Failed to download ${blob.pathname}: ${response.status} ${response.statusText}`)
        continue
      }

      const buffer = Buffer.from(await response.arrayBuffer())
      await writeFile(destPath, buffer)
      count++
      console.log(`Downloaded ${blob.pathname}`)
    }

    cursor = result.cursor
  } while (cursor)

  console.log(`\nDone. Downloaded ${count} file(s) to ${outputDir}`)
}

downloadAll().catch((error) => {
  console.error('Failed to download blob storage:', error)
  process.exit(1)
})
