export const FOUNDER = {
  name: 'Aarushi Krishna',
  givenName: 'Aarushi',
  familyName: 'Krishna',
  alternateNames: ['Aarushi', 'Krishna', 'Aarushi Krishna'],
  jobTitle: 'Founder & Lead Developer',
  email: 'aarushikrishna5@gmail.com',
  sameAs: [],
}

export const SITE = {
  name: 'RedBlackNode',
  brand: 'RedBlackNode',
  url: 'https://redblacknode.com',
  logo: 'https://redblacknode.com/logo.png',
  email: 'redblacknode@gmail.com',
  twitter: '@redblacknode',
  founder: FOUNDER,
  defaultTitle:
    'RedBlackNode by Aarushi Krishna — Freelance Web Development & Tech Solutions',
  defaultDescription:
    'RedBlackNode, founded by Aarushi Krishna, is a freelance web development, software development, and tech solutions studio. Hire us for website making, MERN stack apps, Shopify, WordPress, UI/UX design, ecommerce, automation, and custom software — built to scale.',
  keywords: [
    'RedBlackNode',
    'Red Black Node',
    'Aarushi',
    'Krishna',
    'Aarushi Krishna',
    'Aarushi Krishna developer',
    'Aarushi Krishna RedBlackNode',
    'freelance web development',
    'freelance developers',
    'hire freelance developers',
    'freelance tech services',
    'tech services',
    'tech solutions',
    'website making',
    'website making service',
    'website builder agency',
    'software making',
    'software development services',
    'custom software development',
    'web development services',
    'web development agency',
    'MERN stack development',
    'MERN developer freelance',
    'Shopify developer',
    'Shopify development services',
    'WordPress developer',
    'WooCommerce development',
    'UI UX design services',
    'UI/UX freelance designer',
    'ecommerce development',
    'ecommerce website development',
    'custom web applications',
    'custom website development',
    'SaaS development',
    'workflow automation services',
    'n8n automation',
    'Zapier automation',
    'GoHighLevel agency',
    'CRM setup',
    'API integration services',
    'landing page design',
    'business website development',
    'digital product studio',
    'remote freelance team',
    'build a website',
    'hire a developer',
    'startup web development',
  ].join(', '),
}

const path = (p) => `${SITE.url}${p}`

/**
 * Per-page metadata. Each entry can override title, description, canonical, image, type, noindex.
 * Titles are kept under ~60 chars where possible and descriptions under ~155 chars.
 */
export const SEO_PAGES = {
  home: {
    title:
      'RedBlackNode by Aarushi Krishna — Freelance Web Development & Tech Solutions',
    description:
      'RedBlackNode, founded by Aarushi Krishna, builds freelance web development, software, ecommerce, and automation solutions. MERN, Shopify, WordPress, UI/UX, custom software — website making and tech services for serious businesses.',
    canonical: path('/'),
  },
  projects: {
    title: 'Projects — Freelance Web, Shopify & MERN Builds | RedBlackNode',
    description:
      'Selected freelance projects by RedBlackNode — MERN web apps, Shopify storefronts, WordPress and WooCommerce sites, custom dashboards, and automation systems.',
    canonical: path('/projects'),
  },
  careers: {
    title: 'Careers — Join RedBlackNode | Freelance Tech Roles',
    description:
      'Open commission-based freelance roles at RedBlackNode for UI/UX, MERN, Shopify, and WordPress developers. Remote-first, project-driven, performance-rewarded.',
    canonical: path('/careers'),
  },
  contact: {
    title: 'Contact RedBlackNode — Start a Freelance Web Project',
    description:
      'Start a freelance web development project with RedBlackNode. Share goals, timeline, and stack — we reply quickly with a clear, honest plan.',
    canonical: path('/contact'),
  },
  faq: {
    title: 'FAQ — Freelance Web Development Questions | RedBlackNode',
    description:
      'Answers to common questions about RedBlackNode’s freelance web development, ecommerce, automation, timelines, support, SEO, and ongoing maintenance.',
    canonical: path('/faq'),
  },
  terms: {
    title: 'Terms & Conditions — RedBlackNode',
    description:
      'Terms and conditions for using RedBlackNode’s freelance web development, ecommerce, and automation services.',
    canonical: path('/terms'),
  },
  privacy: {
    title: 'Privacy Policy — RedBlackNode',
    description:
      'How RedBlackNode collects, uses, and protects your data when you use our freelance web development and tech solution services.',
    canonical: path('/privacy'),
  },
  careerOther: {
    title: 'Apply — Other Tech Stack | RedBlackNode Careers',
    description:
      'Apply to RedBlackNode for freelance tech work in a stack we haven’t listed — share your background, tools, and projects.',
    canonical: path('/careers/apply/other'),
  },
  careerApply: (roleId, roleTitle) => ({
    title: `Apply — ${roleTitle || 'Freelance Role'} | RedBlackNode Careers`,
    description: `Apply for the ${roleTitle || 'freelance'} role at RedBlackNode. Commission-based, remote, and project-driven freelance work.`,
    canonical: path(`/careers/apply/${roleId}`),
  }),
}

export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE.url}/#founder`,
  name: FOUNDER.name,
  givenName: FOUNDER.givenName,
  familyName: FOUNDER.familyName,
  alternateName: FOUNDER.alternateNames,
  jobTitle: FOUNDER.jobTitle,
  email: `mailto:${FOUNDER.email}`,
  image: SITE.logo,
  url: SITE.url,
  worksFor: {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.brand,
    url: SITE.url,
    logo: SITE.logo,
  },
  knowsAbout: [
    'Web Development',
    'Software Development',
    'MERN Stack',
    'Shopify Development',
    'WordPress Development',
    'UI/UX Design',
    'Ecommerce',
    'Workflow Automation',
    'Technical SEO',
    'Custom Web Applications',
  ],
  sameAs: FOUNDER.sameAs,
}

export const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#organization`,
  name: SITE.brand,
  alternateName: ['Red Black Node', 'RBN'],
  url: SITE.url,
  logo: SITE.logo,
  image: SITE.logo,
  email: `mailto:${SITE.email}`,
  description: SITE.defaultDescription,
  priceRange: '$$',
  areaServed: 'Worldwide',
  founder: {
    '@type': 'Person',
    '@id': `${SITE.url}/#founder`,
    name: FOUNDER.name,
    alternateName: FOUNDER.alternateNames,
    jobTitle: FOUNDER.jobTitle,
    url: SITE.url,
  },
  foundedBy: {
    '@type': 'Person',
    name: FOUNDER.name,
  },
  employee: [
    {
      '@type': 'Person',
      name: FOUNDER.name,
      jobTitle: FOUNDER.jobTitle,
    },
  ],
  serviceType: [
    'Freelance Web Development',
    'Website Making',
    'Software Development',
    'Custom Software Development',
    'MERN Stack Development',
    'Shopify Development',
    'WordPress Development',
    'WooCommerce Development',
    'UI/UX Design',
    'Ecommerce Development',
    'Workflow Automation',
    'CRM & GoHighLevel Setup',
    'API Integration',
    'Custom Web Applications',
    'Technical SEO & Analytics',
    'Hosting, DNS & Launch',
  ],
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: SITE.email,
    availableLanguage: ['English'],
  },
}
