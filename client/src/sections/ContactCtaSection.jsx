import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSectionReveal } from '../hooks/useSectionReveal'

export function ContactCtaSection() {
  const ref = useRef(null)
  useSectionReveal(ref, { stagger: 0.05 })

  return (
    <section
      ref={ref}
      className="border-b border-rbn-border/60 bg-rbn-base py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="js-reveal flex flex-col items-start gap-5 rounded-2xl border border-rbn-border bg-gradient-to-r from-rbn-accent-soft/35 via-transparent to-transparent px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-8">
          <div className="max-w-xl">
            <h2 className="font-display text-xl font-semibold tracking-tight text-rbn-white sm:text-2xl">
              Ready to hire RedBlackNode for your next web project?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-rbn-muted">
              Freelance web development, ecommerce, and automation — share your goals, timeline, and stack and we’ll reply with a clear plan.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-xl bg-rbn-accent px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_36px_rgba(225,29,72,0.25)] transition-colors hover:bg-[#f43f5e] sm:w-auto"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
