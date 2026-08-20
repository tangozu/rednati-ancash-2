import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { ContactoBlock } from '@/blocks/Contacto/Component'
import { ElDestinoBlock } from '@/blocks/ElDestino/Component'
import { ExpedicionBlock } from '@/blocks/Expedicion/Component'
import { GaleriaBlock } from '@/blocks/Galeria/Component'
import { LaRutaBlock } from '@/blocks/LaRuta/Component'
import { ManifiestoBlock } from '@/blocks/Manifiesto/Component'
import { RouteMapBlock } from '@/blocks/RouteMap/Component'

const blockComponents = {
  manifiesto: ManifiestoBlock,
  laRuta: LaRutaBlock,
  routeMap: RouteMapBlock,
  expedicion: ExpedicionBlock,
  galeria: GaleriaBlock,
  elDestino: ElDestinoBlock,
  contacto: ContactoBlock,
}

const fullBleedBlockTypes = new Set([
  'manifiesto',
  'laRuta',
  'routeMap',
  'expedicion',
  'galeria',
  'elDestino',
  'contacto',
])

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          const bg = index % 2 === 1 ? 'bg-bg' : 'bg-panel'

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              if (fullBleedBlockTypes.has(blockType)) {
                return (
                  <Block
                    {...block}
                    // @ts-expect-error there may be some mismatch between the expected types here
                    key={index}
                    // @ts-expect-error there may be some mismatch between the expected types here
                    className={cn(' py-24 ', bg)}
                  />
                )
              }

              return (
                <div className={cn('my-16', bg)} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
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
