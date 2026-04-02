import confetti from 'canvas-confetti'

export function burstProjectConfetti() {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const count = 90
  const defaults = {
    origin: { y: 0.08, x: 0.5 },
    colors: ['#e11d48', '#f43f5e', '#f6c453', '#ffffff', '#fda4af'],
    ticks: 220,
    gravity: 1.05,
    scalar: 0.9,
  }

  confetti({ ...defaults, particleCount: count, spread: 64, startVelocity: 38 })
  confetti({ ...defaults, particleCount: Math.floor(count * 0.45), spread: 100, startVelocity: 32, decay: 0.91 })
}
