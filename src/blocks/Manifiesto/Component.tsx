import React, { HTMLAttributes } from 'react'

import type { ManifiestoBlock as ManifiestoBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Reveal } from '@/components/Reveal'

export const ManifiestoBlock: React.FC<ManifiestoBlockProps & HTMLAttributes<HTMLElement>> = ({
  label,
  quote,
  author,
  concepts,
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

        {quote && (
          <Reveal as="blockquote">
            <p className="wrap-break-word font-display text-2xl font-light italic leading-[1.08] text-cream sm:text-4xl md:text-6xl">
              &quot;{quote}&quot;
            </p>
          </Reveal>
        )}

        {(author || concepts) && (
          <>
            <Reveal className="mt-16 h-px bg-cream/10" />

            <Reveal className="mt-8 flex flex-wrap items-center gap-4 md:gap-8">
              {author && (
                <span className="wrap-break-word font-mono text-xs uppercase tracking-widest text-cream">
                  {author}
                </span>
              )}
              {author && concepts && <span className="h-1 w-1 rounded-full bg-cream" />}
              {concepts && (
                <span className="wrap-break-word font-mono text-xs uppercase tracking-widest text-cream">
                  {concepts}
                </span>
              )}
            </Reveal>
          </>
        )}
      </div>
    </section>
  )
}
