'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { EmailButton } from '@/components/Buttons/emailButton'
import RichText from '@/components/RichText'

const EASE = [0.16, 1, 0.3, 1] as const

const imgVariants: Variants = {
  hidden: { scale: 1.1 },
  visible: { scale: 1, transition: { duration: 2.8, ease: [0.22, 1, 0.36, 1] } },
}

const metaVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 1.0 } },
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1.4 },
  },
}

const subVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 2.8 } },
}

const scrollVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: EASE, delay: 3.2 } },
}

export const LlamaTrekHero: React.FC<Page['hero']> = ({ llamaTrekHeroFields }) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-bg text-cream">
      {llamaTrekHeroFields?.imagenDeFondo &&
        typeof llamaTrekHeroFields.imagenDeFondo === 'object' && (
          <motion.div
            className="absolute inset-0"
            initial="hidden"
            animate="visible"
            variants={imgVariants}
          >
            <Media
              imgClassName="h-full w-full object-cover"
              videoClassName="object-cover object-center h-full w-full"
              priority
              resource={llamaTrekHeroFields.imagenDeFondo}
            />
          </motion.div>
        )}

      <div className="mx-auto container ">
        <div className="relative z-10 flex min-h-screen flex-col justify-between w-fit mr-auto px-4 sm:px-8">
          <div className="absolute mt-16 -z-10 inset-0 w-full bg-bg/60" />
          <div className="mt-24 flex flex-col items-start gap-4 mr-auto">
            <motion.div
              className="flex flex-wrap items-center gap-4 sm:gap-5"
              initial="hidden"
              animate="visible"
              variants={metaVariants}
            >
              <span className="text-xs uppercase tracking-[0.28em] text-cream">
                {llamaTrekHeroFields?.altitude}
              </span>
            </motion.div>

            <motion.h1
              className="max-w-full  font-display text-xl font-black leading-[0.88] tracking-[-0.03em] text-cream sm:max-w-5xl 3xs:text-3xl sm:text-5xl md:text-7xl"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
            >
              {llamaTrekHeroFields?.title && llamaTrekHeroFields?.title}
            </motion.h1>

            <motion.div
              className="mt-8 max-w-full sm:max-w-sm md:max-w-md"
              initial="hidden"
              animate="visible"
              variants={subVariants}
            >
              {llamaTrekHeroFields?.subtitleV2 && (
                <RichText
                  data={llamaTrekHeroFields.subtitleV2}
                  enableProse={false}
                  enableGutter={false}
                  className="wrap-break-word font-body text-earth-accent text-base md:text-lg leading-relaxed"
                />
              )}
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial="hidden"
              animate="visible"
              variants={subVariants}
            >
              {llamaTrekHeroFields?.emailContact?.email && (
                <EmailButton email={llamaTrekHeroFields.emailContact.email} />
              )}
            </motion.div>
          </div>

          <motion.div
            className="flex items-center gap-3.5"
            initial="hidden"
            animate="visible"
            variants={scrollVariants}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
