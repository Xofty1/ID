import { useState } from 'react'
import ReactConfetti from 'react-confetti'
import { motion } from 'framer-motion'
import { useWindowSize } from '../../hooks/useWindowSize'

const BD_PHOTO = `${import.meta.env.BASE_URL}photos/bd.jpg`

const NEON_LINES = ['#FF2D78', '#C0FF33', '#A855F7', '#22D3EE']


function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ delay, type: 'spring', stiffness: 70, damping: 16 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function BirthdayMessage() {
  const [confetti, setConfetti] = useState(false)
  const [fired, setFired] = useState(false)
  const { width, height } = useWindowSize()

  const fire = () => {
    setConfetti(true)
    setFired(true)
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col md:flex-row overflow-hidden">
      {confetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={520}
          colors={['#FF2D78', '#C0FF33', '#A855F7', '#22D3EE', '#ffffff']}
          onConfettiComplete={() => setConfetti(false)}
        />
      )}

      {/* ── LEFT: PHOTO ─────────────────────────── */}
      <div className="relative md:w-[48%] h-[52vh] md:h-screen flex-shrink-0 overflow-hidden">
        {/* Photo with Ken Burns */}
        <motion.img
          src={BD_PHOTO}
          alt="Daria Birthday"
          className="w-full h-full object-cover object-top"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.33, 1, 0.68, 1] }}
        />

        {/* Right-edge gradient → dark bg */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0B0C]" />
        {/* Bottom gradient → dark bg (mobile) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent md:hidden" />
        {/* Subtle dark top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Neon corner lines — decorative */}
        {NEON_LINES.map((color, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 2,
              height: 60 + i * 20,
              background: color,
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}60`,
              top: 24 + i * 18,
              left: 20 + i * 6,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
          />
        ))}

        {/* Ghost "BIRTHDAY" watermark */}
        <div
          className="absolute bottom-4 left-4 md:bottom-8 md:left-8 font-display font-black uppercase text-white pointer-events-none select-none leading-none"
          style={{ fontSize: 'clamp(36px, 8vw, 90px)', opacity: 0.055 }}
        >
          BIRTHDAY
        </div>

        {/* Floating neon tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute top-6 right-8 hidden md:flex flex-col items-end gap-1"
        >
          <span className="font-body text-[9px] tracking-[0.5em] text-[#C0FF33] uppercase">
            special day
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-[#C0FF33] to-transparent" />
        </motion.div>
      </div>

      {/* ── RIGHT: CONTENT ──────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-8 md:py-0 relative">
        {/* Background glow orbs */}
        <div
          className="absolute top-1/4 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.12), transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)' }}
        />

        {/* Tag */}
        <FadeUp delay={0.15} className="mb-5">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-[#FF2D78] to-transparent max-w-[48px]" />
            <span className="font-body text-[10px] tracking-[0.5em] text-[#FF2D78] uppercase">
              с днём рождения
            </span>
          </div>
        </FadeUp>

        {/* Main title */}
        <Reveal delay={0.2}>
          <h1
            className="font-display font-black uppercase text-white leading-[0.88]"
            style={{
              fontSize: 'clamp(36px, 8vw, 110px)',
              textShadow: '0 0 60px rgba(255,45,120,0.35)',
            }}
          >
            Даша,
          </h1>
        </Reveal>
        <Reveal delay={0.32} className="mb-8 md:mb-10">
          <h1
            className="font-display font-black uppercase leading-[0.88]"
            style={{
              fontSize: 'clamp(28px, 7vw, 110px)',
              color: '#FF2D78',
              textShadow: '0 0 50px rgba(255,45,120,0.6), 0 0 100px rgba(255,45,120,0.3)',
            }}
          >
            с праздником!
          </h1>
        </Reveal>

        {/* Message cards */}
        <div className="space-y-3 mb-8 md:mb-10 max-w-md">
          {[
            { text: 'Ты — человек, который создаёт магию из слов и картинок. Каждый проект с тобой — это история, которую хочется пересказывать.', delay: 0.5 },
            { text: 'Желаем новых высот в Didenok Team, сотни крутых кампаний и бесконечного вдохновения — в работе и в жизни.', delay: 0.62 },
          ].map(({ text, delay }, i) => (
            <FadeUp key={i} delay={delay}>
              <p
                className="font-body leading-relaxed text-white/65"
                style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
              >
                {text}
              </p>
            </FadeUp>
          ))}
        </div>

        {/* Confetti button */}
        <FadeUp delay={0.78}>
          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              onClick={fire}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              animate={fired ? {
                boxShadow: ['0 0 24px #FF2D78, 0 0 48px rgba(255,45,120,0.4)', '0 0 40px #C0FF33, 0 0 80px rgba(192,255,51,0.4)', '0 0 24px #FF2D78, 0 0 48px rgba(255,45,120,0.4)'],
              } : {}}
              transition={fired ? { duration: 1.5, repeat: 2 } : {}}
              className="px-8 py-4 rounded-full bg-[#FF2D78] text-white font-display text-xs font-black tracking-widest uppercase"
              style={{ boxShadow: '0 0 24px rgba(255,45,120,0.5)' }}
            >
              🎊 Зажечь хлопушку!
            </motion.button>

            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-body text-xs text-white/25 hover:text-white/50 tracking-widest uppercase transition-colors"
            >
              ← На главную
            </motion.a>
          </div>
        </FadeUp>

        {/* Bottom neon accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
          className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 h-px origin-left"
          style={{ background: 'linear-gradient(to right, #FF2D78, #A855F7, #22D3EE, transparent)' }}
        />
      </div>
    </div>
  )
}
