import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'

interface Props {
  children: React.ReactNode
  intensity?: number
}

const SPRING = { stiffness: 340, damping: 28, mass: 0.45 }

export default function TiltCard({ children, intensity = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]), SPRING)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]), SPRING)

  // Moving glare overlay
  const glareX = useTransform(rawX, [-0.5, 0.5], [15, 85])
  const glareY = useTransform(rawY, [-0.5, 0.5], [15, 85])
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14) 0%, transparent 55%)`

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, zIndex: 1, position: 'relative' }}
      whileHover={{ scale: 1.03, zIndex: 20 }}
      whileTap={{ scale: 0.96 }}
      className="cursor-default"
    >
      {/* Glare */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{ background: glareBg }}
      />
      {children}
    </motion.div>
  )
}
