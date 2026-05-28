import { Link } from 'react-router-dom'
import { BrandLogo } from '../brand/BrandLogo'
import { FOOTER_LINKS, FOOTER_LEGAL_LINKS, linkTo } from '../../data/navigation'
import { useGoToHero } from '../../hooks/useGoToHero'

export function Footer() {
  const goToHero = useGoToHero()

  return (
    <footer className="border-t border-rbn-border bg-rbn-base">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-3 lg:gap-10 lg:items-start">
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
              <BrandLogo className="h-12 w-auto max-w-[220px] object-center sm:h-14 sm:max-w-[260px] lg:h-20 lg:max-w-[320px]" />
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-rbn-muted">
              A freelance web development, software, and tech solutions studio founded by{' '}
              <span className="text-rbn-fog">Aarushi Krishna</span> — building precise web systems,
              ecommerce, and automation for teams that expect craft and clarity.
            </p>
            <a
              href="mailto:redblacknode@gmail.com"
              className="mt-4 inline-flex text-sm font-medium text-rbn-fog transition-colors hover:text-rbn-accent"
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

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-rbn-border pt-6 text-xs text-rbn-muted sm:mt-12 sm:flex-row sm:items-center sm:gap-4 sm:pt-8">
          <p>© {new Date().getFullYear()} RedBlackNode by Aarushi Krishna. All rights reserved.</p>
          <p className="text-rbn-muted/80">Freelance web development, software, and tech solutions.</p>
        </div>
      </div>
    </footer>
  )
}
