import React, { HTMLAttributes } from 'react'

import type { SeccionesBlock as SeccionesBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { ClipReveal, Reveal } from '@/components/Reveal'
import RichText from '@/components/RichText'

export const SeccionesBlock: React.FC<SeccionesBlockProps & HTMLAttributes<HTMLElement>> = ({
  items,
  className,
}) => {
  return (
    <section className={cn(className)}>
      <div className="mx-auto container flex flex-col gap-24">
        {items?.map((item, i) => {
          const imageOnRight = item.imagePosition !== 'left'

          return (
            <div key={i} className="flex flex-col">
              {item.label && (
                <Reveal className="order-1 mb-6">
                  <span className="font-bold counter-item wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
                    {item.label}
                  </span>
                </Reveal>
              )}

              <div className="order-2 grid grid-cols-1 items-start md:grid-cols-2">
                <ClipReveal
                  className={cn(
                    'aspect-3/4 overflow-hidden rounded-2xl bg-media-placeholder md:aspect-auto md:min-h-175 mb-16 md:mb-0',
                    imageOnRight ? 'order-1 md:order-2' : 'order-1',
                  )}
                >
                  {item.media && typeof item.media === 'object' && (
                    <Media
                      fill
                      imgClassName="h-full w-full object-cover object-center transition-transform duration-[3s] ease-out hover:scale-[1.03]"
                      resource={item.media}
                    />
                  )}
                </ClipReveal>

                <div
                  className={cn(
                    'order-2 flex flex-col',
                    imageOnRight ? 'md:order-1 md:pr-14 xl:pr-20' : 'md:pl-14 xl:pl-20',
                  )}
                >
                  {item.title && (
                    <Reveal as="div" className="mb-4">
                      <h2 className="wrap-break-word font-display text-4xl font-bold leading-[1.05] text-cream sm:text-5xl md:text-6xl">
                        {item.title}
                      </h2>
                    </Reveal>
                  )}
                  {item.subtitle && (
                    <Reveal as="div" className="mb-8">
                      <h3 className="wrap-break-word font-display text-2xl font-bold leading-[1.05] text-cream sm:text-3xl">
                        {item.subtitle}
                      </h3>
                    </Reveal>
                  )}

                  {item.contentV2 && (
                    <Reveal>
                      <RichText
                        data={item.contentV2}
                        enableProse={false}
                        enableGutter={false}
                        className="font-body text-base leading-relaxed text-cream md:text-lg text-justify"
                      />
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
