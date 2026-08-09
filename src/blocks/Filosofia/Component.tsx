import React, { HTMLAttributes } from 'react'

import type { FilosofiaBlock as FilosofiaBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/Reveal'

export const FilosofiaBlock: React.FC<FilosofiaBlockProps & HTMLAttributes<HTMLElement>> = ({
  label,
  title,
  backgroundMedia,
  pillars,
  className,
}) => {
  return (
    <section className={cn(className)}>
      {backgroundMedia && typeof backgroundMedia === 'object' && (
        <div className="absolute inset-0">
          <Media
            fill
            imgClassName="h-full w-full object-cover opacity-[0.12]"
            resource={backgroundMedia}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/60 to-bg/90" />
        </div>
      )}

      <div className="relative mx-auto max-w-screen-lg px-6 md:px-16 xl:px-24">
        {label && (
          <Reveal className="mb-14">
            <span className="wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
              {label}
            </span>
          </Reveal>
        )}

        {title && (
          <Reveal as="div" className="mb-20 max-w-3xl">
            <h2 className="font-display text-5xl font-bold leading-[1.05] text-cream md:text-7xl">
              {title}
            </h2>
          </Reveal>
        )}

        {pillars && pillars.length > 0 && (
          <StaggerGroup className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
            {pillars.map(({ subtitle, paragraph }, i) => (
              <StaggerItem key={i} className="border-t border-cream/[0.09] pt-8">
                <h3 className="mb-5 font-display text-xl font-semibold text-cream md:text-2xl">
                  {subtitle}
                </h3>
                <p className="font-body text-sm leading-relaxed text-cream/50 md:text-base">
                  {paragraph}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  )
}
