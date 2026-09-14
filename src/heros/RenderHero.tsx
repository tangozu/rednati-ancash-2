import React from 'react'

import type { Page } from '@/payload-types'

import { DefaultHero } from '@/heros/DefaultHero'

const heroes = {
  default: DefaultHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type /*|| type === 'none'*/) return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
