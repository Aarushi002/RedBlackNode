import { useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HeroSection } from '../sections/HeroSection'
import { AboutSection } from '../sections/AboutSection'
import { ServicesSection } from '../sections/ServicesSection'
import { ContactCtaSection } from '../sections/ContactCtaSection'

/** Full page reload scrolls home to `#hero` once per document load (SPA remounts must not re-trigger). */
let homeReloadHeroHandled = false

export function HomePage() {
  const { hash, pathname } = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (pathname !== '/') return

    const nav = performance.getEntriesByType?.('navigation')?.[0]
    const isReload = nav?.type === 'reload'

    if (isReload && !homeReloadHeroHandled) {
      homeReloadHeroHandled = true
      navigate('/', { replace: true })
      requestAnimationFrame(() => {
        document.getElementById('hero')?.scrollIntoView({ block: 'start' })
      })
      return
    }

    if (!hash) return
    const id = hash.replace(/^#/, '')
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
    return () => window.clearTimeout(t)
  }, [hash, pathname, navigate])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactCtaSection />
    </>
  )
}
