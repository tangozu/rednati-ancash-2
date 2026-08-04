import React from 'react'

import type { ElDestinoBlock as ElDestinoBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const ElDestinoBlock: React.FC<ElDestinoBlockProps> = ({
  label,
  title,
  media,
  recognition,
  location,
  altitude,
  paragraph1,
  paragraph2,
}) => {
  return (
    <section className="overflow-hidden bg-bg py-24 md:py-40">
      <div className="mx-auto max-w-screen-xl px-6 md:px-16 xl:px-24">
        {label && (
          <div className="reveal mb-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-earth">
              {label}
            </span>
          </div>
        )}
      </div>

      {media && typeof media === 'object' && (
        <div className="clip-reveal mb-16 h-56 overflow-hidden bg-stone sm:h-80 md:mb-24 md:h-[440px]">
          <Media
            fill
            imgClassName="h-full w-full object-cover object-center transition-transform duration-[3s] ease-out hover:scale-[1.03]"
            resource={media}
          />
        </div>
      )}

      <div className="mx-auto max-w-screen-xl px-6 md:px-16 xl:px-24">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-24">
          <div>
            {title && (
              <h2
                className="reveal mb-5 font-display font-bold leading-[1.05] text-cream"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
              >
                {title}
              </h2>
            )}
            {(recognition || location || altitude) && (
              <p className="reveal font-mono text-[10px] uppercase leading-loose tracking-[0.28em] text-earth">
                {recognition}
                <br />
                {location} {location && altitude && '·'} {altitude}
              </p>
            )}
          </div>

          <div>
            {paragraph1 && (
              <p className="reveal mb-6 font-body text-base leading-relaxed text-cream/55 md:text-lg">
                {paragraph1}
              </p>
            )}
            {paragraph2 && (
              <p className="reveal font-body text-base leading-relaxed text-cream/55 md:text-lg">
                {paragraph2}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
