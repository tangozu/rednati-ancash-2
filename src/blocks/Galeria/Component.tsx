import React, { HTMLAttributes } from 'react'

import type { GaleriaBlock as GaleriaBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { cn } from '@/utilities/ui'
import { Reveal } from '@/components/Reveal'
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
          <Reveal className="mb-12 px-2 md:px-0">
            <span className="counter-item wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
              {label}
            </span>
          </Reveal>
        )}

        {gallery.length > 0 && <Gallery images={gallery} />}
      </div>
    </section>
  )
}
