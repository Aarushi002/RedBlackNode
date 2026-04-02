import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Returns a click handler for links to `/` that scrolls to `#hero` when already on the home page.
 * When on another route, the default `<Link to="/">` navigation is left to run.
 */
export function useGoToHero() {
  const navigate = useNavigate()
  const location = useLocation()

  return useCallback(
    (e) => {
      if (location.pathname !== '/') return

      e.preventDefault()
      if (location.hash) {
        navigate({ pathname: '/' }, { replace: true })
      }
      requestAnimationFrame(() => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    },
    [location.pathname, location.hash, navigate]
  )
}
