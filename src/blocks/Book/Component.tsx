import React, { HTMLAttributes } from 'react'

import type { BookBlock as BookBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { slugify } from '@/utilities/slugify'
import { Reveal } from '@/components/Reveal'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { BookClient } from './BookClient'

export const BookBlock: React.FC<BookBlockProps & HTMLAttributes<HTMLElement>> = ({
  label,
  paginas,
  className,
  id,
}) => {
  const pages = (paginas ?? []).map((pagina) => ({
    label: pagina.label,
    anchorIds: (pagina.contenido ?? [])
      .map((block) => ('blockName' in block && block.blockName ? slugify(block.blockName) : null))
      .filter((anchorId): anchorId is string => Boolean(anchorId)),
    content: <RenderBlocks blocks={pagina.contenido ?? []} variant="nested" />,
  }))

  return (
    <section id={id} className={cn(className)}>
      <div className="mx-auto container">
        {label && (
          <Reveal className="mb-14">
            <span className="font-bold counter-item wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
              {label}
            </span>
          </Reveal>
        )}

        {pages.length > 0 && <BookClient pages={pages} />}
      </div>
    </section>
  )
}
