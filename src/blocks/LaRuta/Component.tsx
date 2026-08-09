import React, { HTMLAttributes } from 'react'

import type { LaRutaBlock as LaRutaBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { ClipReveal, Reveal, StaggerGroup, StaggerItem } from '@/components/Reveal'

export const LaRutaBlock: React.FC<LaRutaBlockProps & HTMLAttributes<HTMLElement>> = ({
  label,
  title,
  media,
  paragraph1,
  paragraph2,
  days,
  nights,
  kilometers,
  people,
  stages,
  className,
}) => {
  const stats = [
    { num: days, label: 'Días' },
    { num: nights, label: 'Noches' },
    { num: kilometers, label: 'Kilómetros' },
    { num: people, label: 'Personas' },
    { num: stages, label: 'Etapas' },
  ].filter((stat) => stat.num)

  return (
    <section className={cn(className)}>
      <div className="mx-auto container">
        {label && (
          <Reveal className="mb-14">
            <span className="counter-item wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
              {label}
            </span>
          </Reveal>
        )}

        <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
          <ClipReveal className="order-1 aspect-3/4 overflow-hidden bg-media-placeholder md:aspect-auto md:min-h-175">
            {media && typeof media === 'object' && (
              <Media
                fill
                imgClassName="h-full w-full object-cover object-center transition-transform duration-[3s] ease-out hover:scale-[1.03]"
                resource={media}
              />
            )}
          </ClipReveal>

          <div className="order-2 flex flex-col justify-center pl-6  md:pl-14 xl:pl-20">
            {title && (
              <Reveal as="div" className="mb-8">
                <h2 className="wrap-break-word font-display text-4xl font-bold leading-[1.05] text-cream sm:text-5xl md:text-7xl">
                  {title}
                </h2>
              </Reveal>
            )}

            {paragraph1 && (
              <Reveal className="mb-6">
                <p className="font-body text-base leading-relaxed text-cream md:text-lg">
                  {paragraph1}
                </p>
              </Reveal>
            )}

            {paragraph2 && (
              <Reveal className="mb-14">
                <p className="font-body text-base leading-relaxed text-cream md:text-lg">
                  {paragraph2}
                </p>
              </Reveal>
            )}

            {stats.length > 0 && (
              <StaggerGroup className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {stats.map(({ num, label }) => (
                  <StaggerItem key={label} className="border-t border-cream/10 pt-6">
                    <span className="mb-2 block font-display text-2xl font-bold text-earth md:text-3xl">
                      {num}
                    </span>
                    <span className="block wrap-break-word font-mono text-xs uppercase tracking-widest text-cream sm:tracking-[0.22em]">
                      {label}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
