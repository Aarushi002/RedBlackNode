import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { RoleCard } from '../components/careers/RoleCard'
import { SectionHeader } from '../components/ui/SectionHeader'
import { CAREERS_COMPENSATION, CAREERS_INTRO, ROLES } from '../data/careers'
import { useSectionReveal } from '../hooks/useSectionReveal'

export function CareersSection() {
  const ref = useRef(null)
  useSectionReveal(ref, { stagger: 0.055 })

  return (
    <section
      id="careers"
      ref={ref}
      className="scroll-mt-14 border-b border-rbn-border/60 bg-rbn-base py-16 sm:py-24 lg:scroll-mt-[6rem] lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          kicker="Careers"
          title="Work with RedBlackNode."
          description="A selective, studio-style bench for builders who want real ownership — and work that shows in the final URL."
        />

        <p className="js-reveal mt-8 max-w-3xl text-base leading-relaxed text-rbn-muted sm:text-[1.05rem]">
          {CAREERS_INTRO}
        </p>

        <div className="js-reveal mt-8 max-w-3xl rounded-2xl border border-rbn-border-strong bg-rbn-surface/50 p-6 sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rbn-accent">Compensation model</p>
          <p className="mt-3 text-sm leading-relaxed text-rbn-muted">{CAREERS_COMPENSATION}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {ROLES.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>

        <div className="js-reveal mt-12 rounded-2xl border border-rbn-border bg-rbn-surface/40 px-6 py-7 sm:px-8">
          <p className="font-display text-base font-semibold text-rbn-white sm:text-lg">Different stack?</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-rbn-muted">
            Applying for another technology or specialty? Send your resume and a short intro — we’ll review and reach
            out when there’s a match.
          </p>
          <Link
            to="/careers/apply/other"
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-rbn-border-strong px-6 py-3 text-sm font-medium text-rbn-fog transition-colors hover:border-rbn-accent/35 hover:bg-white/[0.04]"
          >
            Apply for another tech stack
          </Link>
        </div>

        <div className="js-reveal mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-rbn-border bg-gradient-to-r from-rbn-accent-soft/40 via-transparent to-transparent px-6 py-8 sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="font-display text-lg font-semibold text-rbn-white sm:text-xl">Ready to build with us?</p>
            <p className="mt-2 max-w-xl text-sm text-rbn-muted">
              Send a short note with your portfolio, availability, and the role you’re pursuing — we’ll follow up with next steps.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-rbn-accent px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_36px_rgba(225,29,72,0.25)] transition-colors hover:bg-[#f43f5e]"
          >
            Apply now
          </Link>
        </div>
      </div>
    </section>
  )
}
