import { Link } from 'react-router-dom'

export function CareerOtherApplyPage() {
  return (
    <div className="pt-14 sm:pt-16 lg:pt-[6rem]">
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <Link
          to="/careers"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-rbn-accent transition-colors hover:text-rbn-fog"
        >
          ← Back to careers
        </Link>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-rbn-white sm:text-4xl">
          Another tech stack?
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-rbn-muted">
          If you work in a stack we haven’t listed, send us a message with your resume and a short note on what you
          build. We’ll review it and get back to you when there’s a fit.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            to="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-rbn-accent px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_36px_rgba(225,29,72,0.25)] transition-colors hover:bg-[#f43f5e]"
          >
            Message us
          </Link>
          <a
            href="mailto:redblacknode@gmail.com?subject=Career%20application%20%E2%80%94%20other%20stack"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-rbn-border-strong px-8 py-3.5 text-sm font-medium text-rbn-fog transition-colors hover:border-rbn-accent/35 hover:bg-white/[0.04]"
          >
            Email resume
          </a>
        </div>
      </div>
    </div>
  )
}
