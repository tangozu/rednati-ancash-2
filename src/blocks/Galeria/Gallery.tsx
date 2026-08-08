'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from 'framer-motion'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

const ROW_HEIGHT = 220
const ROW_COUNT = 3
const AUTO_SCROLL_SPEED = 40 // px per second

const wrap = (value: number, width: number) => {
  if (width <= 0) return 0
  // Always lands in (-width, 0], regardless of how large the jump is.
  const mod = value % width
  return mod > 0 ? mod - width : mod
}

const Row: React.FC<{
  index: number
  row: { image: MediaType; index: number }[]
  onSelect: (index: number) => void
  isInteractingRef: React.RefObject<boolean>
}> = ({ index, row, onSelect, isInteractingRef }) => {
  const measureRef = useRef<HTMLDivElement>(null)
  const [rowWidth, setRowWidth] = useState(0)
  const rawX = useMotionValue(0)
  const x = useTransform(rawX, (v) => wrap((index % 2 ? 1 : -1) * v, rowWidth))

  useEffect(() => {
    const el = measureRef.current
    if (!el) return

    const measure = () => setRowWidth(el.scrollWidth)
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [row])

  useAnimationFrame((_, delta) => {
    if (rowWidth <= 0 || isInteractingRef.current) return
    rawX.set(rawX.get() + (AUTO_SCROLL_SPEED * delta) / 1000)
  })

  const renderItems = (keyPrefix: string) => (
    <div className="flex shrink-0 items-center gap-3">
      {row.map(({ image: img, index: i }) => {
        const ratio = img.width && img.height ? img.width / img.height : 1
        return (
          <motion.button
            type="button"
            key={`${keyPrefix}-${img.id}`}
            onClick={() => onSelect(i)}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="group relative shrink-0 overflow-hidden rounded-2xl bg-media-placeholder shadow-sm ring-1 ring-black/5"
            style={{ height: ROW_HEIGHT, width: ROW_HEIGHT * ratio }}
          >
            <Media
              fill
              imgClassName="pointer-events-none h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              resource={img}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>
        )
      })}
    </div>
  )

  return (
    <motion.div
      style={{ x }}
      className="flex shrink-0 gap-3"
    >
      <div ref={measureRef} className="flex shrink-0 gap-3">
        {renderItems('a')}
      </div>
      {renderItems('b')}
      {renderItems('c')}
    </motion.div>
  )
}

export const Gallery: React.FC<{ images: MediaType[] }> = ({ images }) => {
  const [selected, setSelected] = useState<number | null>(null)
  const isInteractingRef = useRef(false)

  const rows = images.reduce<{ image: MediaType; index: number }[][]>((acc, image, index) => {
    const rowIndex = index % ROW_COUNT
    acc[rowIndex] ||= []
    acc[rowIndex].push({ image, index })
    return acc
  }, [])

  useEffect(() => {
    isInteractingRef.current = selected !== null
  }, [selected])

  useEffect(() => {
    if (selected === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowRight')
        setSelected((i) => (i === null ? i : Math.min(i + 1, images.length - 1)))
      if (e.key === 'ArrowLeft') setSelected((i) => (i === null ? i : Math.max(i - 1, 0)))
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected, images.length])

  const selectedImage = selected !== null ? images[selected] : null

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col gap-3">
        {rows.map((row, rowIndex) => (
          <Row
            index={rowIndex}
            key={rowIndex}
            row={row}
            onSelect={setSelected}
            isInteractingRef={isInteractingRef}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-bg to-transparent" />

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.button
              type="button"
              aria-label="Cerrar"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ✕
            </motion.button>

            {selected > 0 && (
              <button
                type="button"
                aria-label="Anterior"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelected((i) => (i === null ? i : Math.max(i - 1, 0)))
                }}
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
              >
                ‹
              </button>
            )}

            {selected < images.length - 1 && (
              <button
                type="button"
                aria-label="Siguiente"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelected((i) => (i === null ? i : Math.min(i + 1, images.length - 1)))
                }}
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
              >
                ›
              </button>
            )}

            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center"
            >
              {selectedImage && (
                <Media
                  imgClassName="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
                  resource={selectedImage}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
