import React, { HTMLAttributes } from 'react'

import type { ManifiestoBlock as ManifiestoBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

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
          <div className="reveal mb-14">
            <span className="counter-item font-mono text-lg uppercase tracking-[0.4em] text-earth">
              {label}
            </span>
          </div>
        )}

        {quote && (
          <blockquote className="reveal">
            <p className="font-display text-4xl font-light italic leading-[1.08] text-cream md:text-6xl">
              &quot;{quote}&quot;
            </p>
          </blockquote>
        )}

        {(author || concepts) && (
          <>
            <div className="reveal mt-16 h-px bg-cream/10" />

            <div className="reveal mt-8 flex flex-wrap items-center gap-4 md:gap-8">
              {author && (
                <span className="font-mono text-xs uppercase tracking-widest text-cream">
                  {author}
                </span>
              )}
              {author && concepts && <span className="h-1 w-1 rounded-full bg-cream" />}
              {concepts && (
                <span className="font-mono text-xs uppercase tracking-widest text-cream">
                  {concepts}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
