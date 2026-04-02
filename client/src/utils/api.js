/** Base URL for API (no trailing slash). Empty = same origin / dev proxy. */
export function apiUrl(path) {
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}
