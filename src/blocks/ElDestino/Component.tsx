import React, { HTMLAttributes } from 'react'

import type { ElDestinoBlock as ElDestinoBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { ClipReveal, Reveal } from '@/components/Reveal'

export const ElDestinoBlock: React.FC<ElDestinoBlockProps & HTMLAttributes<HTMLElement>> = ({
  label,
  title,
  media,
  recognition,
  location,
  altitude,
  paragraph1,
  paragraph2,
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

        {media && typeof media === 'object' && (
          <ClipReveal className="mb-16 h-56 overflow-hidden bg-media-placeholder sm:h-80 md:mb-24 md:h-110">
            <Media
              fill
              imgClassName="h-full w-full object-cover object-center transition-transform duration-[3s] ease-out hover:scale-[1.03]"
              resource={media}
            />
          </ClipReveal>
        )}

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-24">
          <div>
            {title && (
              <Reveal className="mb-5">
                <h2 className="font-display text-5xl font-bold leading-[1.05] text-cream md:text-7xl">
                  {title}
                </h2>
              </Reveal>
            )}
            {(recognition || location || altitude) && (
              <Reveal>
                <p className="wrap-break-word font-mono text-xs uppercase leading-loose tracking-[0.18em] text-earth sm:tracking-[0.28em]">
                  {recognition}
                  <br />
                  {location} {location && altitude && '·'} {altitude}
                </p>
              </Reveal>
            )}
          </div>

          <div>
            {paragraph1 && (
              <Reveal className="mb-6">
                <p className="font-body text-base leading-relaxed text-cream md:text-lg">
                  {paragraph1}
                </p>
              </Reveal>
            )}
            {paragraph2 && (
              <Reveal>
                <p className="font-body text-base leading-relaxed text-cream md:text-lg">
                  {paragraph2}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
