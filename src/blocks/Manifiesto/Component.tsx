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
      <div className="mx-auto max-w-screen-lg">
        {label && (
          <div className="reveal mb-14">
            <span className="font-mono text-12 uppercase tracking-[0.4em] text-earth">{label}</span>
          </div>
        )}

        {quote && (
          <blockquote className="reveal">
            <p
              className="font-display font-light italic leading-[1.08] text-cream"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.8rem)' }}
            >
              &quot;{quote}&quot;
            </p>
          </blockquote>
        )}

        {(author || concepts) && (
          <>
            <div className="reveal mt-16 h-px bg-cream/10" />

            <div className="reveal mt-8 flex flex-wrap items-center gap-4 md:gap-8">
              {author && (
                <span className="font-mono text-4 uppercase tracking-widest text-cream">
                  {author}
                </span>
              )}
              {author && concepts && <span className="h-1 w-1 rounded-full bg-cream" />}
              {concepts && (
                <span className="font-mono text-4 uppercase tracking-widest text-cream">
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
