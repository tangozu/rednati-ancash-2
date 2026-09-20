import type { Block } from 'payload'

import { Contacto } from './Contacto/config'
import { Expedicion } from './Expedicion/config'
import { Galeria } from './Galeria/config'
import { LaRuta } from './LaRuta/config'
import { LineaTrabajo } from './LineaTrabajo/config'
import { Manifiesto } from './Manifiesto/config'
import { RouteMap } from './RouteMap/config'
import { Secciones } from './Secciones/config'

/**
 * Ordinary content blocks, reusable both as top-level page sections and as the
 * nested content of a Book page (see src/blocks/Book/config.ts). Deliberately
 * excludes `Book` itself (no self-nesting) and the removed `ElDestino` block.
 */
export const contentBlocks: Block[] = [
  Manifiesto,
  LaRuta,
  RouteMap,
  Expedicion,
  LineaTrabajo,
  Secciones,
  Galeria,
  Contacto,
]
