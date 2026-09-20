import React, { HTMLAttributes } from 'react'

import type { LineaTrabajoBlock as LineaTrabajoBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { Carousel } from '@/components/Carousel'
import { cn } from '@/utilities/ui'
import { ClipReveal, Reveal } from '@/components/Reveal'
import RichText from '@/components/RichText'

export const LineaTrabajoBlock: React.FC<LineaTrabajoBlockProps & HTMLAttributes<HTMLElement>> = ({
  label,
  title,
  introduction,
  media,
  subtitle,
  content,
  className,
  id,
}) => {
  return (
    <section id={id} className={cn(className)}>
      <div className="mx-auto container">
        {label && (
          <Reveal className="mb-14">
            <span className="font-bold counter-item wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
              {label}
            </span>
          </Reveal>
        )}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
          <Reveal as="div" className="md:col-start-1 md:row-start-1 md:self-start">
            <h2 className="wrap-break-word font-display text-4xl font-bold leading-[1.05] text-cream sm:text-5xl md:text-7xl">
              {title}
            </h2>
          </Reveal>

          {introduction && (
            <Reveal as="div" className="md:col-start-2 md:row-start-1 md:self-start">
              <RichText
                data={introduction}
                enableProse={false}
                enableGutter={false}
                className="font-body text-base leading-relaxed text-cream md:text-lg"
              />
            </Reveal>
          )}

          <ClipReveal className="aspect-video overflow-hidden rounded-2xl bg-media-placeholder md:col-start-1 md:row-start-2 md:aspect-auto md:h-80">
            {media && media.length === 1 && media[0]?.image && typeof media[0].image === 'object' && (
              <Media
                fill
                imgClassName="h-full w-full object-cover transition-transform duration-[2.5s] ease-out hover:scale-[1.04]"
                resource={media[0].image}
              />
            )}

            {media && media.length > 1 && (
              <Carousel
                variant="slide"
                autoplay
                autoplayDelay={5000}
                ariaLabel={title ?? 'Imágenes de la sección'}
                className="h-full w-full"
                slides={media.map(
                  (entry, i) =>
                    entry.image &&
                    typeof entry.image === 'object' && (
                      <Media
                        key={entry.id ?? i}
                        fill
                        imgClassName="h-full w-full object-cover transition-transform duration-[2.5s] ease-out hover:scale-[1.04]"
                        resource={entry.image}
                      />
                    ),
                )}
              />
            )}
          </ClipReveal>

          {(subtitle || content) && (
            <Reveal as="div" className="md:col-start-2 md:row-start-2 md:self-start">
              {subtitle && (
                <h3 className="mb-2 font-display text-3xl font-bold text-cream md:text-4xl">
                  {subtitle}
                </h3>
              )}
              {content && (
                <RichText
                  data={content}
                  enableProse={false}
                  enableGutter={false}
                  className="font-body text-sm leading-relaxed text-cream md:text-base text-justify"
                />
              )}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
