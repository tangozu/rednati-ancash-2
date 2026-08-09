'use client'

import React from 'react'
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 55 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: EASE } },
}

const clipRevealMaskVariants: Variants = {
  hidden: { height: '0%' },
  visible: { height: '100%', transition: { duration: 1.7, ease: EASE } },
}

export const staggerParentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 45 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
}

const viewport = { once: true, amount: 0.15 } as const

const MotionBlockquote = motion.create('blockquote')

type RevealProps =
  | (HTMLMotionProps<'div'> & { as?: 'div' })
  | (HTMLMotionProps<'blockquote'> & { as: 'blockquote' })

/** Fade + rise on scroll into view. Equivalent to the `.reveal` class in the legacy GSAP mockup. */
export const Reveal: React.FC<RevealProps> = ({ children, as = 'div', ...props }) => {
  if (as === 'blockquote') {
    return (
      <MotionBlockquote
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={revealVariants}
        {...(props as HTMLMotionProps<'blockquote'>)}
      >
        {children}
      </MotionBlockquote>
    )
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={revealVariants}
      {...(props as HTMLMotionProps<'div'>)}
    >
      {children}
    </motion.div>
  )
}

/** Curtain reveal on scroll into view (bottom-up height mask). Equivalent to `.clip-reveal`. */
export const ClipReveal: React.FC<HTMLMotionProps<'div'>> = ({ children, className, ...props }) => (
  <div className={`relative overflow-hidden ${className ?? ''}`}>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={clipRevealMaskVariants}
      style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden' }}
      {...props}
    >
      <div className="absolute inset-x-0 bottom-0 h-full w-full">{children as React.ReactNode}</div>
    </motion.div>
  </div>
)

/** Parent for staggered children reveal. Equivalent to `.stagger-parent`. */
export const StaggerGroup: React.FC<HTMLMotionProps<'div'>> = ({ children, ...props }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={viewport}
    variants={staggerParentVariants}
    {...props}
  >
    {children}
  </motion.div>
)

export const StaggerItem: React.FC<HTMLMotionProps<'div'>> = ({ children, ...props }) => (
  <motion.div variants={staggerChildVariants} {...props}>
    {children}
  </motion.div>
)
