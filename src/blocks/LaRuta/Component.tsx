import React, { HTMLAttributes } from 'react'

import type { LaRutaBlock as LaRutaBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

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
          <div className="reveal mb-14">
            <span className="counter-item font-mono text-lg uppercase tracking-[0.4em] text-earth">
              {label}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
          <div className="clip-reveal order-1 aspect-3/4 overflow-hidden bg-media-placeholder md:aspect-auto md:min-h-175">
            {media && typeof media === 'object' && (
              <Media
                fill
                imgClassName="h-full w-full object-cover object-center transition-transform duration-[3s] ease-out hover:scale-[1.03]"
                resource={media}
              />
            )}
          </div>

          <div className="order-2 flex flex-col justify-center pl-6  md:pl-14 xl:pl-20">
            {title && (
              <h2 className="reveal mb-8 font-display text-5xl font-bold leading-[1.05] text-cream md:text-7xl">
                {title}
              </h2>
            )}

            {paragraph1 && (
              <p className="reveal mb-6 font-body text-base leading-relaxed text-cream/55 md:text-lg">
                {paragraph1}
              </p>
            )}

            {paragraph2 && (
              <p className="reveal mb-14 font-body text-base leading-relaxed text-cream/55 md:text-lg">
                {paragraph2}
              </p>
            )}

            {stats.length > 0 && (
              <div className="stagger-parent grid grid-cols-3 gap-6">
                {stats.map(({ num, label }) => (
                  <div key={label} className="border-t border-cream/10 pt-6">
                    <span className="mb-2 block font-display text-2xl font-bold text-earth md:text-3xl">
                      {num}
                    </span>
                    <span className="block font-mono text-xs uppercase tracking-[0.22em] text-cream/35">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
