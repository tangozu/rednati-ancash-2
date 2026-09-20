'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from '@studio-freight/lenis'

import { resolveAnchor } from '@/blocks/Book/bookRegistry'

const HEADER_OFFSET = -64

const LenisContext = createContext<Lenis | null>(null)

export const SmoothScrollProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const instance = new Lenis({})
    setLenis(instance)

    let rafId: number
    const raf = (time: number) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
      <InitialHashScroll />
    </LenisContext.Provider>
  )
}

/**
 * Handles landing on a page with a hash already in the URL (e.g. a header nav link
 * pointing from another page to "/new-shancayan-page#some-anchor"), including anchors
 * hidden inside a Book page — cases native browser hash-scroll can't resolve on its own.
 * Re-runs on pathname change since client-side route transitions don't remount this provider.
 */
const InitialHashScroll: React.FC = () => {
  const scrollToId = useScrollToId()
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.length > 1) {
      scrollToId(hash.slice(1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}

export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

const SCROLL_RETRY_INTERVAL_MS = 50
const SCROLL_RETRY_MAX_ATTEMPTS = 40 // ~2s, defensive fallback for ordinary (non-Book) anchors

/**
 * Scrolls to an in-page anchor, activating its containing Book page first if the
 * anchor currently lives inside a hidden Book panel (see src/blocks/Book/bookRegistry.ts).
 *
 * For Book targets we scroll to the Book's own wrapper element (pill nav + panel), not the
 * nested title itself: the panel's content keeps entering/exiting mid-transition
 * (`AnimatePresence mode="wait"`), so its position is a moving target and capturing it
 * mid-animation overshoots the scroll. The Book wrapper is always mounted regardless of
 * which page is active, so it's a stable, immediate target — this matches the same
 * "scroll to the top of the Book" behavior already used by the bottom pill nav.
 */
export function useScrollToId(): (id: string) => void {
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  lenisRef.current = lenis

  return (id: string) => {
    const target = resolveAnchor(id)

    const scrollToElement = (el: HTMLElement) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: HEADER_OFFSET })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    if (target) {
      target.setActive(target.pageIndex)
      const sectionEl = target.getSectionElement()
      if (sectionEl) {
        scrollToElement(sectionEl)
        return
      }
    }

    const scrollWhenReady = (attemptsLeft: number) => {
      const el = document.getElementById(id)
      if (el) {
        scrollToElement(el)
        return
      }
      if (attemptsLeft > 0) {
        setTimeout(() => scrollWhenReady(attemptsLeft - 1), SCROLL_RETRY_INTERVAL_MS)
      }
    }

    scrollWhenReady(SCROLL_RETRY_MAX_ATTEMPTS)
  }
}
