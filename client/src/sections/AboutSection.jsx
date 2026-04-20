import { useRef } from 'react'
import {
  ABOUT_INTRO,
  ABOUT_KICKER,
  ABOUT_PILLARS,
  ABOUT_SUBTITLE,
  ABOUT_TITLE,
} from '../data/about'
import { useSectionReveal } from '../hooks/useSectionReveal'

export function AboutSection() {
  const ref = useRef(null)
  useSectionReveal(ref)

  return (
    <section
      id="about"
      ref={ref}
      className="relative scroll-mt-12 overflow-hidden border-b border-rbn-border/60 bg-rbn-base py-12 sm:py-16 lg:scroll-mt-[5rem] lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-start lg:gap-16 xl:gap-20">
          <div className="space-y-6">
            <p className="js-reveal text-xs font-semibold uppercase tracking-[0.28em] text-rbn-accent">
              {ABOUT_KICKER}
            </p>
            <h2 className="js-reveal font-display text-3xl font-semibold tracking-tight text-rbn-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
              {ABOUT_TITLE}
            </h2>
            <p className="js-reveal text-base leading-relaxed text-rbn-muted sm:text-[1.05rem]">
              {ABOUT_SUBTITLE}
            </p>

            {ABOUT_INTRO.map((paragraph, i) => {
              const isFirstIntro = i === 0
              const isClosing = i === ABOUT_INTRO.length - 1
              return (
                <p
                  key={i}
                  className={
                    isFirstIntro
                      ? 'js-reveal text-lg leading-relaxed text-rbn-fog/95 sm:text-[1.08rem]'
                      : isClosing
                        ? 'js-reveal text-base font-medium leading-relaxed text-rbn-fog/95'
                        : 'js-reveal text-base leading-relaxed text-rbn-muted'
                  }
                >
                  {paragraph}
                </p>
              )
            })}
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7">
            {ABOUT_PILLARS.map((p) => (
              <li
                key={p.title}
                className="js-reveal rounded-2xl border border-rbn-border bg-rbn-surface/60 p-5 backdrop-blur-sm transition-colors hover:border-rbn-border-strong sm:p-6"
              >
                <p className="font-display text-base font-semibold leading-snug tracking-tight text-rbn-white">
                  {p.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-rbn-muted sm:text-[0.95rem]">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
