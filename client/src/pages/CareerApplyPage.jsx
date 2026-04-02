import { Link, Navigate, useParams } from 'react-router-dom'
import { CareerApplicationForm } from '../components/careers/CareerApplicationForm'
import { getCareerApplicationForm } from '../data/careerApplicationForms'

export function CareerApplyPage() {
  const { roleId } = useParams()
  const config = getCareerApplicationForm(roleId || '')
  if (!config) return <Navigate to="/careers" replace />

  return (
    <div className="pt-[5.25rem] lg:pt-[5.5rem]">
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <Link
          to="/careers"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-rbn-accent transition-colors hover:text-rbn-fog"
        >
          ← Back to careers
        </Link>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-rbn-white sm:text-4xl">
          {config.formTitle}
        </h1>
        <div className="relative mt-10 rounded-2xl border border-rbn-border bg-rbn-base/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8">
          <CareerApplicationForm config={config} />
        </div>
      </div>
    </div>
  )
}
