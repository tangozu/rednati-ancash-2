import React from 'react'

import type { ManifiestoBlock as ManifiestoBlockProps } from '@/payload-types'

export const ManifiestoBlock: React.FC<ManifiestoBlockProps> = ({
  label,
  quote,
  author,
  concepts,
}) => {
  return (
    <section className="bg-bg px-6 py-32 md:px-16 md:py-52 xl:px-32">
      <div className="mx-auto max-w-screen-lg">
        {label && (
          <div className="reveal mb-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-earth">
              {label}
            </span>
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
            <div className="reveal mt-16 h-px bg-cream/[0.08]" />

            <div className="reveal mt-8 flex flex-wrap items-center gap-4 md:gap-8">
              {author && (
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/30">
                  {author}
                </span>
              )}
              {author && concepts && <span className="h-1 w-1 rounded-full bg-cream/15" />}
              {concepts && (
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/20">
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
