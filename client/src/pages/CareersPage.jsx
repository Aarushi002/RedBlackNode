import { CareersSection } from '../sections/CareersSection'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { SEO_PAGES } from '../data/seo'

export function CareersPage() {
  useDocumentMeta(SEO_PAGES.careers)

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[6rem]">
      <CareersSection />
    </div>
  )
}
