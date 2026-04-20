import { Link } from 'react-router-dom'

const FAQS = [
  {
    q: 'What exactly do you build?',
    a: 'We design and build high-performance websites, platforms, and automation systems that are made to work in real-world conditions.',
  },
  {
    q: 'Do you use templates?',
    a: 'No. Everything is built from scratch based on your requirements and goals.',
  },
  {
    q: 'What technologies do you work with?',
    a: 'MERN stack, Shopify, WordPress, WooCommerce, GoHighLevel, and automation tools like n8n, Zapier, and Make.',
  },
  {
    q: 'How long does a project take?',
    a: 'It depends on scope, but most projects range from 1 to 6 weeks.',
  },
  {
    q: 'Do you handle both design and development?',
    a: 'Yes. We handle everything end to end.',
  },
  {
    q: 'Will my website be mobile responsive?',
    a: 'Always. Every build is optimized for all screen sizes.',
  },
  {
    q: 'Can you improve my existing website?',
    a: 'Yes. We can redesign, optimize, or rebuild depending on what’s needed.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes. We can stay involved for updates, maintenance, and improvements.',
  },
  {
    q: 'How do you ensure performance?',
    a: 'We focus on clean code, optimized assets, and efficient architecture from the start.',
  },
  {
    q: 'Will my site be SEO-friendly?',
    a: 'Yes. We follow best practices for structure, speed, and indexing.',
  },
  {
    q: 'Do you build e-commerce websites?',
    a: 'Yes. Shopify and WooCommerce are our primary platforms.',
  },
  {
    q: 'Can you build custom web apps?',
    a: 'Yes. We build scalable applications using the MERN stack and modern frameworks.',
  },
  {
    q: 'Do you work with startups or established businesses?',
    a: 'Both. As long as the project is serious, we’re in.',
  },
  {
    q: 'How do you handle communication?',
    a: 'Clear, direct, and fast. No unnecessary back and forth.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A clear idea of your goals, your requirements, and any references if you have them.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes, if required.',
  },
  {
    q: 'What makes you different from other agencies?',
    a: 'We focus on building things that actually work and scale, not just look good.',
  },
  {
    q: 'Will I be able to manage the website myself?',
    a: 'Yes. We build with usability in mind and can guide you through it.',
  },
  {
    q: 'Do you integrate third-party tools and APIs?',
    a: 'Yes. CRMs, payment systems, automation tools, and more.',
  },
  {
    q: 'How do I get started?',
    a: 'Reach out through the contact form or click “Start a Project” and we’ll take it from there.',
  },
]

export function FaqPage() {
  return (
    <div className="pt-14 sm:pt-16 lg:pt-[5rem]">
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-rbn-white sm:text-4xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-rbn-muted">
          Straight answers about how we work, what we build, and how to get started.
        </p>

        <dl className="mt-12 space-y-10">
          {FAQS.map((item, i) => (
            <div key={i} className="border-b border-rbn-border pb-10 last:border-0 last:pb-0">
              <dt className="text-sm font-semibold text-rbn-fog">
                {i + 1}. {item.q}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-rbn-muted">{item.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 rounded-xl border border-rbn-border bg-rbn-surface/50 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-rbn-muted">
            Have more questions?{' '}
            <Link to="/contact" className="font-medium text-rbn-accent transition-colors hover:text-rbn-fog">
              Contact us here
            </Link>{' '}
            or email{' '}
            <a
              href="mailto:redblacknode@gmail.com"
              className="font-medium text-rbn-accent transition-colors hover:text-rbn-fog"
            >
              redblacknode@gmail.com
            </a>
            .
          </p>
        </div>
      </article>
    </div>
  )
}
