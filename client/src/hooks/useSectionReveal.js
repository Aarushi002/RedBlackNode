import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fade/slide in children matching `selector` when section enters view (once).
 */
export function useSectionReveal(containerRef, options = {}) {
  const {
    selector = '.js-reveal',
    disabled = false,
    start = 'top 82%',
    y = 40,
    stagger = 0.07,
    duration = 0.82,
  } = options

  useLayoutEffect(() => {
    if (disabled || !containerRef?.current) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const el = containerRef.current
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(selector)
      if (!targets.length) return

      gsap.from(targets, {
        opacity: 0,
        y,
        stagger,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, disabled, selector, start, y, stagger, duration])
}
