import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()
  const socialLinksData = await getCachedGlobal('social-links', 1)()

  return <HeaderClient data={headerData} socialLinks={socialLinksData?.links ?? []} />
}
