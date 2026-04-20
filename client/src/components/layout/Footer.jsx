import { Link } from 'react-router-dom'
import { BrandLogo } from '../brand/BrandLogo'
import { FOOTER_LINKS, FOOTER_LEGAL_LINKS, linkTo } from '../../data/navigation'
import { useGoToHero } from '../../hooks/useGoToHero'

export function Footer() {
  const goToHero = useGoToHero()

  return (
    <footer className="border-t border-rbn-border bg-rbn-base">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-10 lg:items-start">
          <div className="flex flex-col lg:justify-self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rbn-muted">Navigate</p>
            <ul className="mt-4 flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={`${link.label}-${link.to}-${link.hash ?? ''}`}>
                  <Link
                    to={linkTo(link)}
                    className="text-sm text-rbn-subtle transition-colors hover:text-rbn-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center lg:justify-self-center">
            <Link
              to="/"
              aria-label="RedBlackNode — Home"
              className="inline-flex outline-none transition-opacity hover:opacity-90 focus-visible:opacity-100"
              onClick={goToHero}
            >
              <BrandLogo className="h-11 w-auto max-w-[220px] object-center sm:h-12 sm:max-w-[240px]" />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-rbn-muted">
              A digital product and development studio building precise web systems, commerce, and
              automation for teams that expect craft and clarity.
            </p>
            <a
              href="mailto:redblacknode@gmail.com"
              className="mt-6 inline-flex text-sm font-medium text-rbn-fog transition-colors hover:text-rbn-accent"
            >
              redblacknode@gmail.com
            </a>
          </div>

          <div className="flex flex-col lg:items-end lg:text-right lg:justify-self-end">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rbn-muted">Legal</p>
            <ul className="mt-4 flex flex-col gap-2">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-rbn-subtle transition-colors hover:text-rbn-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-rbn-border pt-8 text-xs text-rbn-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} RedBlackNode. All rights reserved.</p>
          <p className="text-rbn-muted/80">Built with intent — design, engineering, motion.</p>
        </div>
      </div>
    </footer>
  )
}
