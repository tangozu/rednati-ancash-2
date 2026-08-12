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
          relative
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
        <div className="shrink-0">
          {data?.leftLogo && data?.leftShortLogo && (
            <Media
              objectFit="contain"
              resource={data.leftLogo}
              imgClassName={'hidden sm:block sm:w-21 sm:h-13'}
              priority
              loading="eager"
            />
          )}
          {data?.leftLogo && !data?.leftShortLogo && (
            <Media
              objectFit="contain"
              resource={data.leftLogo}
              imgClassName={'w-21 h-13'}
              priority
              loading="eager"
            />
          )}
          {data?.leftShortLogo && (
            <Media
              objectFit="contain"
              resource={data.leftShortLogo}
              imgClassName="w-21 h-13 sm:hidden"
              priority
              loading="eager"
            />
          )}
        </div>
        <div className="shrink-0 ">
          {data?.middleLogo && data?.middleShortLogo && (
            <Media
              resource={data.middleLogo}
              imgClassName={'hidden sm:block sm:w-41 sm:h-13'}
              priority
              loading="eager"
            />
          )}
          {data?.middleLogo && !data?.middleShortLogo && (
            <Media
              resource={data.middleLogo}
              imgClassName={'w-32 h-13 sm:w-41'}
              priority
              loading="eager"
            />
          )}
          {data?.middleShortLogo && (
            <Media
              resource={data.middleShortLogo}
              imgClassName="w-13 h-13 sm:hidden"
              priority
              loading="eager"
            />
          )}
        </div>

        <HeaderNav data={data} />
      </div>
    </header>
  )
}
