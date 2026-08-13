import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-4 pt-24 pb-24 text-center">
      <span className="text-xs uppercase tracking-[0.28em] text-earth">Error 404</span>

      <h1 className="font-display text-6xl font-black leading-none tracking-[-0.03em] text-cream sm:text-8xl md:text-9xl">
        404
      </h1>

      <p className="max-w-md font-body text-base leading-relaxed text-earth-accent md:text-lg">
        Esta página no existe o fue movida. Puede que el enlace esté roto o que la hayamos
        cambiado de lugar.
      </p>

      <Button
        asChild
        variant="link"
        className="mt-4 inline-flex h-auto items-center gap-2 border border-earth-accent/15 px-6 py-3 text-xs uppercase tracking-[0.15em] text-earth-accent/80 transition-colors duration-300 hover:border-earth-accent/40 hover:text-earth-accent"
      >
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  )
}
