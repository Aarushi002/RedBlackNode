import { SKILLS } from '../../data/skills'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function Separator() {
  return (
    <span className="select-none text-rbn-border-strong" aria-hidden>
      ·
    </span>
  )
}

function TickerTrack({ items, reverse = false, durationSec = 52 }) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 py-2 text-center text-sm font-medium text-rbn-subtle">
        {items.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    )
  }

  return (
    <div
      className={['flex w-max will-change-transform items-center', reverse ? 'rbn-ticker-rev' : 'rbn-ticker-fwd'].join(' ')}
      style={{ animationDuration: `${durationSec}s` }}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="flex items-center gap-6 sm:gap-8"
          aria-hidden={copy === 1}
        >
          {items.map((skill) => (
            <span key={`${copy}-${skill}`} className="flex items-center gap-6 sm:gap-8">
              <span className="whitespace-nowrap text-sm font-medium tracking-wide text-rbn-fog/90">
                {skill}
              </span>
              <Separator />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

function TickerRow({ items, reverse = false, durationSec = 55 }) {
  const list = items?.length ? items : SKILLS

  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-rbn-base sm:w-28"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-rbn-base sm:w-28"
        aria-hidden
      />
      <TickerTrack items={list} reverse={reverse} durationSec={durationSec} />
    </div>
  )
}

export function TechTicker() {
  const forward = SKILLS
  const backward = [...SKILLS].reverse()

  return (
    <div className="space-y-1">
      <TickerRow items={forward} reverse={false} durationSec={50} />
      <TickerRow items={backward} reverse durationSec={58} />
    </div>
  )
}
