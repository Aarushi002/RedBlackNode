import { ServiceIcon } from './ServiceIcon'

export function ServiceCard({ title, description, icon }) {
  return (
    <article className="js-reveal group relative overflow-hidden rounded-2xl border border-rbn-border bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-rbn-accent/35 hover:shadow-[0_0_0_1px_rgba(225,29,72,0.12),0_24px_60px_rgba(0,0,0,0.35)] sm:p-7">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rbn-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-rbn-border-strong bg-rbn-surface/80 text-rbn-accent transition-colors duration-300 group-hover:border-rbn-accent/40 group-hover:text-[#fb7185]">
          <ServiceIcon name={icon} className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-rbn-white">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-rbn-muted">{description}</p>
        </div>
      </div>
    </article>
  )
}
