'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useLenis } from '@/providers/SmoothScroll'
import { cn } from '@/utilities/ui'
import { registerBook, unregisterBook } from './bookRegistry'

const EASE = [0.16, 1, 0.3, 1] as const

export type BookPage = {
  label: string
  anchorIds: string[]
  content: React.ReactNode
}

export const BookClient: React.FC<{ pages: BookPage[] }> = ({ pages }) => {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const instanceId = useId()
  const lenis = useLenis()

  useEffect(() => {
    registerBook(instanceId, {
      pages: pages.map((page) => page.anchorIds),
      setActive: (index) => setActive(index),
      getSectionElement: () => sectionRef.current,
    })
    return () => unregisterBook(instanceId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instanceId, pages])

  const handleBottomSelect = (index: number) => {
    setActive(index)
    if (!sectionRef.current) return
    if (lenis) {
      lenis.scrollTo(sectionRef.current, { offset: -64 })
    } else {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (pages.length === 0) return null

  const panelId = `book-panel-${instanceId}`

  return (
    <div ref={sectionRef}>
      <PillNav
        pages={pages}
        active={active}
        onSelect={setActive}
        idPrefix={`${instanceId}-top`}
        panelId={panelId}
      />

      <div className="my-10" role="tabpanel" id={panelId} aria-labelledby={`${instanceId}-top-tab-${active}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {pages[active]?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      <PillNav
        pages={pages}
        active={active}
        onSelect={handleBottomSelect}
        idPrefix={`${instanceId}-bottom`}
        panelId={panelId}
      />
    </div>
  )
}

const PillNav: React.FC<{
  pages: BookPage[]
  active: number
  onSelect: (index: number) => void
  idPrefix: string
  panelId: string
}> = ({ pages, active, onSelect, idPrefix, panelId }) => {
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      onSelect((index + 1) % pages.length)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      onSelect((index - 1 + pages.length) % pages.length)
    }
  }

  return (
    <div role="tablist" aria-label="Servicios" className="flex flex-wrap gap-3">
      {pages.map((page, index) => {
        const selected = index === active
        return (
          <button
            key={index}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${index}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={cn(
              'rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] transition-colors sm:text-sm',
              selected ? 'bg-earth text-bg' : 'bg-cream/10 text-cream hover:bg-cream/20',
            )}
          >
            {page.label}
          </button>
        )
      })}
    </div>
  )
}
