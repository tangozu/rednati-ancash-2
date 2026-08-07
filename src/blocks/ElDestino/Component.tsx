import React, { HTMLAttributes } from 'react'

import type { ElDestinoBlock as ElDestinoBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

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
          <div className="reveal mb-14">
            <span className="font-mono text-lg uppercase tracking-[0.4em] text-earth">{label}</span>
          </div>
        )}

        {media && typeof media === 'object' && (
          <div className="clip-reveal mb-16 h-56 overflow-hidden bg-media-placeholder sm:h-80 md:mb-24 md:h-[440px]">
            <Media
              fill
              imgClassName="h-full w-full object-cover object-center transition-transform duration-[3s] ease-out hover:scale-[1.03]"
              resource={media}
            />
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-24">
          <div>
            {title && (
              <h2 className="reveal mb-5 font-display text-5xl font-bold leading-[1.05] text-cream md:text-7xl">
                {title}
              </h2>
            )}
            {(recognition || location || altitude) && (
              <p className="reveal font-mono text-xs uppercase leading-loose tracking-[0.28em] text-earth">
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
