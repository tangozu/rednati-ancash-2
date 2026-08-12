import React, { HTMLAttributes } from 'react'

import type { ExpedicionBlock as ExpedicionBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { ClipReveal, Reveal } from '@/components/Reveal'

export const ExpedicionBlock: React.FC<ExpedicionBlockProps & HTMLAttributes<HTMLElement>> = ({
  label,
  title,
  days,
  className,
}) => {
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
        {title && (
          <Reveal as="div" className="mb-16 max-w-2xl">
            <h2 className="wrap-break-word font-display text-4xl font-bold leading-[1.05] text-cream sm:text-5xl md:text-7xl">
              {title}
            </h2>
          </Reveal>
        )}

        {days && days.length > 0 && (
          <div className="counter-container [--counter-name:day] divide-y divide-cream/[0.07] flex flex-col gap-16">
            {days.map((day, i) => (
              <div key={i} className="grid grid-cols-1 gap-0 py-0 md:grid-cols-2">
                <Reveal
                  className={`${
                    i % 2 === 1 ? 'md:order-2 md:pl-16 xl:pl-24' : 'md:pr-16 xl:pr-24'
                  }`}
                >
                  <div className="mb-4 flex items-center">
                    <span className="counter-item wrap-break-word font-mono text-base tracking-[0.2em] text-earth">
                      {day.duration}
                    </span>
                  </div>

                  <h3 className="mb-2 font-display text-3xl font-bold text-cream md:text-4xl">
                    {day.title}
                  </h3>
                  <p className="mb-4 wrap-break-word text-sm tracking-[0.2em] text-earth">
                    {day.altitude}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-cream md:text-base text-justify">
                    {day.paragraph}
                  </p>
                </Reveal>

                <ClipReveal
                  className={`aspect-video overflow-hidden rounded-2xl mt-4 bg-media-placeholder md:aspect-auto md:mt-0 md:h-80 ${
                    i % 2 === 1 ? 'md:order-1' : ''
                  }`}
                >
                  {day.media && typeof day.media === 'object' && (
                    <Media
                      fill
                      imgClassName="h-full w-full object-cover transition-transform duration-[2.5s] ease-out hover:scale-[1.04]"
                      resource={day.media}
                    />
                  )}
                </ClipReveal>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
