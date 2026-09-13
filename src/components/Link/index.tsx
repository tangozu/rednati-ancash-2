'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { useScrollToId } from '@/providers/SmoothScroll'
import Link from 'next/link'
import React from 'react'

import type { Page } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  onClick?: () => void
  reference?: {
    relationTo: 'pages'
    value: Page | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    onClick: onClickProp,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `/${reference.value.slug}`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const scrollToId = useScrollToId()
  const isAnchor = href.startsWith('#')
  const onClick = (e: React.MouseEvent) => {
    if (isAnchor) {
      e.preventDefault()
      scrollToId(href.slice(1))
    }
    onClickProp?.()
  }

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} onClick={onClick} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} onClick={onClick} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
