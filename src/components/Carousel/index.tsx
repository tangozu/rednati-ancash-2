'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/utilities/ui'

type CarouselVariant = 'slide' | 'fade'

type CarouselProps = {
  /**
   * Pre-rendered slide content. Must be plain ReactNode (not a render-prop function) so this
   * component can be used from Server Components too — functions can't cross the RSC boundary.
   */
  slides: React.ReactNode[]
  variant?: CarouselVariant
  loop?: boolean
  autoplay?: boolean
  autoplayDelay?: number
  showArrows?: boolean
  showDots?: boolean
  ariaLabel: string
  className?: string
  slideClassName?: string
  onSlideChange?: (index: number) => void
}

const arrowButtonClassName =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur-sm transition-colors hover:bg-cream/20 disabled:pointer-events-none disabled:opacity-30'

export function Carousel({ variant = 'slide', ...props }: CarouselProps) {
  if (variant === 'fade') {
    return <FadeCarousel {...props} />
  }

  return <SlideCarousel {...props} />
}

type VariantProps = Omit<CarouselProps, 'variant'>

function SlideCarousel({
  slides,
  loop = true,
  autoplay = false,
  autoplayDelay = 5000,
  showArrows = true,
  showDots,
  ariaLabel,
  className,
  slideClassName,
  onSlideChange,
}: VariantProps) {
  const plugins = autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : []
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: 'start' }, plugins)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    setSelectedIndex(index)
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
    onSlideChange?.(index)
  }, [emblaApi, onSlideChange])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const showDotsResolved = showDots ?? slides.length > 1

  if (slides.length === 0) return null

  return (
    <div
      className={cn('relative', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn('min-w-0 shrink-0 grow-0 basis-full', slideClassName)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${slides.length}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            disabled={!loop && !canPrev}
            onClick={() => emblaApi?.scrollPrev()}
            className={cn(arrowButtonClassName, 'absolute left-3 top-1/2 -translate-y-1/2 z-10')}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            disabled={!loop && !canNext}
            onClick={() => emblaApi?.scrollNext()}
            className={cn(arrowButtonClassName, 'absolute right-3 top-1/2 -translate-y-1/2 z-10')}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showDotsResolved && slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir a la diapositiva ${index + 1}`}
              aria-current={index === selectedIndex}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                index === selectedIndex ? 'w-5 bg-cream' : 'bg-cream/40 hover:bg-cream/60',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FadeCarousel({
  slides,
  loop = true,
  autoplay = false,
  autoplayDelay = 5000,
  showArrows = true,
  showDots,
  ariaLabel,
  className,
  slideClassName,
  onSlideChange,
}: VariantProps) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (next: number) => {
      const wrapped = loop
        ? (next + slides.length) % slides.length
        : Math.min(Math.max(next, 0), slides.length - 1)
      setIndex(wrapped)
      onSlideChange?.(wrapped)
    },
    [slides.length, loop, onSlideChange],
  )

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return
    timerRef.current = setInterval(() => goTo(index + 1), autoplayDelay)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, autoplayDelay, index, slides.length])

  useEffect(() => {
    if (slides.length === 0) return
    if (index > slides.length - 1) setIndex(0)
  }, [slides.length, index])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goTo(index - 1)
    if (e.key === 'ArrowRight') goTo(index + 1)
  }

  const showDotsResolved = showDots ?? slides.length > 1
  const activeSlide = slides[index]

  if (slides.length === 0 || activeSlide === undefined) return null

  return (
    <div
      className={cn('relative', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={slides.length > 1 ? 0 : undefined}
      onKeyDown={onKeyDown}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className={cn('h-full w-full', slideClassName)}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} de ${slides.length}`}
        >
          {activeSlide}
        </motion.div>
      </AnimatePresence>

      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => goTo(index - 1)}
            className={cn(arrowButtonClassName, 'absolute left-3 top-1/2 -translate-y-1/2 z-10')}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => goTo(index + 1)}
            className={cn(arrowButtonClassName, 'absolute right-3 top-1/2 -translate-y-1/2 z-10')}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showDotsResolved && slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la diapositiva ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                i === index ? 'w-5 bg-cream' : 'bg-cream/40 hover:bg-cream/60',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
