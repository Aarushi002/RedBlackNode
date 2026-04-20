import { useRef } from 'react'
import { ServiceCard } from '../components/services/ServiceCard'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SERVICES } from '../data/services'
import { useSectionReveal } from '../hooks/useSectionReveal'

export function ServicesSection() {
  const ref = useRef(null)
  useSectionReveal(ref, { stagger: 0.055 })

  return (
    <section
      id="services"
      ref={ref}
      className="scroll-mt-12 border-b border-rbn-border/60 bg-rbn-void py-12 sm:py-16 lg:scroll-mt-[5rem] lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          kicker="Services"
          title="Capability across the full digital stack."
          description="Engagements are tailored — from focused sprints to long-term product partnerships — with the same standards for craft and communication."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} title={s.title} description={s.description} icon={s.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}
