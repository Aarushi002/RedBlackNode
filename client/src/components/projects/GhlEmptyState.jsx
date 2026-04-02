import { Link } from 'react-router-dom'

export function GhlEmptyState({ title, body }) {
  return (
    <div className="rounded-2xl border border-dashed border-rbn-border-strong bg-rbn-surface/40 px-8 py-14 text-center sm:px-12">
      <p className="font-display text-xl font-semibold tracking-tight text-rbn-white sm:text-2xl">{title}</p>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-rbn-muted sm:text-base">{body}</p>
      <Link
        to="/contact"
        className="mt-8 inline-flex items-center justify-center rounded-xl border border-rbn-border-strong bg-white/[0.04] px-6 py-3 text-sm font-medium text-rbn-fog transition-colors hover:border-rbn-accent/40 hover:bg-rbn-accent-soft"
      >
        Request case studies
      </Link>
    </div>
  )
}
