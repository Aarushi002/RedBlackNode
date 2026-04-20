import { useCallback, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { HeroCodeEruption } from '../components/hero/HeroCodeEruption'
import { HeroCanvasBoundary } from '../components/hero/HeroCanvasBoundary'
import { SplitWords } from '../components/hero/SplitWords'
import { Tech3DRawHero } from '../components/hero/Tech3DRawHero'
import { burstProjectConfetti } from '../lib/projectConfetti'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useIsMobile } from '../hooks/useIsMobile'

const TITLE = 'Not built for average. Built for impact.'

const SUB =
  'We build digital systems that look good, run fast, and actually work — even under pressure. Clean design, solid engineering, no unnecessary nonsense.'

export function HeroSection() {
  const rootRef = useRef(null)
  const confettiArmed = useRef(true)
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const lowPower3d = mobile

  const onProjectHover = useCallback(() => {
    if (!confettiArmed.current) return
    confettiArmed.current = false
    burstProjectConfetti()
  }, [])

  const onProjectLeave = useCallback(() => {
    confettiArmed.current = true
  }, [])

  useLayoutEffect(() => {
    if (reduced) return undefined

    const el = rootRef.current
    if (!el) return undefined

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        el.querySelectorAll('.hero-title .word > span'),
        { opacity: 0, yPercent: 100, rotateX: -18 },
        {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          stagger: 0.045,
          duration: 1.05,
        },
        0.12
      )
        .fromTo(
          el.querySelectorAll('.hero-sub'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.95 },
          0.35
        )
        .fromTo(
          el.querySelectorAll('.hero-accent-line'),
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.1 },
          0.2
        )
        .fromTo(
          el.querySelectorAll('.hero-cta'),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.55
        )
        .fromTo(
          el.querySelectorAll('.hero-scroll'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.85
        )
    }, el)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-8 pt-14 sm:pb-14 sm:pt-24"
    >
      {reduced && (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(225,29,72,0.16),transparent_55%)]"
          aria-hidden
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-rbn-void via-rbn-void/90 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-8 px-4 pt-6 sm:gap-10 sm:px-6 sm:pt-14 md:grid-cols-2 md:gap-12 md:pt-20 lg:px-10 lg:pt-16">
        <div className="min-w-0 max-w-3xl [perspective:1200px]">
          <div className="hero-accent-line h-px w-24 max-w-[40%] bg-gradient-to-r from-rbn-accent via-rbn-accent/60 to-transparent" />

          <h1 className="hero-title mt-6 transform-gpu font-display text-[clamp(1.9rem,4.8vw,3.65rem)] font-semibold leading-[1.08] tracking-tight text-rbn-white [transform-style:preserve-3d] sm:mt-8">
            <SplitWords text={TITLE} />
          </h1>

          <p className="hero-sub mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-rbn-muted sm:mt-7 sm:text-[1.05rem]">
            {SUB}
          </p>

          <div className="mt-8 sm:mt-11">
            <Link
              to="/contact"
              className="hero-cta inline-flex min-h-[44px] items-center justify-center rounded-xl bg-rbn-accent px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_44px_rgba(225,29,72,0.28)] transition-transform hover:-translate-y-0.5 hover:bg-[#f43f5e] hover:shadow-[0_0_56px_rgba(225,29,72,0.38)]"
              onMouseEnter={onProjectHover}
              onMouseLeave={onProjectLeave}
              onClick={() => burstProjectConfetti()}
            >
              Start a Project
            </Link>
          </div>

          <Link
            to={{ pathname: '/', hash: 'about' }}
            className="hero-scroll group mt-10 inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-rbn-muted transition-colors hover:text-rbn-fog sm:mt-16 sm:text-xs"
          >
            <span className="h-8 w-px bg-gradient-to-b from-rbn-accent/90 to-transparent" aria-hidden />
            About us
          </Link>
        </div>

        {!reduced && (
          <div className="relative mx-auto w-full max-w-[min(100%,30rem)] -translate-y-5 md:mx-0 md:max-w-none md:justify-self-end md:-translate-y-11 lg:-translate-y-14">
            <div className="relative h-[min(46vh,440px)] w-full overflow-visible rounded-[2rem] bg-transparent shadow-[0_0_64px_rgba(180,30,40,0.1)] sm:h-[min(50vh,480px)] md:h-[min(62vh,560px)] md:min-h-[400px] lg:min-h-[460px]">
              <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                <HeroCanvasBoundary>
                  <div className="absolute inset-0">
                    <Tech3DRawHero lowPower={lowPower3d} />
                    <div
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_55%_50%,transparent_22%,#030304_82%)]"
                      aria-hidden
                    />
                  </div>
                </HeroCanvasBoundary>
              </div>
              <HeroCodeEruption disabled={reduced} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
