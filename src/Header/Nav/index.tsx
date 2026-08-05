'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const whatsappContact = data?.whatsappContact

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
      {whatsappContact?.phone && (
        <a
          href={`https://wa.me/${whatsappContact.phone.replace(/[^\d]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#c4844a] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#0e0c09] transition-colors duration-300 hover:bg-[#c4844a]/85"
        >
          <span aria-hidden>📱</span>
          {whatsappContact.label} {whatsappContact.phone}
        </a>
      )}
    </nav>
  )
}
