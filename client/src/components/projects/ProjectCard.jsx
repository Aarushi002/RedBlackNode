import { useEffect, useMemo, useState } from 'react'
import { useTilt } from '../../hooks/useTilt'
import { projectPreviewHostname, projectPreviewImageUrls } from '../../lib/projectPreview'

function thumbGradient(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i) * (i + 1)) % 360
  const h2 = (h + 40) % 360
  return `linear-gradient(145deg, hsl(${h} 28% 12%), hsl(${h2} 35% 8%))`
}

function initials(title) {
  const parts = title.split(/[\s|]+/).filter(Boolean)
  const a = parts[0]?.[0] ?? ''
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase() || 'RB'
}

export function ProjectCard({ project, categoryLabel, onOpenDetails, className = '' }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt()
  const previewUrls = useMemo(
    () => (project.image ? [project.image] : projectPreviewImageUrls(project.url)),
    [project.image, project.url]
  )
  const hostname = projectPreviewHostname(project.url)
  const [urlIndex, setUrlIndex] = useState(0)

  useEffect(() => {
    setUrlIndex(0)
  }, [project.id, previewUrls])

  const previewSrc = previewUrls[urlIndex]
  const showLivePreview = Boolean(previewSrc) && urlIndex < previewUrls.length

  function onPreviewError() {
    setUrlIndex((i) => (i + 1 < previewUrls.length ? i + 1 : previewUrls.length))
  }

  return (
    <article className={['project-card h-full', className].filter(Boolean).join(' ')}>
      <div
        ref={ref}
        role="presentation"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          transform: 'perspective(1100px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
          transition: 'transform 0.2s ease-out',
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rbn-border bg-gradient-to-b from-white/[0.04] to-transparent transition-[border-color,box-shadow] duration-500 hover:border-rbn-accent/35 hover:shadow-[0_0_0_1px_rgba(225,29,72,0.1),0_28px_70px_rgba(0,0,0,0.4)]"
      >
        <div className="relative flex aspect-[16/10] w-full flex-col overflow-hidden border-b border-rbn-border/80 bg-rbn-surface">
          <div
            className="flex h-9 shrink-0 items-center gap-2 border-b border-rbn-border/80 bg-rbn-elevated/95 px-3"
            aria-hidden
          >
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/90" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/90" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/90" />
            </span>
            <p className="min-w-0 flex-1 truncate rounded border border-rbn-border/40 bg-rbn-base/70 px-2 py-0.5 text-center font-mono text-[10px] text-rbn-muted">
              {hostname || '—'}
            </p>
          </div>

          <div className="relative min-h-0 flex-1 bg-rbn-void">
            {showLivePreview ? (
              <img
                key={`${project.id}-${urlIndex}`}
                src={previewSrc}
                alt={`${project.title} — live site preview`}
                loading="lazy"
                decoding="async"
                onError={onPreviewError}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ background: thumbGradient(project.id) }}
                aria-hidden
              >
                <span className="font-display text-3xl font-semibold text-white/25 sm:text-4xl">
                  {initials(project.title)}
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rbn-base/85 via-transparent to-transparent" />
            <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-rbn-base/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-rbn-fog backdrop-blur-md">
              {categoryLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="font-display text-lg font-semibold tracking-tight text-rbn-white sm:text-xl">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-rbn-muted">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {(project.tech ?? []).slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-md border border-rbn-border bg-rbn-surface/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-rbn-subtle"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-xl bg-rbn-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_28px_rgba(225,29,72,0.2)] transition-colors hover:bg-[#f43f5e] sm:flex-none sm:px-6"
            >
              Visit live
            </a>
            <button
              type="button"
              className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-rbn-border-strong px-4 py-2.5 text-sm font-medium text-rbn-fog transition-colors hover:border-rbn-accent/35 hover:bg-white/[0.04]"
              onClick={() => onOpenDetails?.(project)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
