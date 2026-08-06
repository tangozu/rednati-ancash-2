import React, { HTMLAttributes } from 'react'

import type { GaleriaBlock as GaleriaBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

const desktopSpan = [
  'md:col-span-2 md:row-span-1',
  'md:col-span-1 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
]

export const GaleriaBlock: React.FC<GaleriaBlockProps & HTMLAttributes<HTMLElement>> = ({
  label,
  images,
  className,
}) => {
  const gallery = (images || []).filter((img) => img.media && typeof img.media === 'object')

  if (!label && gallery.length === 0) return null

  return (
    <section className={cn(className)}>
      <div className="mx-auto max-w-screen-xl">
        {label && (
          <div className="reveal mb-12 px-2 md:px-0">
            <span className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              {label}
            </span>
          </div>
        )}

        {gallery.length > 0 && (
          <>
            <div
              className="hidden gap-2 md:grid"
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 300px)',
              }}
            >
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className={`clip-reveal overflow-hidden bg-media-placeholder ${desktopSpan[i % desktopSpan.length]}`}
                >
                  <Media
                    fill
                    imgClassName="h-full w-full object-cover transition-transform duration-[2.5s] ease-out hover:scale-[1.05]"
                    resource={img.media}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2 md:hidden">
              {gallery.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="clip-reveal aspect-video overflow-hidden bg-media-placeholder"
                >
                  <Media fill imgClassName="h-full w-full object-cover" resource={img.media} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
