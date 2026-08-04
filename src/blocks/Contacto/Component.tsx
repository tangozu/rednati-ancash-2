import React from 'react'

import type { ContactoBlock as ContactoBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const ContactoBlock: React.FC<ContactoBlockProps> = ({
  preTitle,
  title,
  subtitle,
  backgroundMedia,
  guide,
  whatsapp,
  email,
  address,
}) => {
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp.replace(/[^\d]/g, '')}` : undefined

  return (
    <section className="relative overflow-hidden bg-panel py-32 md:py-52">
      {backgroundMedia && typeof backgroundMedia === 'object' && (
        <div className="absolute inset-0">
          <Media
            fill
            imgClassName="h-full w-full object-cover opacity-[0.06]"
            resource={backgroundMedia}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-panel/70 via-transparent to-panel/80" />
        </div>
      )}

      <div className="relative mx-auto max-w-screen-md px-6 text-center md:px-16">
        {preTitle && (
          <div className="reveal mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-earth">
              {preTitle}
            </span>
          </div>
        )}

        {title && (
          <h2
            className="reveal mb-10 font-display font-black leading-[0.92] text-cream"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)' }}
          >
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="reveal mx-auto mb-6 max-w-sm font-body text-base leading-relaxed text-cream/50 md:text-lg">
            {subtitle}
          </p>
        )}
        {guide && (
          <p className="reveal mb-14 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/35">
            Guía: {guide}
          </p>
        )}

        <div className="stagger-parent flex flex-col items-center justify-center gap-4 sm:flex-row">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-earth px-8 py-4 font-body text-sm font-medium tracking-wide text-bg transition-colors duration-300 hover:bg-earth/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-earth"
            >
              WhatsApp {whatsapp}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 border border-cream/15 px-8 py-4 font-body text-sm tracking-wide text-cream/75 transition-all duration-300 hover:border-cream/40 hover:bg-cream/[0.04] hover:text-cream"
            >
              {email}
            </a>
          )}
        </div>

        {address && (
          <div className="reveal mt-16 border-t border-cream/[0.07] pt-8">
            <p className="font-mono text-[9px] uppercase leading-loose tracking-[0.22em] text-cream/25">
              {address}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
