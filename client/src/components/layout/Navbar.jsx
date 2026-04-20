import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BrandLogo } from '../brand/BrandLogo'
import { NAV_LINKS, linkTo } from '../../data/navigation'
import { Button } from '../ui/Button'
import { burstProjectConfetti } from '../../lib/projectConfetti'
import { useGoToHero } from '../../hooks/useGoToHero'

function isNavActive(link, { pathname, hash }) {
  if (link.hash) return pathname === '/' && hash === `#${link.hash}`
  if (link.to === '/') return pathname === '/' && hash === ''
  return pathname === link.to
}

export function Navbar() {
  const location = useLocation()
  const goToHero = useGoToHero()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const confettiArmed = useRef(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
    return undefined
  }, [open])

  const closeMenu = useCallback(() => setOpen(false), [])

  const onProjectHover = useCallback(() => {
    if (!confettiArmed.current) return
    confettiArmed.current = false
    burstProjectConfetti()
  }, [])

  const onProjectLeave = useCallback(() => {
    confettiArmed.current = true
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300',
        scrolled
          ? 'border-white/10 bg-black/92 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md'
          : 'border-white/[0.08] bg-black shadow-[0_4px_24px_rgba(0,0,0,0.45)]',
      ].join(' ')}
    >
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:min-h-16 sm:px-6 lg:min-h-[5rem] lg:px-10">
        <Link
          to="/"
          aria-label="RedBlackNode — Home"
          className="flex shrink-0 items-center outline-none transition-opacity hover:opacity-95 focus-visible:rounded-md focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rbn-accent"
          onClick={(e) => {
            closeMenu()
            goToHero(e)
          }}
        >
          <BrandLogo className="h-10 w-auto max-w-[50vw] sm:h-12 sm:max-w-[44vw] lg:h-16 lg:max-w-[min(40vw,360px)]" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex lg:gap-2" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = isNavActive(link, location)
            return (
              <Link
                key={link.id}
                to={linkTo(link)}
                aria-current={active ? 'page' : undefined}
                onClick={link.id === 'home' ? goToHero : undefined}
                className={[
                  'rounded-lg px-3 py-2 text-base font-bold tracking-tight transition-colors lg:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rbn-accent',
                  active ? 'text-white' : 'text-zinc-400 hover:text-white',
                ].join(' ')}
              >
                <span className="block">
                  {link.label}
                  {active && (
                    <span
                      className="mt-1 block h-px bg-gradient-to-r from-transparent via-rbn-accent to-transparent opacity-95"
                      aria-hidden
                    />
                  )}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            as={Link}
            to="/contact"
            variant="ghost"
            size="sm"
            className="border-white/20 bg-white/[0.04] text-zinc-200 shadow-none hover:border-rbn-accent/50 hover:bg-rbn-accent/15 hover:text-white focus-visible:outline-rbn-accent"
            onMouseEnter={onProjectHover}
            onMouseLeave={onProjectLeave}
            onClick={() => burstProjectConfetti()}
          >
            Start a Project
          </Button>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] text-white backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/10 sm:h-10 sm:w-10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span
              className={[
                'block h-px w-5 bg-current transition-transform',
                open ? 'translate-y-[3px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-5 bg-current transition-opacity',
                open ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-5 bg-current transition-transform',
                open ? '-translate-y-[3px] -rotate-45' : '',
              ].join(' ')}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={[
          'border-b border-white/10 bg-black/98 backdrop-blur-md lg:hidden',
          open ? 'block' : 'hidden',
        ].join(' ')}
      >
        <nav className="flex flex-col gap-1 px-4 py-3 sm:px-6 sm:py-4" aria-label="Mobile primary">
          {NAV_LINKS.map((link) => {
            const active = isNavActive(link, location)
            return (
              <Link
                key={link.id}
                to={linkTo(link)}
                onClick={(e) => {
                  closeMenu()
                  if (link.id === 'home') goToHero(e)
                }}
                aria-current={active ? 'page' : undefined}
                className={[
                  'rounded-lg px-3 py-2.5 text-base font-semibold tracking-tight transition-colors sm:text-lg',
                  active ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5 hover:text-white',
                ].join(' ')}
              >
                {link.label}
              </Link>
            )
          })}
          <Button
            as={Link}
            to="/contact"
            variant="ghost"
            size="md"
            className="mt-2 w-full border-white/20 bg-white/[0.04] text-zinc-200 hover:border-rbn-accent/45 hover:bg-rbn-accent/15 hover:text-white focus-visible:outline-rbn-accent"
            onClick={() => {
              closeMenu()
              burstProjectConfetti()
            }}
            onMouseEnter={onProjectHover}
            onMouseLeave={onProjectLeave}
          >
            Start a Project
          </Button>
        </nav>
      </div>
    </header>
  )
}
