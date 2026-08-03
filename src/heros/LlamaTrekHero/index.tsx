'use client'

import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export const LlamaTrekHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  eyebrow,
  title,
  metadata,
  coordinates,
  location,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0e0c09] text-[#ede8df]">
      {media && typeof media === 'object' && (
        <div className="absolute inset-0">
          <Media
            fill
            imgClassName="object-cover object-center"
            videoClassName="object-cover object-center h-full w-full"
            priority
            resource={media}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,9,0.18)_0%,rgba(14,12,9,0.46)_48%,rgba(14,12,9,0.86)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,12,9,0.58)_0%,rgba(14,12,9,0.18)_50%,rgba(14,12,9,0.05)_100%)]" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <div className="mb-7 flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="text-[10px] uppercase tracking-[0.38em] text-[#c4844a]">
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-[#c4844a]/60" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#ede8df]/70">
            {metadata}
          </span>
        </div>

        <h1 className="max-w-5xl font-['Fraunces'] text-[clamp(5rem,14vw,11.5rem)] font-black leading-[0.88] tracking-[-0.03em] text-[#ede8df]">
          {title?.includes(' ') ? (
            <>
              {title.split(' ').slice(0, 1).join(' ')}
              <br />
              {title.split(' ').slice(1).join(' ')}
            </>
          ) : (
            title
          )}
        </h1>

        <div className="mt-8 max-w-xl">
          {richText && <RichText className="text-base leading-relaxed text-[#ede8df]/75 md:text-lg" data={richText} enableGutter={false} />}
        </div>

        {Array.isArray(links) && links.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink
                    {...link}
                    className="rounded-full border border-[#ede8df]/20 bg-[#ede8df]/10 px-5 py-3 text-sm font-medium uppercase tracking-[0.24em] text-[#ede8df] transition hover:border-[#c4844a]/60 hover:bg-[#c4844a]/20"
                  />
                </li>
              )
            })}
          </ul>
        )}

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
          {coordinates}
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#ede8df]/20">
          {location}
        </span>
      </div>
    </section>
  )
}
