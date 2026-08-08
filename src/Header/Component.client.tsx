'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Media } from '@/components/Media'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false)

  const { headerTheme, setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 bg-bg/60 backdrop-blur-xl border-b border-white/5'
      }
    >
      <div
        className="
          mx-auto
          container
          flex
          items-center
          justify-between
          gap-3
          h-16
          px-4
        "
      >
        <Link href="/" className="shrink-0">
          {data?.shortLogo && (
            <Media
              resource={data.shortLogo}
              imgClassName="w-10 sm:hidden"
              priority
              loading="eager"
            />
          )}
          {data?.logo && (
            <Media
              resource={data.logo}
              imgClassName={
                data?.shortLogo ? 'hidden sm:block sm:w-56' : 'w-32 sm:w-56'
              }
              priority
              loading="eager"
            />
          )}
        </Link>

        <HeaderNav data={data} />
      </div>
    </header>
  )
}
