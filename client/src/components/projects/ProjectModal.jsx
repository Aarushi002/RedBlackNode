import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { projectPreviewHostname, projectPreviewImageUrls } from '../../lib/projectPreview'

export function ProjectModal({ project, categoryLabel, onClose }) {
  const closeRef = useRef(null)
  const [urlIndex, setUrlIndex] = useState(0)

  const previewUrls = useMemo(
    () => (project?.image ? [project.image] : projectPreviewImageUrls(project?.url || '')),
    [project?.image, project?.url]
  )

  useEffect(() => {
    setUrlIndex(0)
  }, [project?.id, previewUrls])

  useEffect(() => {
    if (!project) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => closeRef.current?.focus(), 0)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  if (!project || typeof document === 'undefined') return null

  const previewSrc = previewUrls[urlIndex]
  const hostname = projectPreviewHostname(project.url)
  const showPreview = Boolean(previewSrc) && urlIndex < previewUrls.length

  function onPreviewError() {
    setUrlIndex((i) => (i + 1 < previewUrls.length ? i + 1 : previewUrls.length))
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-rbn-void/85 backdrop-blur-md"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-rbn-border bg-rbn-elevated shadow-[0_-24px_80px_rgba(0,0,0,0.5)] sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-rbn-border px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rbn-accent">{categoryLabel}</p>
            <h2 id="project-modal-title" className="mt-2 font-display text-xl font-semibold text-rbn-white sm:text-2xl">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="rounded-lg border border-rbn-border px-3 py-1.5 text-xs font-medium text-rbn-muted transition-colors hover:border-rbn-border-strong hover:text-rbn-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="border-b border-rbn-border bg-rbn-surface">
          <div
            className="flex h-8 items-center gap-2 border-b border-rbn-border/80 bg-rbn-elevated/95 px-4"
            aria-hidden
          >
            <span className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/90" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/90" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]/90" />
            </span>
            <p className="min-w-0 flex-1 truncate rounded border border-rbn-border/40 bg-rbn-base/70 px-2 py-0.5 text-center font-mono text-[9px] text-rbn-muted">
              {hostname || '—'}
            </p>
          </div>
          <div className="relative aspect-video w-full bg-rbn-void">
            {showPreview ? (
              <img
                key={`${project.id}-${urlIndex}`}
                src={previewSrc}
                alt={`${project.title} — site preview`}
                loading="eager"
                decoding="async"
                onError={onPreviewError}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-rbn-elevated text-xs text-rbn-muted">
                Preview unavailable
              </div>
            )}
          </div>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <p className="text-sm leading-relaxed text-rbn-muted">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {(project.tech ?? []).map((t) => (
              <span
                key={t}
                className="rounded-md border border-rbn-border bg-rbn-surface/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-rbn-subtle"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-rbn-border px-6 py-5 sm:px-8">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-rbn-accent py-3.5 text-sm font-medium text-white shadow-[0_0_32px_rgba(225,29,72,0.22)] transition-colors hover:bg-[#f43f5e]"
          >
            Visit live site
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}
