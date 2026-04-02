import { Link } from 'react-router-dom'

export function RoleCard({ role }) {
  return (
    <article className="js-reveal flex h-full flex-col rounded-2xl border border-rbn-border bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-rbn-accent/30 hover:shadow-[0_24px_70px_rgba(0,0,0,0.38)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-semibold tracking-tight text-rbn-white">{role.title}</h3>
        <span
          className="shrink-0 rounded-full border border-rbn-border bg-rbn-surface/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-rbn-muted"
          aria-hidden
        >
          Open
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-rbn-fog/95">{role.summary}</p>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rbn-muted">Responsibilities</p>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-rbn-muted">
          {role.responsibilities.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-px w-4 shrink-0 bg-rbn-accent/50" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rbn-muted">Skills</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {role.skills.map((s) => (
            <span
              key={s}
              className="rounded-md border border-rbn-border bg-rbn-surface/70 px-2.5 py-1 text-[11px] font-medium text-rbn-subtle"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-rbn-border/80 pt-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rbn-muted">Ideal profile</p>
          <p className="mt-2 text-sm leading-relaxed text-rbn-muted">{role.ideal}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rbn-muted">How we work</p>
          <p className="mt-2 text-sm leading-relaxed text-rbn-muted">{role.workStyle}</p>
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-rbn-muted/85 italic">{role.compensationNote}</p>

      <div className="mt-6 flex flex-1 flex-col justify-end">
        <Link
          to={`/careers/apply/${role.id}`}
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-rbn-accent py-3.5 text-sm font-medium text-white shadow-[0_0_32px_rgba(225,29,72,0.22)] transition-colors hover:bg-[#f43f5e]"
        >
          Apply now
        </Link>
        <p className="mt-3 text-center text-[11px] text-rbn-muted">
          Opens the application form for this role.
        </p>
      </div>
    </article>
  )
}
