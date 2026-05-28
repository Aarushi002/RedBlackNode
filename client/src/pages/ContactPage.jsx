import { ContactSection } from '../sections/ContactSection'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { SEO_PAGES, SITE } from '../data/seo'

const CONTACT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${SITE.url}/contact`,
  name: 'Contact RedBlackNode',
  about: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
  },
}

export function ContactPage() {
  useDocumentMeta({ ...SEO_PAGES.contact, jsonLd: CONTACT_JSON_LD })

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[6rem]">
      <ContactSection />
    </div>
  )
}
