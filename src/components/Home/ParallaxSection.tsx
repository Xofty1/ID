import { useRef } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { achievementGroups } from '../../data/achievements'
import { useWindowSize } from '../../hooks/useWindowSize'

const N = achievementGroups.length
// Container = N * 200vh so each group gets ~175vh of actual scroll travel
const CONTAINER_H = `${N * 200}vh`

const clamp = (v: number) => Math.max(0, Math.min(1, v))

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)
  const { width } = useWindowSize()
  const isMobile = width < 768

  // Group progress: 0→1 as we scroll through group i's section
  const gp = (i: number) => clamp((progress - i / N) * N)

  // Photo opacity: entry driven by this group, exit driven by next group's entry
  const photoOp = (i: number) => {
    const entry = clamp((gp(i) - 0.05) / 0.12)
    const nextEntry = i < N - 1 ? clamp((gp(i + 1) - 0.05) / 0.12) : 0
    return Math.max(0, entry - nextEntry)
  }

  // Block style: bi = block's index within group.blocks (for stagger timing)
  // Photo enters at gp ~0.05–0.17, first block at gp ~0.20, last block at gp ~0.59
  // All blocks exit together at gp ~0.82–0.94
  const blockStyle = (gi: number, bi: number, side: 'left' | 'right') => {
    const g = gp(gi)
    const threshold = 0.20 + bi * 0.13
    const entry = clamp((g - threshold) / 0.11)
    const exit = clamp((g - 0.82) / 0.11)
    const opacity = entry * (1 - exit)

    if (isMobile) {
      // Blocks slide up from bottom, exit back down
      const ty = ((1 - entry) + exit) * 55
      return { opacity, transform: `translateY(${ty}px)`, transition: 'none' as const }
    }
    const dir = side === 'left' ? -1 : 1
    const tx = ((1 - entry) + exit) * 90 * dir
    return { opacity, transform: `translateX(${tx}px)`, transition: 'none' as const }
  }

  const labelOp = (i: number) => ({ opacity: photoOp(i), transition: 'none' as const })

  const birthdayCTAOp = Math.max(0, (progress - 0.88) * 8)

  return (
    <div ref={containerRef} style={{ height: CONTAINER_H }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Section tag */}
        <div className="absolute top-5 inset-x-0 z-30 flex flex-col items-center gap-1 pointer-events-none">
          <p className="font-body text-[10px] tracking-[0.5em] text-[#C0FF33] uppercase">Достижения</p>
          <div className="relative h-6 w-48 overflow-hidden">
            {achievementGroups.map((group, i) => (
              <p
                key={group.id}
                className="absolute inset-0 text-center font-display text-sm font-black text-white/70 uppercase tracking-widest"
                style={labelOp(i)}
              >
                {group.label}
              </p>
            ))}
          </div>
        </div>

        {/* ── DESKTOP (md+) ─────────────────────────────── */}
        <div className="hidden md:flex w-full h-full items-center justify-center">

          {/* Left column */}
          <div className="relative h-full" style={{ width: 'calc(50% - 116px)' }}>
            {achievementGroups.map((group) => (
              <div
                key={group.id}
                className="absolute inset-0 flex flex-col items-end justify-center gap-5 pr-8"
              >
                {group.blocks
                  .filter((b) => b.side === 'left')
                  .map((block) => {
                    const bi = group.blocks.indexOf(block)
                    return (
                      <div
                        key={block.id}
                        className={`${block.colorClass} ${block.glowClass} ${block.textColor} rounded-2xl p-5 flex flex-col justify-center`}
                        style={{ ...blockStyle(group.id, bi, 'left'), width: 300, minHeight: 140 }}
                      >
                        <h3 className="font-display text-xl font-black mb-2 leading-tight">
                          {block.title}
                        </h3>
                        <p className="font-body text-sm leading-relaxed opacity-85">
                          {block.body}
                        </p>
                      </div>
                    )
                  })}
              </div>
            ))}
          </div>

          {/* Center photo */}
          <div className="relative flex-shrink-0" style={{ width: 232, height: 232 }}>
            {achievementGroups.map((group, i) => (
              <div
                key={group.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: photoOp(i), transition: 'none' }}
              >
                <div className="w-[220px] h-[220px] rounded-full overflow-hidden border-[3px] border-[#FF2D78] photo-glow">
                  <img
                    src={group.photo}
                    alt="Daria Ignatova"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="relative h-full" style={{ width: 'calc(50% - 116px)' }}>
            {achievementGroups.map((group) => (
              <div
                key={group.id}
                className="absolute inset-0 flex flex-col items-start justify-center gap-5 pl-8"
              >
                {group.blocks
                  .filter((b) => b.side === 'right')
                  .map((block) => {
                    const bi = group.blocks.indexOf(block)
                    return (
                      <div
                        key={block.id}
                        className={`${block.colorClass} ${block.glowClass} ${block.textColor} rounded-2xl p-5 flex flex-col justify-center`}
                        style={{ ...blockStyle(group.id, bi, 'right'), width: 300, minHeight: 140 }}
                      >
                        <h3 className="font-display text-xl font-black mb-2 leading-tight">
                          {block.title}
                        </h3>
                        <p className="font-body text-sm leading-relaxed opacity-85">
                          {block.body}
                        </p>
                      </div>
                    )
                  })}
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE (<md) ──────────────────────────────── */}
        <div className="md:hidden flex flex-col items-center h-full pt-14">

          {/* Photo */}
          <div className="relative flex-shrink-0" style={{ width: 148, height: 148 }}>
            {achievementGroups.map((group, i) => (
              <div
                key={group.id}
                className="absolute inset-0"
                style={{ opacity: photoOp(i), transition: 'none' }}
              >
                <div className="w-[148px] h-[148px] rounded-full overflow-hidden border-[3px] border-[#FF2D78] photo-glow">
                  <img
                    src={group.photo}
                    alt="Daria Ignatova"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Blocks area — each group's stack is absolute, only active one shows */}
          <div className="relative flex-1 w-full px-4 mt-5 overflow-hidden">
            {achievementGroups.map((group) => (
              <div
                key={group.id}
                className="absolute inset-0 flex flex-col items-center justify-start gap-3 px-4 pt-1"
              >
                {group.blocks.map((block, bi) => (
                  <div
                    key={block.id}
                    className={`${block.colorClass} ${block.glowClass} ${block.textColor} rounded-2xl p-4 w-full flex flex-col justify-center`}
                    style={{ ...blockStyle(group.id, bi, block.side), minHeight: 80 }}
                  >
                    <h3 className="font-display text-base font-black mb-1 leading-tight">
                      {block.title}
                    </h3>
                    <p className="font-body text-xs leading-relaxed opacity-85">
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
          {achievementGroups.map((_, i) => {
            const op = photoOp(i)
            return (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full border border-white/40"
                style={{
                  backgroundColor: op > 0.5 ? '#FF2D78' : 'transparent',
                  boxShadow: op > 0.5 ? '0 0 6px #FF2D78' : 'none',
                  transform: op > 0.5 ? 'scale(1.6)' : 'scale(1)',
                  transition: 'transform 0.3s',
                }}
              />
            )
          })}
        </div>

        {/* Birthday CTA */}
        <a
          href="/birthday"
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 px-7 py-3 rounded-full border-2 border-[#FF2D78] text-[#FF2D78] font-display text-xs font-black tracking-widest uppercase hover:bg-[#FF2D78] hover:text-white transition-colors duration-300 glow-pink whitespace-nowrap"
          style={{ opacity: birthdayCTAOp, pointerEvents: birthdayCTAOp > 0.1 ? 'auto' : 'none' }}
        >
          🎂 С Днём Рождения!
        </a>
      </div>
    </div>
  )
}
