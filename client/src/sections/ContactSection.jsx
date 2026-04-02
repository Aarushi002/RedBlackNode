import { useRef } from 'react'
import { ContactForm } from '../components/contact/ContactForm'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useSectionReveal } from '../hooks/useSectionReveal'

export function ContactSection() {
  const ref = useRef(null)
  useSectionReveal(ref)

  return (
    <section
      id="contact"
      ref={ref}
      className="relative scroll-mt-[5.5rem] overflow-hidden border-b border-rbn-border/60 bg-rbn-void py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(225,29,72,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:items-start">
          <div>
            <SectionHeader
              kicker="Contact"
              title="Tell us what you need — we’ll help you build it."
              description="Share a concise brief: goals, stack, timeline, and budget band if you can. We reply to serious inquiries quickly."
            />
            <a
              href="mailto:redblacknode@gmail.com"
              className="js-reveal mt-8 inline-flex text-sm font-medium text-rbn-fog transition-colors hover:text-rbn-accent"
            >
              redblacknode@gmail.com
            </a>
            <p className="js-reveal mt-3 text-xs leading-relaxed text-rbn-muted">
              Prefer email? Use the address above — the form delivers to the same inbox.
            </p>
          </div>

          <div className="js-reveal relative rounded-2xl border border-rbn-border bg-rbn-base/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8">
            <div
              className="pointer-events-none absolute -right-px -top-px h-24 w-24 rounded-tr-2xl border-t border-r border-rbn-accent/25"
              aria-hidden
            />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
