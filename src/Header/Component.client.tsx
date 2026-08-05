'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
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
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-700

        ${
          scrolled
          ? 'bg-bg/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
        }
      `}
    >

      <div
        className="
          max-w-screen-xl
          mx-auto
          px-6
          md:px-12
          xl:px-16

          flex
          items-center
          justify-between

          h-16
          md:h-20
        "
      >

        <Link href="/">
          {data?.logo ? (
            <Media
              resource={data.logo}
              imgClassName="h-10 w-auto object-contain"
              priority
              loading="eager"
            />
          ) : (
            <Logo
              loading="eager"
              priority="high"
              className="h-10 w-auto invert"
            />
          )}
        </Link>


        <div
          className="
            hidden
            md:block
            font-mono
            text-[10px]
            text-cream/35
            tracking-[0.4em]
            uppercase
          "
        >
          LlamaTrek · Olleros → Chavín
        </div>


        <HeaderNav data={data}/>


      </div>

    </header>
  )
}