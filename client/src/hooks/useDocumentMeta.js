import { useEffect } from 'react'
import { SITE } from '../data/seo'

function setMetaByAttr(attr, key, content) {
  if (content == null) return
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
}

function setLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Update document meta tags for the current page (title, description, canonical, OG, Twitter,
 * robots, optional JSON-LD). Pass a stable object — internally we serialize jsonLd into the dep
 * key so the effect re-runs only when the value actually changes.
 *
 * @param {Object} opts
 * @param {string} [opts.title]
 * @param {string} [opts.description]
 * @param {string} [opts.canonical]
 * @param {string} [opts.image]
 * @param {string} [opts.type]
 * @param {boolean} [opts.noindex]
 * @param {object|object[]} [opts.jsonLd]
 */
export function useDocumentMeta({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
  jsonLd,
} = {}) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const finalTitle = title || SITE.defaultTitle
    const finalDesc = description || SITE.defaultDescription
    const finalImage = image || SITE.logo
    const finalCanonical = canonical || SITE.url

    document.title = finalTitle

    setMetaByAttr('name', 'description', finalDesc)
    setMetaByAttr('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    setMetaByAttr('property', 'og:title', finalTitle)
    setMetaByAttr('property', 'og:description', finalDesc)
    setMetaByAttr('property', 'og:image', finalImage)
    setMetaByAttr('property', 'og:type', type)
    setMetaByAttr('property', 'og:url', finalCanonical)
    setMetaByAttr('property', 'og:site_name', SITE.name)

    setMetaByAttr('name', 'twitter:card', 'summary_large_image')
    setMetaByAttr('name', 'twitter:title', finalTitle)
    setMetaByAttr('name', 'twitter:description', finalDesc)
    setMetaByAttr('name', 'twitter:image', finalImage)

    setLink('canonical', finalCanonical)

    const scripts = []
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      for (const item of items) {
        const el = document.createElement('script')
        el.type = 'application/ld+json'
        el.dataset.seo = 'page'
        el.text = JSON.stringify(item)
        document.head.appendChild(el)
        scripts.push(el)
      }
    }

    return () => {
      for (const el of scripts) el.remove()
    }
  }, [title, description, canonical, image, type, noindex, jsonLdKey])
}
