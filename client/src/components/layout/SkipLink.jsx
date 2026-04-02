function smoothScroll() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(e) => {
        e.preventDefault()
        const el = document.getElementById('main-content')
        if (!el) return
        el.scrollIntoView({ behavior: smoothScroll() ? 'smooth' : 'auto', block: 'start' })
        el.focus({ preventScroll: true })
      }}
    >
      Skip to main content
    </a>
  )
}
