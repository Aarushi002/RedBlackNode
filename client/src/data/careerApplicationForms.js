/** @typedef {{ name?: string, label: string, type: 'text'|'email'|'tel'|'url'|'textarea'|'select'|'radio'|'checkboxes'|'section', required?: boolean, options?: string[], rows?: number, description?: string }} CareerField */

const YEARS_EXP_OPTIONS = ['Less than 1 Year', '1–2 Years', '2–4 Years', '4+ Years']
const COMMISSION_COMFORT_OPTIONS = [
  'Yes',
  'Only if projects are consistent',
  'Prefer fixed salary',
  'Need more clarity',
]

/** @type {Record<string, { roleId: string, formTitle: string, intro: string, resumeLabel: string, fields: CareerField[] }>} */
export const CAREER_APPLICATION_FORMS = {
  'ui-ux': {
    roleId: 'ui-ux',
    formTitle: 'UI/UX Developer — Freelancer Application',
    resumeLabel: 'Resume / CV Upload (Optional)',
    intro:
      'Help us craft beautiful, intuitive digital experiences. This is a commission-based remote freelance role — share a bit about your work, process, and freelance readiness.',
    fields: [
      { type: 'section', label: 'Personal Information' },
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'countryTimezone', label: 'Current Country & Timezone', type: 'text', required: true },
      { name: 'portfolioWebsite', label: 'Portfolio Website', type: 'url', required: true },
      { name: 'behanceDribbble', label: 'Behance / Dribbble Profile', type: 'url', required: false },
      { name: 'linkedIn', label: 'LinkedIn Profile', type: 'url', required: false },

      { type: 'section', label: 'Experience & Background' },
      {
        name: 'yearsExperience',
        label: 'How many years of UI/UX experience do you have?',
        type: 'radio',
        required: true,
        options: YEARS_EXP_OPTIONS,
      },
      {
        name: 'specialization',
        label: 'What type of UI/UX work do you specialize in?',
        type: 'checkboxes',
        required: true,
        options: [
          'SaaS Dashboards',
          'Mobile Apps',
          'Ecommerce Design',
          'Landing Pages',
          'Design Systems',
          'Web Applications',
          'AI Products',
        ],
      },
      {
        name: 'tools',
        label: 'Which tools do you actively use?',
        type: 'checkboxes',
        required: true,
        options: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Framer', 'Webflow'],
      },

      { type: 'section', label: 'Work Style & Freelance Readiness' },
      {
        name: 'commissionComfort',
        label:
          'Since this role is commission-based freelance, how comfortable are you with performance-based earnings?',
        type: 'radio',
        required: true,
        options: [
          'Very Comfortable',
          'Comfortable if projects are consistent',
          'Prefer fixed salary',
          'Not Comfortable',
        ],
      },
      {
        name: 'revisionsHandling',
        label: 'How do you usually handle revisions from clients?',
        type: 'radio',
        required: true,
        options: [
          'Unlimited revisions until satisfaction',
          'Structured revision rounds',
          'Limited revisions only',
          'Depends on project scope',
        ],
      },
      {
        name: 'communication',
        label: 'How do you communicate during projects?',
        type: 'radio',
        required: true,
        options: ['Daily updates', 'Weekly updates', 'Only when required', 'Flexible depending on client'],
      },

      { type: 'section', label: 'Design Thinking' },
      {
        name: 'firstStep',
        label: 'When starting a new project, what is your first step?',
        type: 'radio',
        required: true,
        options: [
          'Jump directly into UI design',
          'Research user pain points',
          'Copy competitor inspiration',
          'Wait for complete instructions',
        ],
      },
      {
        name: 'designApproach',
        label: 'Which best describes your design approach?',
        type: 'radio',
        required: true,
        options: ['Visual-first', 'User-first', 'Conversion-focused', 'Trend-focused'],
      },
      {
        name: 'whatMatters',
        label: 'What matters most in a good UI/UX project?',
        type: 'radio',
        required: true,
        options: [
          'Beautiful visuals only',
          'Smooth user experience',
          'Fast delivery',
          'Client satisfaction & usability balance',
        ],
      },

      { type: 'section', label: 'Client Handling' },
      {
        name: 'changingRequirements',
        label: 'If a client keeps changing requirements midway:',
        type: 'radio',
        required: true,
        options: [
          'Get frustrated quickly',
          'Discuss timelines & scope professionally',
          'Continue without clarification',
          'Refuse additional work',
        ],
      },
      {
        name: 'presentationConfidence',
        label: 'How confident are you presenting your design decisions to clients?',
        type: 'radio',
        required: true,
        options: ['Beginner', 'Moderate', 'Confident', 'Very Experienced'],
      },

      { type: 'section', label: 'Portfolio & Projects' },
      {
        name: 'bestProjects',
        label: 'Share 3 of your best UI/UX projects',
        type: 'textarea',
        required: true,
        rows: 5,
      },
      {
        name: 'startupsInternational',
        label: 'Have you worked with startups or international clients before?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No'],
      },
      {
        name: 'excitingProjects',
        label: 'What type of projects excite you most?',
        type: 'checkboxes',
        required: true,
        options: ['SaaS', 'AI Products', 'Ecommerce', 'Mobile Apps', 'Startup MVPs'],
      },

      { type: 'section', label: 'Confirmation' },
      {
        name: 'confirmAccurate',
        label: 'Confirmation',
        type: 'checkboxes',
        required: true,
        options: ['I confirm that the information provided is accurate.'],
      },
    ],
  },

  mern: {
    roleId: 'mern',
    formTitle: 'MERN Stack Developer — Freelancer Application',
    resumeLabel: 'Resume / CV Upload (Optional)',
    intro:
      'This is a commission-based remote freelance role. Share your technical experience, freelance work style, and the projects that excite you.',
    fields: [
      { type: 'section', label: 'Personal Information' },
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'countryTimezone', label: 'Country & Timezone', type: 'text', required: true },
      { name: 'github', label: 'GitHub Profile', type: 'url', required: false },
      { name: 'portfolioWebsite', label: 'Portfolio Website', type: 'url', required: false },
      { name: 'linkedIn', label: 'LinkedIn', type: 'url', required: false },

      { type: 'section', label: 'Technical Experience' },
      {
        name: 'yearsExperience',
        label: 'How many years of MERN stack experience do you have?',
        type: 'radio',
        required: true,
        options: YEARS_EXP_OPTIONS,
      },
      {
        name: 'strengths',
        label: 'Which areas are you strongest in?',
        type: 'checkboxes',
        required: true,
        options: [
          'React Frontend',
          'Node.js Backend',
          'MongoDB Architecture',
          'API Development',
          'Full Stack Development',
          'DevOps & Deployment',
        ],
      },
      {
        name: 'technologies',
        label: 'Which technologies do you regularly work with?',
        type: 'checkboxes',
        required: true,
        options: [
          'React',
          'Next.js',
          'Express.js',
          'MongoDB',
          'TypeScript',
          'Tailwind CSS',
          'Socket.io',
          'AWS/Vercel/Render',
        ],
      },

      { type: 'section', label: 'Freelance Work Style' },
      {
        name: 'commissionComfort',
        label:
          'This is a commission-based remote freelance role. Are you comfortable with performance-based earnings?',
        type: 'radio',
        required: true,
        options: COMMISSION_COMFORT_OPTIONS,
      },
      {
        name: 'multipleProjects',
        label: 'How do you manage multiple freelance projects?',
        type: 'radio',
        required: true,
        options: [
          'Structured task management',
          'Work on whichever is urgent',
          'One project at a time',
          'Depends on deadlines',
        ],
      },
      {
        name: 'productionBugs',
        label: 'How do you handle production bugs after deployment?',
        type: 'radio',
        required: true,
        options: [
          'Immediate investigation & fixes',
          'Fix only during working hours',
          'Charge separately always',
          'Depends on contract',
        ],
      },

      { type: 'section', label: 'Development Process' },
      {
        name: 'codingStyle',
        label: 'Which best describes your coding style?',
        type: 'radio',
        required: true,
        options: ['Fast but messy', 'Clean & scalable', 'Startup MVP focused', 'Mostly rapid prototyping'],
      },
      {
        name: 'projectStart',
        label: 'How do you usually start a new project?',
        type: 'radio',
        required: true,
        options: ['Build immediately', 'Plan architecture first', 'Use templates', 'Wait for full requirements'],
      },
      {
        name: 'deployments',
        label: 'How comfortable are you with deployments?',
        type: 'radio',
        required: true,
        options: ['Frontend only', 'Full-stack independently', 'Need support', 'Advanced deployment workflows'],
      },

      { type: 'section', label: 'Client Communication' },
      {
        name: 'majorChanges',
        label: 'If a client requests major changes midway:',
        type: 'radio',
        required: true,
        options: [
          'Refuse immediately',
          'Discuss revised timeline & scope',
          'Continue without discussion',
          'Depends on payment',
        ],
      },
      {
        name: 'updateFrequency',
        label: 'How often do you provide project updates?',
        type: 'radio',
        required: true,
        options: ['Daily', 'Weekly', 'Milestone based', 'Only if asked'],
      },

      { type: 'section', label: 'Project Preferences' },
      {
        name: 'projectInterests',
        label: 'Which projects interest you most?',
        type: 'checkboxes',
        required: true,
        options: [
          'SaaS Platforms',
          'AI Applications',
          'Startup MVPs',
          'Ecommerce Systems',
          'Dashboards / CRM',
          'Automation Platforms',
        ],
      },
      { name: 'bestProjects', label: 'Share your best MERN projects', type: 'textarea', required: true, rows: 5 },

      { type: 'section', label: 'Confirmation' },
      {
        name: 'confirmAccurate',
        label: 'Confirmation',
        type: 'checkboxes',
        required: true,
        options: ['I confirm that the information provided is accurate.'],
      },
    ],
  },

  shopify: {
    roleId: 'shopify',
    formTitle: 'Shopify Developer — Freelancer Application',
    resumeLabel: 'Resume / CV Upload (Optional)',
    intro:
      'Looking for Shopify developers who can build, optimize, and scale stores. This is a commission-based remote freelance role.',
    fields: [
      { type: 'section', label: 'Basic Information' },
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'countryTimezone', label: 'Country & Timezone', type: 'text', required: true },
      { name: 'portfolioShopify', label: 'Shopify Portfolio Links', type: 'url', required: true },
      { name: 'linkedIn', label: 'LinkedIn', type: 'url', required: false },

      { type: 'section', label: 'Shopify Experience' },
      {
        name: 'yearsExperience',
        label: 'How many years of Shopify experience do you have?',
        type: 'radio',
        required: true,
        options: YEARS_EXP_OPTIONS,
      },
      {
        name: 'services',
        label: 'Which Shopify services do you offer?',
        type: 'checkboxes',
        required: true,
        options: [
          'Theme Development',
          'Store Setup',
          'Shopify Plus',
          'App Integration',
          'CRO Optimization',
          'Speed Optimization',
          'Headless Shopify',
        ],
      },
      {
        name: 'toolsPlatforms',
        label: 'Which tools/platforms do you work with?',
        type: 'checkboxes',
        required: true,
        options: ['Liquid', 'Shopify APIs', 'Replo', 'PageFly', 'Klaviyo', 'Gorgias', 'Recharge', 'Hydrogen'],
      },

      { type: 'section', label: 'Freelance & Client Handling' },
      {
        name: 'commissionComfort',
        label: 'This role is commission-based freelance. Are you comfortable with that?',
        type: 'radio',
        required: true,
        options: ['Yes', 'Depends on project volume', 'Prefer fixed projects only', 'Need more details'],
      },
      {
        name: 'revisionsHandling',
        label: 'How do you usually deal with client revisions?',
        type: 'radio',
        required: true,
        options: [
          'Flexible & collaborative',
          'Structured revisions only',
          'Limited support after delivery',
          'Depends on agreement',
        ],
      },
      {
        name: 'urgentIssues',
        label: 'How do you handle urgent ecommerce issues?',
        type: 'radio',
        required: true,
        options: ['Immediate fixes', 'Prioritized support', 'Business-hours only', 'Depends on payment plan'],
      },

      { type: 'section', label: 'Shopify Workflow' },
      {
        name: 'storePriority',
        label: 'What matters most in a Shopify store?',
        type: 'radio',
        required: true,
        options: [
          'Visual Design',
          'Conversion Rate',
          'Speed Optimization',
          'Customer Experience',
          'Revenue Performance',
        ],
      },
      {
        name: 'conversionApproach',
        label: 'How do you improve store conversions?',
        type: 'radio',
        required: true,
        options: ['Better UX/UI', 'Upsells & CRO', 'Speed optimization', 'Better checkout flow'],
      },
      {
        name: 'highRevenueBrands',
        label: 'Have you worked with high-revenue ecommerce brands?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No', 'Currently working with some'],
      },

      { type: 'section', label: 'Portfolio & Experience' },
      { name: 'bestStores', label: 'Share your top Shopify stores', type: 'textarea', required: true, rows: 5 },
      {
        name: 'industries',
        label: 'Which industries have you worked with?',
        type: 'checkboxes',
        required: true,
        options: ['Fashion', 'Beauty', 'Electronics', 'Supplements', 'Digital Products', 'Luxury Brands'],
      },

      { type: 'section', label: 'Confirmation' },
      {
        name: 'confirmAccurate',
        label: 'Confirmation',
        type: 'checkboxes',
        required: true,
        options: ['I confirm that the information provided is accurate.'],
      },
    ],
  },

  wordpress: {
    roleId: 'wordpress',
    formTitle: 'WordPress Developer — Freelancer Application',
    resumeLabel: 'Resume / CV Upload (Optional)',
    intro:
      'Looking for WordPress developers who go beyond themes and build fast, reliable websites. This is a commission-based remote freelance role.',
    fields: [
      { type: 'section', label: 'Personal Information' },
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'countryTimezone', label: 'Country & Timezone', type: 'text', required: true },
      { name: 'portfolioWebsite', label: 'Portfolio Website', type: 'url', required: true },
      { name: 'linkedIn', label: 'LinkedIn', type: 'url', required: false },

      { type: 'section', label: 'WordPress Experience' },
      {
        name: 'yearsExperience',
        label: 'How many years of WordPress experience do you have?',
        type: 'radio',
        required: true,
        options: YEARS_EXP_OPTIONS,
      },
      {
        name: 'services',
        label: 'Which services do you provide?',
        type: 'checkboxes',
        required: true,
        options: [
          'Elementor Development',
          'Custom Theme Development',
          'WooCommerce',
          'Speed Optimization',
          'SEO Optimization',
          'Plugin Customization',
          'Website Maintenance',
        ],
      },
      {
        name: 'buildersTools',
        label: 'Which builders/tools do you use?',
        type: 'checkboxes',
        required: true,
        options: ['Elementor', 'Divi', 'WPBakery', 'Oxygen', 'ACF', 'WooCommerce', 'RankMath/Yoast'],
      },

      { type: 'section', label: 'Freelance Work Style' },
      {
        name: 'commissionComfort',
        label: 'Are you comfortable with commission-based freelance work?',
        type: 'radio',
        required: true,
        options: ['Yes', 'Only with consistent leads', 'Prefer fixed retainers', 'Need clarification'],
      },
      {
        name: 'clientFeedback',
        label: 'How do you handle client feedback?',
        type: 'radio',
        required: true,
        options: [
          'Professional & flexible',
          'Limited revisions',
          'Charge for all revisions',
          'Depends on project',
        ],
      },
      {
        name: 'projectDelivery',
        label: 'How do you usually deliver projects?',
        type: 'radio',
        required: true,
        options: [
          'Fast delivery focus',
          'Quality & optimization focus',
          'SEO-first approach',
          'Design-focused approach',
        ],
      },

      { type: 'section', label: 'Technical Workflow' },
      {
        name: 'projectPriority',
        label: 'What do you prioritize most in WordPress projects?',
        type: 'radio',
        required: true,
        options: ['Speed', 'SEO', 'Design', 'Security', 'Conversion Optimization'],
      },
      {
        name: 'slowSiteFix',
        label: 'How do you optimize slow WordPress websites?',
        type: 'radio',
        required: true,
        options: ['Caching & optimization', 'Better hosting setup', 'Image optimization', 'Plugin cleanup'],
      },
      {
        name: 'hackedSites',
        label: 'Have you handled hacked or broken websites before?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No', 'A few times'],
      },

      { type: 'section', label: 'Portfolio' },
      {
        name: 'bestProjects',
        label: 'Share your best WordPress / WooCommerce projects',
        type: 'textarea',
        required: true,
        rows: 5,
      },

      { type: 'section', label: 'Confirmation' },
      {
        name: 'confirmAccurate',
        label: 'Confirmation',
        type: 'checkboxes',
        required: true,
        options: ['I confirm that the information provided is accurate.'],
      },
    ],
  },

  other: {
    roleId: 'other',
    formTitle: 'General Tech Freelancer Application',
    resumeLabel: 'Upload Resume / CV',
    intro:
      'Working in a stack we haven’t listed? Fill in this short application. This is a commission-based remote freelance opportunity.',
    fields: [
      { type: 'section', label: 'Personal Information' },
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'countryTimezone', label: 'Country & Timezone', type: 'text', required: true },
      { name: 'portfolioGithub', label: 'Portfolio / GitHub', type: 'url', required: false },
      { name: 'linkedIn', label: 'LinkedIn', type: 'url', required: false },

      { type: 'section', label: 'Technical Background' },
      { name: 'primaryStack', label: 'What is your primary tech stack?', type: 'text', required: true },
      {
        name: 'yearsExperience',
        label: 'How many years of experience do you have?',
        type: 'radio',
        required: true,
        options: YEARS_EXP_OPTIONS,
      },
      {
        name: 'specialization',
        label: 'Which services do you specialize in?',
        type: 'checkboxes',
        required: true,
        options: [
          'Frontend Development',
          'Backend Development',
          'Full Stack Development',
          'Mobile Development',
          'AI/Automation',
          'DevOps',
          'Blockchain',
          'Cloud Infrastructure',
          'Other',
        ],
      },

      { type: 'section', label: 'Freelance Readiness' },
      {
        name: 'commissionComfort',
        label:
          'This is a commission-based remote freelance opportunity. Are you comfortable with that?',
        type: 'radio',
        required: true,
        options: ['Yes', 'Depends on lead quality', 'Prefer fixed income', 'Need more information'],
      },
      {
        name: 'deadlines',
        label: 'How do you handle deadlines?',
        type: 'radio',
        required: true,
        options: [
          'Structured planning',
          'Flexible workflow',
          'Work under pressure well',
          'Depends on project complexity',
        ],
      },
      {
        name: 'communication',
        label: 'How do you communicate with clients?',
        type: 'radio',
        required: true,
        options: ['Daily updates', 'Weekly reports', 'Milestone-based', 'Flexible'],
      },

      { type: 'section', label: 'Work Approach' },
      {
        name: 'workflow',
        label: 'Which best describes your workflow?',
        type: 'radio',
        required: true,
        options: ['Speed-focused', 'Scalability-focused', 'Quality-focused', 'MVP-focused'],
      },
      {
        name: 'problemSolving',
        label: 'How do you usually solve technical challenges?',
        type: 'radio',
        required: true,
        options: ['Research & experimentation', 'Ask senior developers', 'Use existing solutions', 'Trial and error'],
      },
      {
        name: 'excitingProjects',
        label: 'What type of projects excite you most?',
        type: 'checkboxes',
        required: true,
        options: [
          'Startups',
          'SaaS Products',
          'AI Products',
          'Ecommerce',
          'Enterprise Systems',
          'Automation Tools',
        ],
      },

      { type: 'section', label: 'Final Questions' },
      { name: 'whyFreelance', label: 'Why do you freelance?', type: 'textarea', required: true, rows: 4 },
      {
        name: 'differentiator',
        label: 'What makes you different from other freelancers?',
        type: 'textarea',
        required: true,
        rows: 4,
      },
      { name: 'bestProjects', label: 'Share your best projects / work', type: 'textarea', required: true, rows: 4 },

      { type: 'section', label: 'Confirmation' },
      {
        name: 'confirmAccurate',
        label: 'Confirmation',
        type: 'checkboxes',
        required: true,
        options: ['I confirm that all information provided is accurate.'],
      },
    ],
  },
}

export function getCareerApplicationForm(roleId) {
  return CAREER_APPLICATION_FORMS[roleId] ?? null
}
