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
      <div className="mx-auto mb-16 max-w-screen-xl px-6 md:mb-0 md:px-16 xl:px-24">
        {label && (
          <div className="reveal mb-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-earth">
              {label}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
        <div className="clip-reveal order-1 aspect-[3/4] overflow-hidden bg-media-placeholder md:aspect-auto md:min-h-[700px]">
          {media && typeof media === 'object' && (
            <Media
              fill
              imgClassName="h-full w-full object-cover object-center transition-transform duration-[3s] ease-out hover:scale-[1.03]"
              resource={media}
            />
          )}
        </div>

        <div className="order-2 flex flex-col justify-center px-6 py-16 md:px-14 md:py-24 xl:px-20">
          {title && (
            <h2
              className="reveal mb-8 font-display font-bold leading-[1.05] text-cream"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
            >
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
                  <span
                    className="mb-2 block font-display font-bold text-earth"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                  >
                    {num}
                  </span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-cream/35">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
