import React, { Fragment } from 'react'

import { cn } from '@/utilities/ui'
import { slugify } from '@/utilities/slugify'

import { BookBlock } from '@/blocks/Book/Component'
import { ContactoBlock } from '@/blocks/Contacto/Component'
import { ExpedicionBlock } from '@/blocks/Expedicion/Component'
import { GaleriaBlock } from '@/blocks/Galeria/Component'
import { LaRutaBlock } from '@/blocks/LaRuta/Component'
import { LineaTrabajoBlock } from '@/blocks/LineaTrabajo/Component'
import { ManifiestoBlock } from '@/blocks/Manifiesto/Component'
import { RouteMapBlock } from '@/blocks/RouteMap/Component'
import { SeccionesBlock } from '@/blocks/Secciones/Component'

const blockComponents = {
  manifiesto: ManifiestoBlock,
  laRuta: LaRutaBlock,
  routeMap: RouteMapBlock,
  expedicion: ExpedicionBlock,
  lineaTrabajo: LineaTrabajoBlock,
  secciones: SeccionesBlock,
  galeria: GaleriaBlock,
  contacto: ContactoBlock,
  book: BookBlock,
}

const fullBleedBlockTypes = new Set([
  'manifiesto',
  'laRuta',
  'routeMap',
  'expedicion',
  'lineaTrabajo',
  'secciones',
  'galeria',
  'contacto',
  'book',
])

type RenderableBlock = {
  blockType: string
  blockName?: string | null
  id?: string | null
}

export const RenderBlocks: React.FC<{
  blocks: RenderableBlock[]
  /**
   * 'page' (default): top-level page sections — full-bleed padding + alternating background.
   * 'nested': rendered inside a Book page panel, which already supplies its own padding/background,
   * so blocks here just get light spacing and their anchor id, no bg alternation.
   */
  variant?: 'page' | 'nested'
}> = (props) => {
  const { blocks, variant = 'page' } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType, blockName } = block
          const anchorId = blockName ? slugify(blockName) : undefined
          const bg = index % 2 === 1 ? 'bg-bg' : 'bg-panel'

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              if (variant === 'nested') {
                return (
                  <div className="my-8" key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} id={anchorId} />
                  </div>
                )
              }

              if (fullBleedBlockTypes.has(blockType)) {
                return (
                  <Block
                    {...block}
                    // @ts-expect-error there may be some mismatch between the expected types here
                    key={index}
                    // @ts-expect-error there may be some mismatch between the expected types here
                    id={anchorId}
                    // @ts-expect-error there may be some mismatch between the expected types here
                    className={cn(' py-24 ', bg)}
                  />
                )
              }

              return (
                <div className={cn('my-16', bg)} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} id={anchorId} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
