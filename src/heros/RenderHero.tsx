import React from 'react'

import type { Page } from '@/payload-types'

import { LlamaTrekHero } from '@/heros/LlamaTrekHero'

const heroes = {
  llamaTrek: LlamaTrekHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type /*|| type === 'none'*/) return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
