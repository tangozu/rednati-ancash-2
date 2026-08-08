import React, { HTMLAttributes } from 'react'

import type { GaleriaBlock as GaleriaBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { cn } from '@/utilities/ui'
import { Gallery } from './Gallery'

export const GaleriaBlock: React.FC<GaleriaBlockProps & HTMLAttributes<HTMLElement>> = async ({
  label,
  className,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: gallery } = await payload.find({
    collection: 'media',
    where: {
      imageType: {
        equals: 'gallery',
      },
    },
    sort: '-createdAt',
    limit: 0,
  })

  if (!label && gallery.length === 0) return null

  return (
    <section className={cn(className)}>
      <div className="mx-auto container">
        {label && (
          <div className="reveal mb-12 px-2 md:px-0">
            <span className="counter-item font-mono text-lg uppercase tracking-[0.4em] text-earth">
              {label}
            </span>
          </div>
        )}

        {gallery.length > 0 && <Gallery images={gallery} />}
      </div>
    </section>
  )
}
