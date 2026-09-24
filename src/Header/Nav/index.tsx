'use client'

import React, { Fragment, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import type { Header as HeaderType, SocialLink } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { socialIcons } from '@/utilities/socialIcons'

const EASE = [0.16, 1, 0.3, 1] as const

type NavItem = NonNullable<HeaderType['navItems']>[number]
type NavItemGroup = { group: string | null; items: NavItem[] }

/**
 * Clusters consecutive nav items sharing the same `group` value under one heading.
 * Grouping is by array adjacency (not by scanning the whole list) so editors control
 * grouping simply by placing related items next to each other in the admin.
 */
function groupNavItems(navItems: NavItem[]): NavItemGroup[] {
  const groups: NavItemGroup[] = []

  for (const item of navItems) {
    const groupName = item.group || null
    const last = groups[groups.length - 1]

    if (last && last.group === groupName) {
      last.items.push(item)
    } else {
      groups.push({ group: groupName, items: [item] })
    }
  }

  return groups
}

export const HeaderNav: React.FC<{
  data: HeaderType
  socialLinks: NonNullable<SocialLink['links']>
}> = ({ data, socialLinks }) => {
  const navItems = data?.navItems || []
  const navGroups = groupNavItems(navItems)
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <button
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-earth text-bg transition-colors hover:bg-earth-dark"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute left-0 right-0 top-full z-50 mt-3 max-h-[70vh] overflow-y-auto overscroll-contain rounded-2xl border border-white/5 bg-bg/95 p-6 shadow-xl backdrop-blur-xl"
          >
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4 px-2 pb-4">
                {socialLinks.map(({ platform, href, id }) => {
                  const Icon = socialIcons[platform]
                  if (!Icon) return null

                  return (
                    <a
                      key={id || platform}
                      href={href}
                      aria-label={platform}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream transition-colors hover:text-cream/60"
                    >
                      <Icon size={18} />
                    </a>
                  )
                })}
              </div>
            )}

            {navGroups.length > 0 && socialLinks.length > 0 && (
              <div className="mb-4 border-t border-cream/10" />
            )}

            {navGroups.length > 0 && (
              <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {navGroups.map((navGroup, groupIndex) => (
                  <div key={groupIndex} className="flex flex-col gap-1">
                    {navGroup.group && (
                      <span className="mb-1 px-2 font-mono text-xs uppercase tracking-[0.2em] text-earth">
                        {navGroup.group}
                      </span>
                    )}
                    <nav className="flex flex-col gap-1">
                      {navGroup.items.map(({ link }, i) => (
                        <CMSLink
                          key={i}
                          {...link}
                          appearance="inline"
                          className="rounded-lg px-2 py-2 font-mono text-sm uppercase tracking-[0.12em] text-cream transition-colors hover:bg-cream/10"
                          onClick={() => setOpen(false)}
                        />
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  )
}
