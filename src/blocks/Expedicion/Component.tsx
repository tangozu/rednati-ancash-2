import React from 'react'

import type { ExpedicionBlock as ExpedicionBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const ExpedicionBlock: React.FC<ExpedicionBlockProps> = ({ label, title, days }) => {
  return (
    <section className="bg-bg py-24 md:py-40">
      <div className="mx-auto max-w-screen-xl px-6 md:px-16 xl:px-24">
        {label && (
          <div className="reveal mb-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-earth">
              {label}
            </span>
          </div>
        )}
        {title && (
          <h2
            className="reveal mb-20 max-w-2xl font-display font-bold leading-[1.05] text-cream"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
          >
            {title}
          </h2>
        )}

        {days && days.length > 0 && (
          <div className="divide-y divide-cream/[0.07]">
            {days.map((day, i) => (
              <div key={i} className="reveal grid grid-cols-1 gap-0 py-0 md:grid-cols-2">
                <div
                  className={`py-12 md:py-16 ${
                    i % 2 === 1 ? 'md:order-2 md:pl-16 xl:pl-24' : 'md:pr-16 xl:pr-24'
                  }`}
                >
                  <div className="mb-7 flex items-center gap-5">
                    <span className="font-mono text-[10px] tracking-[0.35em] text-earth">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px w-8 bg-cream/15" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/30">
                      {day.duration}
                    </span>
                  </div>

                  <h3
                    className="mb-2 font-display font-bold text-cream"
                    style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)' }}
                  >
                    {day.title}
                  </h3>
                  <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.22em] text-earth/75">
                    {day.altitude}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-cream/50 md:text-base">
                    {day.paragraph}
                  </p>
                </div>

                <div
                  className={`clip-reveal aspect-video overflow-hidden bg-stone md:aspect-auto md:h-80 ${
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
