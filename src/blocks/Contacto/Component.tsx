import React, { HTMLAttributes } from 'react'

import type { ContactoBlock as ContactoBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { WhatsappButton } from '@/components/Buttons/whatsappButton'
import { EmailButton } from '@/components/Buttons/emailButton'
import { cn } from '@/utilities/ui'

export const ContactoBlock: React.FC<ContactoBlockProps & HTMLAttributes<HTMLElement>> = ({
  preTitle,
  title,
  subtitle,
  backgroundMedia,
  guide,
  whatsapp,
  email,
  address,
  className,
}) => {
  return (
    <section className={cn(className)}>
      {backgroundMedia && typeof backgroundMedia === 'object' && (
        <div className="absolute inset-0">
          <Media
            fill
            imgClassName="h-full w-full object-cover opacity-[0.06]"
            resource={backgroundMedia}
          />
          <div className="absolute inset-0 bg-linear-to-b from-panel/70 via-transparent to-panel/80" />
        </div>
      )}

      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-16">
        {preTitle && (
          <div className="reveal mb-8">
            <span className="wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
              {preTitle}
            </span>
          </div>
        )}

        {title && (
          <h2 className="reveal mb-10 wrap-break-word font-display text-4xl font-black leading-[0.92] text-cream sm:text-6xl md:text-8xl">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="reveal mx-auto mb-6 max-w-sm font-body text-base leading-relaxed text-cream md:text-lg">
            {subtitle}
          </p>
        )}
        {guide && (
          <p className="reveal mb-14 wrap-break-word font-mono text-xs uppercase tracking-[0.25em] text-cream">
            Guía: {guide}
          </p>
        )}

        <div className="stagger-parent flex min-w-0 flex-col items-center justify-center gap-4 sm:flex-row">
          {email && <EmailButton email={email} />}
        </div>

        {address && (
          <div className="reveal mt-16 border-t border-cream/[0.07] pt-8">
            <p className="wrap-break-word font-mono text-xs uppercase leading-loose tracking-[0.22em] text-cream">
              {address}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
