import { useRef } from 'react'
import { TechTicker } from '../components/ticker/TechTicker'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useSectionReveal } from '../hooks/useSectionReveal'

export function SkillsTickerSection() {
  const ref = useRef(null)
  useSectionReveal(ref)

  return (
    <section
      id="skills"
      ref={ref}
      className="scroll-mt-12 border-b border-rbn-border/60 bg-rbn-base py-12 sm:py-16 lg:scroll-mt-[5rem] lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          kicker="Stack"
          title="Tools we ship with."
          description="A living toolkit — tuned per project — spanning modern frontends, backends, commerce, CMS, and automation platforms."
        />
      </div>

      <div className="js-reveal mt-10">
        <TechTicker />
      </div>
    </section>
  )
}
