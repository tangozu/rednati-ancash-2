'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { useHeaderTheme } from '@/providers/HeaderTheme'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const LlamaTrekHero: React.FC<Page['hero']> = ({ llamaTrekHeroFields }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      containerRef.current?.querySelectorAll<HTMLElement>('.reveal, .clip-reveal').forEach((el) => {
        el.style.opacity = '1'
      })
      return
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 55,
          opacity: 0,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        })
      })

      gsap.utils.toArray<Element>('.clip-reveal').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.7,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      gsap.utils.toArray<Element>('.stagger-parent').forEach((parent) => {
        gsap.from(Array.from(parent.children), {
          y: 45,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      <section className="relative min-h-screen overflow-hidden bg-[#0e0c09] text-[#ede8df]">
        {llamaTrekHeroFields?.imagenDeFondo &&
          typeof llamaTrekHeroFields.imagenDeFondo === 'object' && (
            <div className="absolute inset-0">
              <Media
                imgClassName="object-cover"
                videoClassName="object-cover object-center h-full w-full"
                priority
                resource={llamaTrekHeroFields.imagenDeFondo}
              />
            </div>
          )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,9,0.18)_0%,rgba(14,12,9,0.46)_48%,rgba(14,12,9,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,12,9,0.58)_0%,rgba(14,12,9,0.18)_50%,rgba(14,12,9,0.05)_100%)]" />

        <div className="relative z-10 flex min-h-screen flex-col justify-start px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="mb-12 flex flex-wrap items-center gap-4 sm:gap-5">
            {llamaTrekHeroFields?.rednatiLogo &&
              typeof llamaTrekHeroFields.rednatiLogo === 'object' && (
                <div className="relative h-8 w-24">
                  <Media resource={llamaTrekHeroFields.rednatiLogo} />
                </div>
              )}
            {llamaTrekHeroFields?.llamaTrekLogo &&
              typeof llamaTrekHeroFields.llamaTrekLogo === 'object' && (
                <div className="relative h-8 w-24">
                  <Media resource={llamaTrekHeroFields.llamaTrekLogo} />
                </div>
              )}
            <span className="h-px w-12 my-auto bg-[#c4844a]/60" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#ede8df]">
              {llamaTrekHeroFields?.region} · {llamaTrekHeroFields?.altitude}
            </span>
          </div>

          <h1 className="max-w-5xl font-['Fraunces'] text-[clamp(5rem,14vw,11.5rem)] font-black leading-[0.88] tracking-[-0.03em] text-[#ede8df]">
            {llamaTrekHeroFields?.title?.includes(' ') ? (
              <>
                {llamaTrekHeroFields.title.split(' ').slice(0, 1).join(' ')}
                <br />
                {llamaTrekHeroFields.title.split(' ').slice(1).join(' ')}
              </>
            ) : (
              llamaTrekHeroFields?.title
            )}
          </h1>

          <div className="mt-8 max-w-sm md:max-w-md">
            {llamaTrekHeroFields?.subtitle && (
              <p className="font-body text-cream/65 text-base md:text-lg leading-relaxed">
                {llamaTrekHeroFields.subtitle}
              </p>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {llamaTrekHeroFields?.emailContact?.email && (
              <a
                href={`mailto:${llamaTrekHeroFields.emailContact.email}`}
                className="inline-flex items-center gap-2 border border-[#ede8df]/15 px-6 py-3 text-xs uppercase tracking-[0.15em] text-[#ede8df]/80 transition-colors duration-300 hover:border-[#ede8df]/40 hover:text-[#ede8df]"
              >
                <span aria-hidden>✉️</span>
                {llamaTrekHeroFields.emailContact.label} {llamaTrekHeroFields.emailContact.email}
              </a>
            )}
            {llamaTrekHeroFields?.whatsappContact?.phone && (
              <a
                href={`https://wa.me/${llamaTrekHeroFields.whatsappContact.phone.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#c4844a] px-6 py-3 text-xs uppercase tracking-[0.15em] text-[#0e0c09] transition-colors duration-300 hover:bg-[#c4844a]/85"
              >
                <span aria-hidden>📱</span>
                {llamaTrekHeroFields.whatsappContact.label}{' '}
                {llamaTrekHeroFields.whatsappContact.phone}
              </a>
            )}
          </div>

          <div className="mt-12 flex items-center gap-3.5">
            <div className="relative h-14 w-px overflow-hidden bg-[#ede8df]/15">
              <div className="animate-scroll-line absolute inset-x-0 top-0 h-full bg-[#c4844a]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#ede8df]/35">
              SCROLL
            </span>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1.5 text-right sm:bottom-8 sm:right-8 md:bottom-10 md:right-10">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#ede8df]/20">
            {llamaTrekHeroFields?.coordinates}
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#ede8df]/20">
            {llamaTrekHeroFields?.location}
          </span>
        </div>
      </section>
    </div>
  )
}
