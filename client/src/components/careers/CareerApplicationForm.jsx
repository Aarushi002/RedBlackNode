import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || ''
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const inputClass =
  'mt-2 w-full rounded-xl border border-rbn-border-strong bg-rbn-surface/80 px-4 py-3 text-sm text-rbn-fog outline-none transition-[border,box-shadow] placeholder:text-rbn-muted/50 focus:border-rbn-accent/50 focus:shadow-[0_0_0_3px_rgba(225,29,72,0.12)] disabled:opacity-60'

const labelClass = 'text-xs font-semibold uppercase tracking-[0.18em] text-rbn-muted'

function buildInitialState(fields) {
  const s = {}
  for (const f of fields) {
    if (f.type === 'section') continue
    if (f.type === 'checkboxes') s[f.name] = []
    else s[f.name] = ''
  }
  return s
}

function isValidUrl(str) {
  if (!str || !str.trim()) return true
  try {
    const u = new URL(str.trim())
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export function CareerApplicationForm({ config }) {
  const initial = useMemo(() => buildInitialState(config.fields), [config])
  const [values, setValues] = useState(initial)
  const [honeypot, setHoneypot] = useState('')
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [globalError, setGlobalError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [emailSent, setEmailSent] = useState(true)

  const disabled = status === 'loading'

  function setVal(name, v) {
    setValues((prev) => ({ ...prev, [name]: v }))
  }

  function toggleCheckbox(name, option) {
    setValues((prev) => {
      const cur = prev[name] || []
      const has = cur.includes(option)
      const next = has ? cur.filter((x) => x !== option) : [...cur, option]
      return { ...prev, [name]: next }
    })
  }

  function validate() {
    const err = {}
    for (const f of config.fields) {
      if (f.type === 'section') continue
      const v = values[f.name]
      if (f.type === 'checkboxes') {
        if (f.required && (!Array.isArray(v) || v.length === 0)) {
          err[f.name] = 'Select at least one option.'
        }
        continue
      }
      const str = typeof v === 'string' ? v.trim() : ''
      if (f.required && !str) {
        err[f.name] = 'This field is required.'
        continue
      }
      if (f.type === 'email' && str && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
        err[f.name] = 'Enter a valid email.'
        continue
      }
      if (f.type === 'url' && str && !isValidUrl(str)) {
        err[f.name] = 'Enter a valid URL (https://…).'
      }
    }
    return err
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setGlobalError('')
    setFieldErrors({})
    const err = validate()
    if (Object.keys(err).length) {
      setFieldErrors(err)
      setGlobalError('Please fix the highlighted fields.')
      return
    }

    if (!WEB3FORMS_KEY) {
      setGlobalError(
        'Application form is not configured yet. Please email redblacknode@gmail.com directly.'
      )
      return
    }

    const applicantName = String(values.fullName || '').trim()
    const applicantEmail = String(values.email || '').trim().toLowerCase()

    const fd = new FormData()
    fd.append('access_key', WEB3FORMS_KEY)
    fd.append('subject', `Career application — ${config.formTitle} — ${applicantName}`)
    fd.append('from_name', 'RedBlackNode Careers')
    fd.append('replyto', applicantEmail)
    fd.append('Role', config.formTitle)
    fd.append('Applicant Name', applicantName)
    fd.append('Applicant Email', applicantEmail)
    fd.append('botcheck', honeypot)

    for (const f of config.fields) {
      if (f.type === 'section') continue
      if (f.name === 'fullName' || f.name === 'email') continue
      const v = values[f.name]
      const out = f.type === 'checkboxes' ? (Array.isArray(v) ? v.join(', ') : '') : String(v ?? '').trim()
      fd.append(f.label, out || '—')
    }

    if (file) {
      fd.append('Resume', file, file.name)
    }

    setStatus('loading')
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: fd,
      })
      const data = await res.json().catch(() => ({}))
      if (data.success === true || data.success === 'true') {
        setEmailSent(true)
        setStatus('success')
        setValues(buildInitialState(config.fields))
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        return
      }
      setGlobalError(data.message || 'Could not send your application. Please try again.')
      setStatus('error')
    } catch {
      setGlobalError('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl border border-rbn-accent/35 bg-rbn-accent-soft/30 px-6 py-10 text-center sm:px-10"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-xl font-semibold text-rbn-white">Application received.</p>
        <p className="mt-3 text-sm leading-relaxed text-rbn-muted">
          Thanks for applying — we’ll review your details and get back to you if there’s a fit.
        </p>
        {!emailSent && (
          <p className="mt-4 text-xs leading-relaxed text-rbn-muted">
            Your application is saved. If inbox delivery is delayed, email{' '}
            <a href="mailto:redblacknode@gmail.com" className="text-rbn-fog underline-offset-2 hover:underline">
              redblacknode@gmail.com
            </a>{' '}
            directly.
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/careers"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-rbn-border-strong px-6 py-3 text-sm font-medium text-rbn-fog transition-colors hover:border-rbn-accent/35"
          >
            Back to careers
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-rbn-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#f43f5e]"
            onClick={() => {
              setStatus('idle')
              setEmailSent(true)
            }}
          >
            Submit another application
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-8" noValidate aria-busy={disabled}>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="career-website">Website</label>
        <input
          id="career-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <p className="text-sm leading-relaxed text-rbn-fog/95">{config.intro}</p>

      <div className="space-y-8">
        {config.fields.map((f, i) => {
          if (f.type === 'section') {
            return (
              <div key={`section-${i}`} className={i === 0 ? '' : 'pt-4'}>
                <h2 className="font-display text-lg font-semibold tracking-tight text-rbn-white sm:text-xl">
                  {f.label}
                </h2>
                {f.description ? (
                  <p className="mt-1.5 text-xs leading-relaxed text-rbn-muted">{f.description}</p>
                ) : null}
                <div className="mt-3 h-px w-full bg-gradient-to-r from-rbn-accent/40 via-rbn-border to-transparent" />
              </div>
            )
          }

          return (
          <div key={f.name}>
            <label className={labelClass} htmlFor={`career-${f.name}`}>
              {f.label}
              {f.required ? <span className="text-rbn-accent"> *</span> : null}
            </label>

            {f.type === 'text' || f.type === 'email' || f.type === 'tel' || f.type === 'url' ? (
              <input
                id={`career-${f.name}`}
                type={f.type === 'text' ? 'text' : f.type}
                required={f.required}
                disabled={disabled}
                value={values[f.name]}
                onChange={(e) => setVal(f.name, e.target.value)}
                className={inputClass}
                autoComplete={
                  f.name === 'fullName' ? 'name' : f.name === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'off'
                }
              />
            ) : null}

            {f.type === 'textarea' ? (
              <textarea
                id={`career-${f.name}`}
                required={f.required}
                disabled={disabled}
                rows={f.rows ?? 4}
                value={values[f.name]}
                onChange={(e) => setVal(f.name, e.target.value)}
                className={`${inputClass} resize-y leading-relaxed`}
              />
            ) : null}

            {f.type === 'select' ? (
              <select
                id={`career-${f.name}`}
                required={f.required}
                disabled={disabled}
                value={values[f.name]}
                onChange={(e) => setVal(f.name, e.target.value)}
                className={`${inputClass} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238b8b96'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                }}
              >
                <option value="">Select…</option>
                {(f.options ?? []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : null}

            {f.type === 'radio' ? (
              <fieldset className="mt-3 space-y-2.5">
                <legend className="sr-only">{f.label}</legend>
                {(f.options ?? []).map((opt) => (
                  <label
                    key={opt}
                    className="flex cursor-pointer items-center gap-3 text-sm text-rbn-subtle"
                  >
                    <input
                      type="radio"
                      name={f.name}
                      value={opt}
                      checked={values[f.name] === opt}
                      disabled={disabled}
                      onChange={() => setVal(f.name, opt)}
                      className="h-4 w-4 border-rbn-border-strong text-rbn-accent focus:ring-rbn-accent/30"
                    />
                    {opt}
                  </label>
                ))}
              </fieldset>
            ) : null}

            {f.type === 'checkboxes' ? (
              <fieldset className="mt-3 space-y-2.5">
                <legend className="sr-only">{f.label}</legend>
                {(f.options ?? []).map((opt) => (
                  <label
                    key={opt}
                    className="flex cursor-pointer items-center gap-3 text-sm text-rbn-subtle"
                  >
                    <input
                      type="checkbox"
                      checked={(values[f.name] || []).includes(opt)}
                      disabled={disabled}
                      onChange={() => toggleCheckbox(f.name, opt)}
                      className="h-4 w-4 rounded border-rbn-border-strong text-rbn-accent focus:ring-rbn-accent/30"
                    />
                    {opt}
                  </label>
                ))}
              </fieldset>
            ) : null}

            {fieldErrors[f.name] ? (
              <p className="mt-1.5 text-xs text-rbn-accent">{fieldErrors[f.name]}</p>
            ) : null}
          </div>
        )
        })}
      </div>

      <div>
        <label htmlFor="career-resume" className={labelClass}>
          {config.resumeLabel}
        </label>
        <p className="mt-1 text-xs text-rbn-muted">PDF, DOC, or DOCX — max 6 MB.</p>
        <input
          ref={fileInputRef}
          id="career-resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          disabled={disabled}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-rbn-muted file:mr-4 file:rounded-lg file:border-0 file:bg-rbn-surface file:px-4 file:py-2 file:text-sm file:font-medium file:text-rbn-fog hover:file:bg-rbn-elevated"
        />
        {file ? <p className="mt-1 text-xs text-rbn-subtle">{file.name}</p> : null}
      </div>

      {globalError ? (
        <div className="text-sm text-rbn-accent" role="alert">
          {globalError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={disabled}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-rbn-accent py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(225,29,72,0.25)] transition-[transform,opacity] hover:bg-[#f43f5e] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[220px]"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
            Sending…
          </span>
        ) : (
          'Submit application'
        )}
      </button>
    </form>
  )
}
