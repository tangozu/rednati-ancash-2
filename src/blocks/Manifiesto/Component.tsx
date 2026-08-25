import React, { HTMLAttributes } from 'react'

import type { ManifiestoBlock as ManifiestoBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Reveal } from '@/components/Reveal'
import RichText from '@/components/RichText'

export const ManifiestoBlock: React.FC<ManifiestoBlockProps & HTMLAttributes<HTMLElement>> = ({
  label,
  quoteV2,
  className,
}) => {
  return (
    <section className={cn(className)}>
      <div className="mx-auto container">
        {label && (
          <Reveal className="mb-14">
            <span className="font-bold counter-item wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
              {label}
            </span>
          </Reveal>
        )}

        {quoteV2 && (
          <Reveal as="blockquote">
            <RichText
              data={quoteV2}
              enableProse={false}
              enableGutter={false}
              className="wrap-break-word text-justify font-display text-2xl leading-[1.08] text-cream sm:text-4xl md:text-6xl [&_p]:inline"
            />
          </Reveal>
        )}
      </div>
    </section>
  )
}
