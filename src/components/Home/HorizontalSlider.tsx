import { useState, useRef, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { achievementGroups } from '../../data/achievements'
import TiltCard from '../UI/TiltCard'

const N = achievementGroups.length

// ── Slide enter/exit variants ──────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

// ── Bento card stagger ─────────────────────────────────────────
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } },
}

const cardVariants = {
  hidden: { y: 32, opacity: 0, scale: 0.96 },
  show: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: 'spring' as const, stiffness: 230, damping: 22 },
  },
}

// ── Bento grid helpers ─────────────────────────────────────────
const colSpan = (total: number, i: number) =>
  total === 3 && i === 0 ? 'col-span-2' : 'col-span-1'

const minH = (total: number, i: number): number => {
  if (total === 3) return i === 0 ? 126 : 150
  // 4 blocks: alternate taller/shorter for visual interest
  return [152, 128, 128, 152][i] ?? 128
}

// ── Main component ─────────────────────────────────────────────
export default function HorizontalSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      const next = ((idx % N) + N) % N
      if (next === current) return
      setDirection(idx > current ? 1 : -1)
      setCurrent(next)
    },
    [current],
  )

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(current + 1)
      if (e.key === 'ArrowLeft') goTo(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo])

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 55) {
      dx < 0 ? goTo(current + 1) : goTo(current - 1)
    }
    touchStartX.current = null
  }

  const group = achievementGroups[current]

  return (
    <section
      className="relative h-screen overflow-hidden bg-[#0B0B0C]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Achievement slides"
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 290, damping: 36 }}
          className="absolute inset-0 flex flex-col md:flex-row"
        >
          {/* ── PHOTO ───────────────────────────── */}
          <div className="relative md:w-[45%] h-[42vh] md:h-full overflow-hidden flex-shrink-0">
            {/* Ken Burns zoom-in on slide enter */}
            <motion.img
              src={group.photo}
              alt={group.label}
              className="w-full h-full object-cover object-top"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1] }}
              loading="lazy"
            />

            {/* Gradient: fade right edge into dark bg (desktop) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-[#0B0B0C]" />
            {/* Gradient: fade bottom on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent md:hidden" />

            {/* Giant watermark number */}
            <div
              className="absolute top-4 left-4 md:top-8 md:left-8 font-display font-black text-white pointer-events-none select-none"
              style={{ fontSize: 'clamp(64px, 14vw, 148px)', opacity: 0.055, lineHeight: 1 }}
            >
              {String(current + 1).padStart(2, '0')}
            </div>

            {/* Group label — desktop, bottom-left of photo */}
            <motion.div
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.5, ease: 'easeOut' }}
              className="absolute bottom-8 left-8 hidden md:block"
            >
              <p className="font-body text-[10px] tracking-[0.55em] text-[#C0FF33] uppercase mb-1">
                {String(current + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(N).padStart(2, '0')}
              </p>
              <h2
                className="font-display font-black uppercase text-white"
                style={{
                  fontSize: 'clamp(26px, 3.2vw, 50px)',
                  textShadow: '0 0 40px rgba(255,45,120,0.4)',
                }}
              >
                {group.label}
              </h2>
            </motion.div>
          </div>

          {/* ── CONTENT ─────────────────────────── */}
          <div className="flex-1 flex flex-col justify-center pl-5 pr-5 md:pl-10 md:pr-10 py-4 md:py-8 pb-36 md:pb-8 overflow-y-auto md:overflow-visible">
            {/* Mobile header */}
            <div className="md:hidden mb-4">
              <p className="font-body text-[10px] tracking-[0.45em] text-[#C0FF33] uppercase">
                {String(current + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(N).padStart(2, '0')}
              </p>
              <h2 className="font-display text-2xl font-black uppercase text-white tracking-wide">
                {group.label}
              </h2>
            </div>

            {/* Bento grid */}
            <motion.div
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-4 md:gap-6 isolate"
            >
              {group.blocks.map((block, i) => (
                <motion.div
                  key={block.id}
                  variants={cardVariants}
                  className={colSpan(group.blocks.length, i)}
                >
                  <TiltCard>
                    <div
                      className={`
                        ${block.colorClass} ${block.glowClass} ${block.textColor}
                        rounded-2xl p-4 md:p-5 flex flex-col justify-between
                        relative overflow-hidden
                      `}
                      style={{ minHeight: minH(group.blocks.length, i) }}
                    >
                      {/* Ghost index number */}
                      <span
                        className="absolute bottom-0 right-3 font-display font-black pointer-events-none select-none"
                        style={{ fontSize: 80, opacity: 0.09, lineHeight: 0.95 }}
                      >
                        {i + 1}
                      </span>

                      <div className="relative z-10">
                        <h3 className="font-display text-base md:text-lg font-black leading-tight mb-2">
                          {block.title}
                        </h3>
                        <p
                          className="font-body text-xs md:text-sm leading-relaxed"
                          style={{ opacity: 0.85 }}
                        >
                          {block.body}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── ARROW BUTTONS (desktop) ──────────── */}
      {([
        { dir: -1, Icon: FiArrowLeft,  cls: 'left-4'  },
        { dir:  1, Icon: FiArrowRight, cls: 'right-4' },
      ] as const).map(({ dir, Icon, cls }) => (
        <button
          key={dir}
          onClick={() => goTo(current + dir)}
          aria-label={dir < 0 ? 'Назад' : 'Вперёд'}
          className={`
            absolute ${cls} top-1/2 -translate-y-1/2 z-20
            w-11 h-11 rounded-full border border-white/15
            hidden md:flex items-center justify-center
            text-white/45 hover:text-[#FF2D78] hover:border-[#FF2D78] hover:scale-110
            transition-all duration-200
          `}
        >
          <Icon size={18} />
        </button>
      ))}

      {/* ── PROGRESS PILLS ───────────────────── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Slide navigation"
      >
        {achievementGroups.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Слайд ${i + 1}`}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width:           i === current ? 28 : 7,
              height:          7,
              backgroundColor: i === current ? '#FF2D78' : 'rgba(255,255,255,0.22)',
              boxShadow:       i === current ? '0 0 10px #FF2D78, 0 0 22px rgba(255,45,120,0.4)' : 'none',
            }}
          />
        ))}
      </div>

      {/* ── BIRTHDAY CTA — appears on last slide ─ */}
      <AnimatePresence>
        {current === N - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ type: 'spring', stiffness: 210, damping: 22 }}
            className="absolute bottom-16 md:bottom-[52px] left-0 right-0 z-20 flex flex-col items-center gap-2 px-4"
          >
            <p className="font-body text-[9px] tracking-[0.4em] text-white/35 uppercase animate-pulse">
              нажми
            </p>
            <motion.a
              href="#/birthday"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF2D78] text-white font-display text-xs font-black tracking-widest uppercase glow-pink"
            >
              🎂 С Днём Рождения!
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
