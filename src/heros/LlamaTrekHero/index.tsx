import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { EmailButton } from '@/components/Buttons/emailButton'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from '@/Header/Component.client'

export const LlamaTrekHero: React.FC<Page['hero']> = ({ llamaTrekHeroFields }) => {
  return (
    <div>
      <section className="relative min-h-screen bg-bg text-cream">
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

        <div className="mx-auto container ">
          <div className="relative z-10 flex min-h-screen flex-col justify-between w-fit mr-auto px-8">
            <div className="absolute mt-16 -z-10 inset-0 w-full bg-bg/60" />
            <div className="mt-24 flex flex-col items-start gap-4 mr-auto">
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                {llamaTrekHeroFields?.rednatiLogo &&
                  typeof llamaTrekHeroFields.rednatiLogo === 'object' && (
                    <div className="relative  w-80 -m-8">
                      <Media resource={llamaTrekHeroFields.rednatiLogo} />
                    </div>
                  )}
                <span className="h-px w-12 my-auto bg-earth" />
                <span className="text-xs uppercase tracking-[0.28em] text-cream">
                  {llamaTrekHeroFields?.altitude}
                </span>
              </div>

              <h1 className="max-w-5xl font-display text-6xl font-black leading-[0.88] tracking-[-0.03em] text-cream sm:text-7xl md:text-8xl lg:text-9xl">
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
                  <p className="font-body text-cream text-base md:text-lg leading-relaxed">
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
                <span className="text-xs uppercase tracking-[0.2em] text-cream">
                  {llamaTrekHeroFields?.coordinates}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-cream">
                  {llamaTrekHeroFields?.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
