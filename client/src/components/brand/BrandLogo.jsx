/**
 * Official mark — `public/logo.png`. Size via `className` (e.g. height + max-width).
 */
export function BrandLogo({ className = '' }) {
  return (
    <img
      src="/logo.png"
      alt=""
      width={1024}
      height={1024}
      decoding="async"
      className={['block object-contain object-left', className].join(' ')}
    />
  )
}
