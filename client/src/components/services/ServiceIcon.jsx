const icons = {
  stack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 7l8-4 8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 17l8 4 8-4" opacity="0.5" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  ),
  wp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" opacity="0.4" />
    </svg>
  ),
  layout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
    </svg>
  ),
  window: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" opacity="0.5" />
    </svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="8" r="2.5" />
      <circle cx="18" cy="16" r="2.5" />
      <path d="M8.5 12h5M14 9.5l4-1.5M14 14.5l4 1.5" />
    </svg>
  ),
  crm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 6h16v12H4z" />
      <path d="M8 10h8M8 14h5" opacity="0.6" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
      <path d="M13 7l-2 10" opacity="0.5" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" opacity="0.45" />
    </svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 14a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M12 3v2M4.2 7.8l1.4 1.4M3 14h2M19 14h2M18.4 9.2l1.4-1.4" opacity="0.45" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.3-4.3" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01M11 7h4M11 17h4" strokeLinecap="round" strokeWidth="2" />
    </svg>
  ),
}

export function ServiceIcon({ name, className = 'h-6 w-6' }) {
  return <span className={className}>{icons[name] ?? icons.cube}</span>
}
