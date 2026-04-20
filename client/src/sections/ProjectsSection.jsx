import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { GhlEmptyState } from '../components/projects/GhlEmptyState'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ProjectFilters } from '../components/projects/ProjectFilters'
import { ProjectModal } from '../components/projects/ProjectModal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { categoryLabel, GHL_PLACEHOLDER, PROJECT_CATEGORIES, PROJECTS } from '../data/projectData'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSectionReveal } from '../hooks/useSectionReveal'

const ALL = 'all'

function useAnimateCards(containerRef, deps, reduced) {
  useLayoutEffect(() => {
    const root = containerRef?.current
    if (!root || reduced) return undefined

    const cards = root.querySelectorAll('.project-card')
    if (!cards.length) return undefined

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.055,
        duration: 0.58,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    )

    return () => {
      tween.kill()
    }
  }, [deps, reduced, containerRef])
}

export function ProjectsSection() {
  const sectionRef = useRef(null)
  const featuredRef = useRef(null)
  const gridRef = useRef(null)
  const ghlRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  const [activeCategory, setActiveCategory] = useState(ALL)
  const [modalProject, setModalProject] = useState(null)

  useSectionReveal(sectionRef, { stagger: 0.06 })

  const featured = useMemo(() => PROJECTS.filter((p) => p.featured).slice(0, 3), [])
  const featuredIds = useMemo(() => new Set(featured.map((p) => p.id)), [featured])

  const ghlProjects = useMemo(() => PROJECTS.filter((p) => p.category === 'ghl'), [])

  const gridProjects = useMemo(() => {
    if (activeCategory === ALL) {
      return PROJECTS.filter((p) => !featuredIds.has(p.id))
    }
    return PROJECTS.filter((p) => p.category === activeCategory)
  }, [activeCategory, featuredIds])

  const showFeatured = activeCategory === ALL && featured.length > 0
  const showGhlEmpty = activeCategory === 'ghl' && ghlProjects.length === 0
  const showGrid = !showGhlEmpty && gridProjects.length > 0

  const filterKey = `${activeCategory}-${gridProjects.map((p) => p.id).join(',')}`

  const featuredKey = showFeatured ? featured.map((p) => p.id).join('-') : 'off'

  useAnimateCards(featuredRef, featuredKey, reduced)
  useAnimateCards(gridRef, filterKey, reduced)

  useLayoutEffect(() => {
    if (!showGhlEmpty || reduced) return undefined
    const el = ghlRef.current
    if (!el) return undefined
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }
    )
    return () => tween.kill()
  }, [showGhlEmpty, reduced])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="scroll-mt-14 border-b border-rbn-border/60 bg-rbn-base py-16 sm:py-24 lg:scroll-mt-[5rem] lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          kicker="Projects"
          title="Selected builds across stacks and platforms."
          description="Explore live work — from MERN products and Shopify commerce to WordPress & Woo. GoHighLevel case studies are available on request."
        />

        <div className="mt-12 max-w-2xl">
          <ProjectFilters
            categories={PROJECT_CATEGORIES}
            activeId={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {showFeatured && (
          <div className="mt-14">
            <h3 className="js-reveal font-display text-xs font-semibold uppercase tracking-[0.28em] text-rbn-muted">
              Featured
            </h3>
            <div
              ref={featuredRef}
              className="mt-6 grid gap-5 md:grid-cols-3"
            >
              {featured.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  categoryLabel={categoryLabel(p.category)}
                  onOpenDetails={setModalProject}
                />
              ))}
            </div>
          </div>
        )}

        {showGhlEmpty && (
          <div ref={ghlRef} className="mt-14">
            <GhlEmptyState title={GHL_PLACEHOLDER.title} body={GHL_PLACEHOLDER.body} />
          </div>
        )}

        {showGrid && (
          <div className={showFeatured ? 'mt-16' : 'mt-14'}>
            <h3 className="js-reveal font-display text-xs font-semibold uppercase tracking-[0.28em] text-rbn-muted">
              {activeCategory === ALL ? 'All projects' : `${categoryLabel(activeCategory)} work`}
            </h3>
            <div
              ref={gridRef}
              key={filterKey}
              className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {gridProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  categoryLabel={categoryLabel(p.category)}
                  onOpenDetails={setModalProject}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <ProjectModal
        project={modalProject}
        categoryLabel={modalProject ? categoryLabel(modalProject.category) : ''}
        onClose={() => setModalProject(null)}
      />
    </section>
  )
}
