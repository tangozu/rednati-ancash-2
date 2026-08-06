'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Mail, MessageCircleMore } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmailButton } from '@/components/Buttons/emailButton'
import { WhatsappButton } from '@/components/Buttons/whatsappButton'

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
      <section className="relative min-h-screen overflow-hidden bg-bg text-cream">
        {llamaTrekHeroFields?.imagenDeFondo &&
          typeof llamaTrekHeroFields.imagenDeFondo === 'object' && (
            <div className="absolute inset-0">
              <Media
                imgClassName="h-full w-full object-cover"
                videoClassName="object-cover object-center h-full w-full"
                priority
                resource={llamaTrekHeroFields.imagenDeFondo}
              />
            </div>
          )}

        <div className="absolute inset-0 bg-linear-to-t from-bg/40 via-bg/40 to-bg/5" />
        <div className="absolute inset-0 bg-linear-to-r from-bg/40 via-bg/40 to-bg/5" />
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="mt-24 flex flex-col items-start gap-4 ">
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {llamaTrekHeroFields?.rednatiLogo &&
                typeof llamaTrekHeroFields.rednatiLogo === 'object' && (
                  <div className="relative  w-24">
                    <Media resource={llamaTrekHeroFields.rednatiLogo} />
                  </div>
                )}
              <span className="h-px w-12 my-auto bg-gold/60" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-cream">
                {llamaTrekHeroFields?.region} · {llamaTrekHeroFields?.altitude}
              </span>
            </div>

            <h1 className="max-w-5xl font-['Fraunces'] text-[clamp(3rem,14vw,6rem)] font-black leading-[0.88] tracking-[-0.03em] text-gold">
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
                <p className="font-body text-bg text-base md:text-lg leading-relaxed">
                  {llamaTrekHeroFields.subtitle}
                </p>
              )}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {llamaTrekHeroFields?.emailContact?.email && (
                <EmailButton email={llamaTrekHeroFields.emailContact.email} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="relative h-14 w-px overflow-hidden bg-cream/15">
              <div className="animate-scroll-line absolute inset-x-0 top-0 h-full bg-earth" />
            </div>
            <div className=" flex flex-col items-end gap-1.5 text-right sm:bottom-8 sm:right-8 md:bottom-10 md:right-10">
              <span className="text-[9px] uppercase tracking-[0.2em] text-cream/20">
                {llamaTrekHeroFields?.coordinates}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-cream/20">
                {llamaTrekHeroFields?.location}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
