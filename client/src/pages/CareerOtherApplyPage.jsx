import { Link } from 'react-router-dom'
import { CareerApplicationForm } from '../components/careers/CareerApplicationForm'
import { getCareerApplicationForm } from '../data/careerApplicationForms'

export function CareerOtherApplyPage() {
  const config = getCareerApplicationForm('other')

  if (!config) {
    return (
      <div className="pt-14 sm:pt-16 lg:pt-[6rem]">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <p className="text-sm text-rbn-muted">Form configuration is missing.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[6rem]">
      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <Link
          to="/careers"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-rbn-accent transition-colors hover:text-rbn-fog"
        >
          ← Back to careers
        </Link>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-rbn-white sm:text-4xl">
          {config.formTitle}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-rbn-muted">
          Working in a stack we haven’t listed? Fill this short application and we’ll review it — if there’s a fit,
          we’ll reach out.
        </p>
        <div className="mt-10">
          <CareerApplicationForm config={config} />
        </div>
        <p className="mt-10 text-xs leading-relaxed text-rbn-muted">
          Prefer email? Send your resume to{' '}
          <a
            href="mailto:redblacknode@gmail.com?subject=Career%20application%20%E2%80%94%20other%20stack"
            className="font-medium text-rbn-fog underline-offset-2 hover:underline"
          >
            redblacknode@gmail.com
          </a>
          .
        </p>
      </article>
    </div>
  )
}
