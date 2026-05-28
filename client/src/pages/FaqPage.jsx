import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { SEO_PAGES } from '../data/seo'

const FAQS = [
  {
    q: 'Who founded RedBlackNode?',
    a: 'RedBlackNode was founded and is led by Aarushi Krishna. Aarushi is the founder and lead developer behind the studio’s freelance web development, software development, ecommerce, and automation work, and is directly involved in every project from discovery to launch.',
  },
  {
    q: 'Who is Aarushi Krishna?',
    a: 'Aarushi Krishna is the founder and lead developer of RedBlackNode — a freelance web development and tech solutions studio. Aarushi specialises in MERN stack development, Shopify and WordPress builds, UI/UX design, custom software, and workflow automation for startups and established businesses worldwide.',
  },
  {
    q: 'What does RedBlackNode do?',
    a: 'RedBlackNode is a freelance web development, software development, and tech solutions studio. We design and build high-performance websites, ecommerce stores, MERN web apps, custom software, and automation systems for businesses that want serious, reliable digital infrastructure.',
  },
  {
    q: 'Do you offer general tech services and website making?',
    a: 'Yes. RedBlackNode covers the full spectrum of tech services — website making, software development, ecommerce, mobile-ready web apps, dashboards, integrations, automation, and ongoing maintenance — so you can hire one team end-to-end instead of stitching freelancers together.',
  },
  {
    q: 'Is RedBlackNode a freelance agency or a full agency?',
    a: 'We operate as a focused freelance development team — closer to a studio model. You work directly with senior freelance developers and designers, without the overhead, hand-offs, or markups of a traditional agency.',
  },
  {
    q: 'Do you use templates or build from scratch?',
    a: 'Every project is custom-built from scratch around your goals and brand. No recycled templates, no cookie-cutter themes, no shortcuts that hurt performance or SEO later.',
  },
  {
    q: 'What technologies and stacks do you work with?',
    a: 'We specialise in MERN stack (MongoDB, Express, React, Node), Shopify, WordPress, WooCommerce, GoHighLevel CRM, and automation platforms like n8n, Zapier, and Make. We also handle hosting, DNS, SSL, and launch on Vercel, Netlify, or any cloud you prefer.',
  },
  {
    q: 'How long does a freelance web development project take?',
    a: 'Most engagements run from 1 to 6 weeks depending on scope. Landing pages can ship in days, while custom MERN platforms and complex ecommerce builds typically take 4–8 weeks with clear milestones.',
  },
  {
    q: 'Do you handle UI/UX design and development together?',
    a: 'Yes. We cover the full stack — UI/UX design in Figma, frontend development, backend APIs, database, deployment, and post-launch optimisation — all in one team.',
  },
  {
    q: 'Will my website be mobile-responsive and fast?',
    a: 'Always. Every RedBlackNode build is mobile-first, accessibility-aware, and tuned for Core Web Vitals so it scores well on Google PageSpeed and feels fast on real devices.',
  },
  {
    q: 'Can you redesign or rebuild my existing website?',
    a: 'Yes. We routinely take over legacy WordPress, Shopify, or custom builds and either refactor, redesign, or rebuild them on a modern stack with better performance and SEO foundations.',
  },
  {
    q: 'Do you offer ongoing support and maintenance?',
    a: 'Yes — monthly care plans cover updates, backups, security patches, performance tuning, content edits, and small feature work so your site keeps improving instead of decaying.',
  },
  {
    q: 'Will my site be SEO-friendly out of the box?',
    a: 'Yes. We ship clean semantic HTML, structured data (schema.org), optimised metadata, XML sitemaps, canonical URLs, image optimisation, and fast Core Web Vitals — the technical SEO foundations Google ranks for.',
  },
  {
    q: 'Do you build ecommerce websites?',
    a: 'Yes. We build conversion-tuned ecommerce stores on Shopify and WooCommerce, plus custom headless commerce experiences with the MERN stack when needed.',
  },
  {
    q: 'Can you build custom web apps and SaaS products?',
    a: 'Yes. We build scalable custom web applications, SaaS dashboards, internal tools, and client portals using React, Node, Express, and MongoDB.',
  },
  {
    q: 'Do you work with startups, agencies, and established businesses?',
    a: 'All three. As long as the project is serious, well-scoped, and you value craft over shortcuts, we are a great fit — from early-stage founders to established brands and white-label agency work.',
  },
  {
    q: 'How do you communicate during a project?',
    a: 'Direct, fast, and structured. You get a single point of contact, async updates on Slack or email, and scheduled reviews. No account-manager relay, no ghosting.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A clear sense of your goals, target audience, must-have features, deadline, and any references or brand assets. If you are not sure, the discovery call helps us shape it together.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. We are happy to sign mutual NDAs before sharing scopes, code, or strategic details.',
  },
  {
    q: 'How are RedBlackNode freelance services different from cheap marketplaces?',
    a: 'We treat freelance like a craft, not a race to the bottom. You get senior engineering, real UX thinking, clean codebases, documentation, and post-launch accountability — not a $50 patch job.',
  },
  {
    q: 'Will I be able to manage my own website after launch?',
    a: 'Yes. We build with usability in mind — Shopify and WordPress admin training, structured CMS for custom builds, and short Loom walkthroughs so editing content, products, or pages stays easy.',
  },
  {
    q: 'Do you integrate third-party tools, payments, and APIs?',
    a: 'Yes. CRMs (HubSpot, GoHighLevel), payment systems (Stripe, Razorpay, Shopify Payments), email (Klaviyo, Mailchimp), analytics (GA4, Meta Pixel), and any REST or GraphQL API.',
  },
  {
    q: 'How do I hire RedBlackNode for a project?',
    a: 'Send a short brief through the contact form or email redblacknode@gmail.com. We reply quickly with next steps, a discovery call, and a clear, honest plan and timeline.',
  },
]

export function FaqPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  useDocumentMeta({ ...SEO_PAGES.faq, jsonLd: faqJsonLd })

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[6rem]">
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-rbn-white sm:text-4xl">
          Frequently asked questions about freelance web development
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-rbn-muted">
          Straight answers about how RedBlackNode works as a freelance web development and tech solutions
          studio — what we build, the stacks we use, timelines, pricing models, SEO, and how to get started.
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
            Have more questions about freelance web development, ecommerce, or automation?{' '}
            <Link to="/contact" className="font-medium text-rbn-accent transition-colors hover:text-rbn-fog">
              Contact RedBlackNode
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
