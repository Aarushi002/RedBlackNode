export function SectionHeader({ kicker, title, description, align = 'left' }) {
  return (
    <div
      className={[
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : '',
      ].join(' ')}
    >
      {kicker && (
        <p className="js-reveal text-xs font-semibold uppercase tracking-[0.28em] text-rbn-accent">{kicker}</p>
      )}
      <h2 className="js-reveal mt-4 font-display text-3xl font-semibold tracking-tight text-rbn-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="js-reveal mt-5 text-base leading-relaxed text-rbn-muted sm:text-[1.05rem]">{description}</p>
      )}
    </div>
  )
}
