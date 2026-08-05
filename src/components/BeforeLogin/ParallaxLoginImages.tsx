'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import './ParallaxLoginImages.scss'

export interface ParallaxImage {
  url: string
  alt: string
}

interface ParallaxLoginImagesProps {
  images: ParallaxImage[]
}

// Max travel (px) per axis for each slot — larger values feel "closer" to the viewer.
const DEPTHS = [22, 40, 30]

export const ParallaxLoginImages: React.FC<ParallaxLoginImagesProps> = ({ images }) => {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  // Payload nests `beforeLogin` inside the same card we style as `.template-minimal__wrap`,
  // so without a portal these images would be descendants of the card and could never be
  // covered by it (an element's own background always paints behind its own descendants,
  // regardless of z-index). Portalling to <body> makes them true siblings of the card so
  // the card's z-index can legitimately sit above them.
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2

      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const depth = DEPTHS[i % DEPTHS.length]
        el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted) return null

  const cards = images.slice(0, 3)

  return createPortal(
    <div className="parallax-login-images" aria-hidden="true">
      {cards.map((image, i) => (
        <div
          key={image.url}
          ref={(el) => {
            itemRefs.current[i] = el
          }}
          className={`parallax-login-images__item parallax-login-images__item--${i}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.url} alt={image.alt} className="parallax-login-images__img" />
        </div>
      ))}
      <div className="parallax-login-images__overlay" />
    </div>,
    document.body,
  )
}
