'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { MessageCircleMore } from 'lucide-react'
import { WhatsappButton } from '@/components/Buttons/whatsappButton'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const whatsappContact = data?.whatsappContact

  return (
    <nav className="flex gap-3 items-center min-w-0">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      {whatsappContact?.phone && <WhatsappButton phone={whatsappContact.phone} />}
    </nav>
  )
}
