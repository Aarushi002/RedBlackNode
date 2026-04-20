import { useRef } from 'react'
import { SectionHeader } from '../components/ui/SectionHeader'
import { WHY_POINTS } from '../data/why'
import { useSectionReveal } from '../hooks/useSectionReveal'

export function WhySection() {
  const ref = useRef(null)
  useSectionReveal(ref, { stagger: 0.06 })

  return (
    <section
      id="why"
      ref={ref}
      className="scroll-mt-14 border-b border-rbn-border/60 bg-rbn-void py-16 sm:py-24 lg:scroll-mt-[5rem] lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          kicker="Why RedBlackNode"
          title="Built for teams that value judgment, not jargon."
          description="The work is technically excellent — but never clever for its own sake. Every decision ties back to clarity, longevity, and measurable progress."
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_POINTS.map((item, index) => (
            <li
              key={item.title}
              className="js-reveal group relative overflow-hidden rounded-2xl border border-rbn-border bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-rbn-accent/30 sm:p-7"
            >
              <span
                className="font-display text-4xl font-semibold tabular-nums text-white/[0.07] transition-colors group-hover:text-rbn-accent/25"
                aria-hidden
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-rbn-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-rbn-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
