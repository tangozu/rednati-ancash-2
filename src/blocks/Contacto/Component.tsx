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
          <div className="absolute inset-0 bg-gradient-to-b from-panel/70 via-transparent to-panel/80" />
        </div>
      )}

      <div className="relative mx-auto max-w-screen-md px-6 text-center md:px-16">
        {preTitle && (
          <div className="reveal mb-8">
            <span className="font-mono text-lg uppercase tracking-[0.4em] text-earth">
              {preTitle}
            </span>
          </div>
        )}

        {title && (
          <h2 className="reveal mb-10 font-display text-6xl font-black leading-[0.92] text-cream md:text-8xl">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="reveal mx-auto mb-6 max-w-sm font-body text-base leading-relaxed text-cream/50 md:text-lg">
            {subtitle}
          </p>
        )}
        {guide && (
          <p className="reveal mb-14 font-mono text-xs uppercase tracking-[0.25em] text-cream/35">
            Guía: {guide}
          </p>
        )}

        <div className="stagger-parent flex flex-col items-center justify-center gap-4 sm:flex-row">
          {email && <EmailButton email={email} />}
        </div>

        {address && (
          <div className="reveal mt-16 border-t border-cream/[0.07] pt-8">
            <p className="font-mono text-xs uppercase leading-loose tracking-[0.22em] text-cream/25">
              {address}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
