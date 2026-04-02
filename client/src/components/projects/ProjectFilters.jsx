const ALL_ID = 'all'

export function ProjectFilters({ categories, activeId, onChange }) {
  const items = [{ id: ALL_ID, label: 'All' }, ...categories]

  return (
    <div
      className="js-reveal flex flex-wrap gap-2 sm:gap-2.5"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {items.map((item) => {
        const selected = activeId === item.id
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={[
              'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:px-5',
              selected
                ? 'border-rbn-accent/50 bg-rbn-accent-soft text-rbn-white shadow-[0_0_24px_rgba(225,29,72,0.12)]'
                : 'border-rbn-border bg-transparent text-rbn-muted hover:border-rbn-border-strong hover:text-rbn-fog',
            ].join(' ')}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
