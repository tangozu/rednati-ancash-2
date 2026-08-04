'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useHeaderTheme } from '@/providers/HeaderTheme'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const LlamaTrekHero: React.FC<Page['hero']> = ({
  //links,
  //media,
  llamaTrekHeroFields,
  // manifestoLabel,
  // manifesto,
  // manifestoAuthor,
  // manifestoKeywords,
  // rutaLabel,
  // rutaImage,
  // rutaTitle,
  // rutaDescription,
  // rutaStats,
}) => {
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

  //const hasManifesto = Boolean(manifesto || manifestoLabel || manifestoAuthor || manifestoKeywords)
  //const hasRuta = Boolean(
  //  rutaTitle || rutaDescription || rutaImage || (rutaStats && rutaStats.length > 0),
  //)

  return (
    <div ref={containerRef}>
      <section className="relative min-h-screen overflow-hidden bg-[#0e0c09] text-[#ede8df]">
        {llamaTrekHeroFields?.media && typeof llamaTrekHeroFields.media === 'object' && (
          <div className="absolute inset-0">
            <Media
              fill
              imgClassName="object-cover object-center"
              videoClassName="object-cover object-center h-full w-full"
              priority
              resource={llamaTrekHeroFields.media}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,9,0.18)_0%,rgba(14,12,9,0.46)_48%,rgba(14,12,9,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,12,9,0.58)_0%,rgba(14,12,9,0.18)_50%,rgba(14,12,9,0.05)_100%)]" />

        <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="mb-7 flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-[10px] uppercase tracking-[0.38em] text-[#c4844a]">
              {llamaTrekHeroFields?.logo}
            </span>
            <span className="h-px w-10 bg-[#c4844a]/60" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#ede8df]/70">
              {llamaTrekHeroFields?.metadata}
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

          <div className="mt-8 max-w-xl">
            {llamaTrekHeroFields?.richText && (
              <RichText
                className="text-base leading-relaxed text-[#ede8df]/75 md:text-lg"
                data={llamaTrekHeroFields.richText}
                enableGutter={false}
              />
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

      {/*hasManifesto && (
        <section className="bg-bg px-6 py-32 md:px-16 md:py-52 xl:px-32">
          <div className="mx-auto max-w-screen-lg">
            {manifestoLabel && (
              <div className="reveal mb-14">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-earth">
                  {manifestoLabel}
                </span>
              </div>
            )}

            {manifesto && (
              <blockquote className="reveal">
                <RichText
                  className="font-display font-light italic leading-[1.08] text-cream [&_p]:text-[clamp(1.9rem,4.5vw,3.8rem)] [&_p]:leading-[1.08]"
                  data={manifesto}
                  enableGutter={false}
                  enableProse={false}
                />
              </blockquote>
            )}

            {(manifestoAuthor || manifestoKeywords) && (
              <>
                <div className="reveal mt-16 h-px bg-cream/[0.08]" />

                <div className="reveal mt-8 flex flex-wrap items-center gap-4 md:gap-8">
                  {manifestoAuthor && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/30">
                      {manifestoAuthor}
                    </span>
                  )}
                  {manifestoAuthor && manifestoKeywords && (
                    <span className="h-1 w-1 rounded-full bg-cream/15" />
                  )}
                  {manifestoKeywords && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/20">
                      {manifestoKeywords}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      )*/}

      {/*hasRuta && (
        <section className="overflow-hidden bg-bg py-16 md:py-0">
          <div className="mx-auto mb-16 max-w-screen-xl px-6 md:mb-0 md:px-16 xl:px-24">
            {rutaLabel && (
              <div className="reveal pt-4 md:pt-20">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-earth">
                  {rutaLabel}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
            <div className="clip-reveal order-1 aspect-[3/4] overflow-hidden bg-[#131009] md:aspect-auto md:min-h-[700px]">
              {rutaImage && typeof rutaImage === 'object' && (
                <Media
                  fill
                  imgClassName="h-full w-full object-cover object-center transition-transform duration-[3s] ease-out hover:scale-[1.03]"
                  resource={rutaImage}
                />
              )}
            </div>

            <div className="order-2 flex flex-col justify-center px-6 py-16 md:px-14 md:py-24 xl:px-20">
              {rutaTitle && (
                <h2 className="reveal mb-8 font-display font-bold leading-[1.05] text-cream text-[clamp(2.2rem,4.5vw,4rem)]">
                  {rutaTitle}
                </h2>
              )}

              {rutaDescription && (
                <RichText
                  className="reveal font-body text-cream/55 [&_p]:mb-6 [&_p]:text-base [&_p]:leading-relaxed md:[&_p]:text-lg"
                  data={rutaDescription}
                  enableGutter={false}
                  enableProse={false}
                />
              )}

              {Array.isArray(rutaStats) && rutaStats.length > 0 && (
                <div className="stagger-parent mt-8 grid grid-cols-3 gap-6">
                  {rutaStats.map(({ num, label }, i) => (
                    <div key={i} className="border-t border-cream/10 pt-6">
                      <span className="mb-2 block font-display font-bold text-earth text-[clamp(1.4rem,2.5vw,2rem)]">
                        {num}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-cream/35">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )*/}
    </div>
  )
}
