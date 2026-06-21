import { motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

// ── Floating background orbs ───────────────────────────────────
const ORBS = [
  { w: 340, h: 340, color: '#FF2D78', left: '8%',  top: '12%', delay: 0,   dur: 11 },
  { w: 220, h: 220, color: '#A855F7', left: '72%', top: '55%', delay: 2.5, dur: 8  },
  { w: 160, h: 160, color: '#22D3EE', left: '52%', top: '8%',  delay: 4.5, dur: 13 },
  { w: 100, h: 100, color: '#C0FF33', left: '30%', top: '75%', delay: 1.5, dur: 9  },
]

// ── Main component ─────────────────────────────────────────────
export default function HeroVideo() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0010] via-[#0B0B0C] to-[#00101a]" />

      {/* Mobile video (portrait) — public/video/hero-mobile.mp4 */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40 md:hidden"
        autoPlay loop muted playsInline
      >
        <source src={`${import.meta.env.BASE_URL}video/hero-mobile.mp4`} type="video/mp4" />
      </video>

      {/* Desktop video (landscape) — public/video/hero.mp4 */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40 hidden md:block"
        autoPlay loop muted playsInline
      >
        <source src={`${import.meta.env.BASE_URL}video/hero.mp4`} type="video/mp4" />
      </video>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 hero-grid opacity-60" />

      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w,
            height: orb.h,
            background: `radial-gradient(circle, ${orb.color}22, transparent 70%)`,
            border: `1px solid ${orb.color}18`,
            left: orb.left,
            top: orb.top,
          }}
          animate={{ y: [-18, 18, -18], scale: [1, 1.06, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
        />
      ))}

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0B0B0C]" />

      {/* Center content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        {/* Tag */}
        <motion.p
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.65 }}
          className="font-body text-xs tracking-[0.55em] text-[#C0FF33] mb-8 uppercase"
        >
          ✦ Correspondent &amp; Influence Marketing ✦
        </motion.p>

        {/* "DARIA" — reveal from clip */}
        <div className="overflow-hidden leading-[0.9]">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.45, type: 'spring', stiffness: 75, damping: 16 }}
            className="font-display font-black uppercase text-white"
            style={{
              fontSize: 'clamp(64px, 13vw, 138px)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 80px rgba(255,45,120,0.45)',
            }}
          >
            Daria
          </motion.h1>
        </div>

        {/* "IGNATOVA" — slightly delayed */}
        <div className="overflow-hidden leading-[0.9] mb-8">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 75, damping: 16 }}
            className="font-display font-black uppercase text-[#FF2D78]"
            style={{
              fontSize: 'clamp(64px, 13vw, 138px)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 60px rgba(255,45,120,0.7), 0 0 120px rgba(255,45,120,0.3)',
            }}
          >
            Ignatova
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-body font-light tracking-[0.35em] text-white/45 uppercase"
          style={{ fontSize: 'clamp(11px, 1.5vw, 15px)' }}
        >
          Influence Marketing · Didenok Team
        </motion.p>
      </div>

      {/* Scroll hint — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="font-body text-[9px] tracking-[0.4em] text-white/25 uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="text-white/25"
        >
          <FiChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
