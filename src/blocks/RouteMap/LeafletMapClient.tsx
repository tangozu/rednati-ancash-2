'use client'

import dynamic from 'next/dynamic'

export const LeafletMap = dynamic(() => import('./LeafletMap').then((mod) => mod.LeafletMap), {
  ssr: false,
})
