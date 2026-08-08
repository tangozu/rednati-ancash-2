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
          h-16
        "
      >
        <Link href="/">
          {data?.logo && (
            <Media resource={data.logo} imgClassName="w-56" priority loading="eager" />
          )}
        </Link>

        <HeaderNav data={data} />
      </div>
    </header>
  )
}
