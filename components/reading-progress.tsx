'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#2563eb] to-[#7c3aed]"
      style={{ scaleY, width: '100%' }}
    />
  )
}
