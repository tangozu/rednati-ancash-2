import React, { HTMLAttributes } from 'react'

import type { ExpedicionBlock as ExpedicionBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

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
          <div className="reveal mb-14">
            <span className="counter-item wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
              {label}
            </span>
          </div>
        )}
        {title && (
          <h2 className="reveal mb-20 max-w-2xl wrap-break-word font-display text-4xl font-bold leading-[1.05] text-cream sm:text-5xl md:text-7xl">
            {title}
          </h2>
        )}

        {days && days.length > 0 && (
          <div className="counter-container [--counter-name:day] divide-y divide-cream/[0.07]">
            {days.map((day, i) => (
              <div key={i} className="reveal grid grid-cols-1 gap-0 py-0 md:grid-cols-2">
                <div
                  className={`py-12 md:py-16 ${
                    i % 2 === 1 ? 'md:order-2 md:pl-16 xl:pl-24' : 'md:pr-16 xl:pr-24'
                  }`}
                >
                  <div className="mb-4 flex items-center">
                    <span className="counter-item wrap-break-word font-mono text-sm tracking-[0.2em] text-earth">
                      {day.duration}
                    </span>
                  </div>

                  <h3 className="mb-2 font-display text-3xl font-bold text-cream md:text-4xl">
                    {day.title}
                  </h3>
                  <p className="mb-4 wrap-break-word text-base tracking-[0.2em] text-earth">
                    {day.altitude}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-cream/50 md:text-base">
                    {day.paragraph}
                  </p>
                </div>

                <div
                  className={`clip-reveal aspect-video overflow-hidden bg-media-placeholder md:aspect-auto md:h-80 ${
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
