/** `hash` scrolls to `#id` on the home page (same document, not a new tab). */
export const NAV_LINKS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/', hash: 'about' },
  { id: 'services', label: 'Services', to: '/', hash: 'services' },
  { id: 'projects', label: 'Projects', to: '/projects' },
  { id: 'careers', label: 'Careers', to: '/careers' },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

export const FOOTER_LINKS = [
  { label: 'About', to: '/', hash: 'about' },
  { label: 'Services', to: '/', hash: 'services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_LEGAL_LINKS = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Terms and conditions', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' },
]

/** React Router `to` value for a nav or footer link. */
export function linkTo(item) {
  if (item.hash) return { pathname: '/', hash: item.hash }
  return item.to
}
