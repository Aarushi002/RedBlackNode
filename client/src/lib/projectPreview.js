/**
 * Ordered list of remote screenshot URLs for portfolio previews.
 * Tries each until one loads (mShots first, then thum.io fallback).
 */
export function projectPreviewImageUrls(url) {
  if (!url || typeof url !== 'string') return []
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return []
    if (parsed.hostname === 'share.google') return []
    const enc = encodeURIComponent(url)
    return [
      `https://s0.wp.com/mshots/v1/${enc}?w=1200`,
      `https://image.thum.io/get/width/1200/crop/900/noanimate/${enc}`,
    ]
  } catch {
    return []
  }
}

/** @deprecated use projectPreviewImageUrls — first candidate only */
export function projectScreenshotUrl(url) {
  const urls = projectPreviewImageUrls(url)
  return urls[0] ?? null
}

export function projectPreviewHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}
