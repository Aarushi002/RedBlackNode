import { useCallback, useEffect, useRef, useState } from 'react'

const SNIPPETS = [
  'const res = await fetch(url)',
  'export default function App()',
  'useEffect(() => {}, [])',
  'mongoose.connect(process.env.MONGO_URI)',
  'pnpm install',
  '<Component />',
  'return null',
  'async () => {',
  'grid-template-columns: 1fr 1fr',
  'Promise.all([a, b])',
  '#e11d48',
  'className="flex gap-4"',
  'npm run build',
  'git commit -m "feat"',
  'SELECT * FROM users',
  'res.status(200).json({})',
  'tailwind.config.ts',
  ':hover { opacity: 0.9 }',
  'void main() {',
  'docker compose up -d',
  'redis.get(cacheKey)',
  'JWT.verify(token, secret)',
  'zod.parse(body)',
  'type Props = { id: string }',
  'interface User { name: string }',
  'router.push("/dashboard")',
  'gsap.to(el, { opacity: 1 })',
  'THREE.Scene()',
  'schema.parse(req.body)',
]

function pickSnippet() {
  return SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]
}

/**
 * On hover, spawns short code fragments that float out from the 3D hero area.
 */
export function HeroCodeEruption({ disabled = false }) {
  const [hover, setHover] = useState(false)
  const [particles, setParticles] = useState([])
  const intervalRef = useRef(null)
  const idRef = useRef(0)

  const spawn = useCallback(() => {
    const id = ++idRef.current
    const leftPct = 36 + Math.random() * 28
    const topPct = 40 + Math.random() * 20
    const dx = (Math.random() - 0.5) * 180
    const dy = -70 - Math.random() * 130
    const duration = 1.35 + Math.random() * 1.15
    const rotate = (Math.random() - 0.5) * 28
    const text = pickSnippet()

    setParticles((p) => {
      const next = [...p, { id, leftPct, topPct, dx, dy, duration, rotate, text }]
      return next.length > 56 ? next.slice(-56) : next
    })

    window.setTimeout(() => {
      setParticles((p) => p.filter((x) => x.id !== id))
    }, duration * 1000 + 80)
  }, [])

  useEffect(() => {
    if (disabled || !hover) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    spawn()
    intervalRef.current = window.setInterval(spawn, 240)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [disabled, hover, spawn])

  if (disabled) return null

  return (
    <>
      <div
        className="absolute inset-0 z-[5] cursor-default rounded-[2rem]"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[6] overflow-visible rounded-[2rem]"
        aria-hidden
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero-code-particle absolute max-w-[min(90vw,280px)] truncate font-mono text-[10px] font-medium text-emerald-400/95 shadow-[0_0_12px_rgba(16,185,129,0.25)] sm:text-[11px] md:max-w-[320px] md:text-xs"
            style={{
              left: `${p.leftPct}%`,
              top: `${p.topPct}%`,
              animationDuration: `${p.duration}s`,
              '--hero-dx': `${p.dx}px`,
              '--hero-dy': `${p.dy}px`,
              '--hero-rot': `${p.rotate}deg`,
            }}
          >
            {p.text}
          </span>
        ))}
      </div>
    </>
  )
}
