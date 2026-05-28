import { useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HeroSection } from '../sections/HeroSection'
import { AboutSection } from '../sections/AboutSection'
import { ServicesSection } from '../sections/ServicesSection'
import { ContactCtaSection } from '../sections/ContactCtaSection'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { SEO_PAGES, SITE, ORG_JSON_LD, PERSON_JSON_LD } from '../data/seo'
import { SERVICES } from '../data/services'

/** Full page reload scrolls home to `#hero` once per document load (SPA remounts must not re-trigger). */
let homeReloadHeroHandled = false

const HOME_JSON_LD = [
  ORG_JSON_LD,
  PERSON_JSON_LD,
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'RedBlackNode Services',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      },
    })),
  },
]

export function HomePage() {
  useDocumentMeta({ ...SEO_PAGES.home, jsonLd: HOME_JSON_LD })

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
