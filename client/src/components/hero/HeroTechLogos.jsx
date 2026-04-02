import {
  SiCplusplus,
  SiCss,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiShopify,
  SiTypescript,
  SiWordpress,
  SiZapier,
} from 'react-icons/si'
import { HERO_TECH_STACK } from '../../data/heroTechStack'

function GhlMark({ className }) {
  return (
    <span
      className={[
        'flex items-center justify-center rounded-lg border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] font-display text-[10px] font-bold leading-none tracking-tight text-rbn-fog',
        className,
      ].join(' ')}
      aria-hidden
    >
      GHL
    </span>
  )
}

const ICON_BY_ID = {
  html: SiHtml5,
  css: SiCss,
  js: SiJavascript,
  java: SiOpenjdk,
  cpp: SiCplusplus,
  python: SiPython,
  mongodb: SiMongodb,
  express: SiExpress,
  react: SiReact,
  node: SiNodedotjs,
  ts: SiTypescript,
  next: SiNextdotjs,
  wordpress: SiWordpress,
  shopify: SiShopify,
  n8n: SiN8N,
  zapier: SiZapier,
}

export function HeroTechLogos() {
  return (
    <ul
      className="hero-tech-stack mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:max-w-none md:justify-end lg:max-w-xl"
      aria-label="Technologies and platforms we work with"
    >
      {HERO_TECH_STACK.map((item, index) => {
        const Icon = ICON_BY_ID[item.id]
        return (
          <li
            key={item.id}
            className="hero-tech-item"
            style={{ animationDelay: `${-(index % 5) * 0.35}s` }}
          >
            <span
              className="hero-tech-pill flex h-10 w-10 cursor-default items-center justify-center rounded-xl border border-white/[0.09] bg-black/35 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-rbn-accent/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:h-11 sm:w-11"
              title={item.label}
            >
              {item.custom ? (
                <GhlMark className="h-7 w-7 sm:h-8 sm:w-8" />
              ) : (
                Icon && (
                  <Icon
                    className="h-[22px] w-[22px] sm:h-6 sm:w-6"
                    style={{ color: item.color }}
                    aria-hidden
                  />
                )
              )}
              <span className="sr-only">{item.label}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}
