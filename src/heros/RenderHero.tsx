import React from 'react'

import type { Page } from '@/payload-types'

import { LlamaTrekHero } from '@/heros/llamaTrekHero'

const heroes = {
  llamaTrek: LlamaTrekHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  console.log('RenderHero type:', type) // Log the props to see what is being passed
  if (!type /*|| type === 'none'*/) return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
