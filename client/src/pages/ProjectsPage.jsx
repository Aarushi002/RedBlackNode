import { ProjectsSection } from '../sections/ProjectsSection'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { SEO_PAGES } from '../data/seo'

export function ProjectsPage() {
  useDocumentMeta(SEO_PAGES.projects)

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[6rem]">
      <ProjectsSection />
    </div>
  )
}
