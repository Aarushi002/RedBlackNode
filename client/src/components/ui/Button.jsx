const variants = {
  primary:
    'bg-rbn-accent text-white shadow-[0_0_40px_rgba(225,29,72,0.25)] hover:shadow-[0_0_48px_rgba(225,29,72,0.35)] hover:bg-[#f43f5e]',
  ghost:
    'border border-rbn-border-strong bg-white/[0.03] text-rbn-fog hover:border-rbn-accent/40 hover:bg-rbn-accent-soft',
  subtle: 'text-rbn-subtle hover:text-rbn-white underline-offset-4 hover:underline',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-3.5 text-sm rounded-xl tracking-wide',
}

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={[
        'inline-flex items-center justify-center font-medium transition-all duration-300',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rbn-accent',
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
}
