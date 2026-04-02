import { useState } from 'react'
import { apiUrl } from '../../utils/api'

const initial = {
  name: '',
  phone: '',
  email: '',
  message: '',
  website: '',
}

export function ContactForm() {
  const [form, setForm] = useState(initial)
  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [globalError, setGlobalError] = useState('')
  const [emailSent, setEmailSent] = useState(true)

  const disabled = status === 'loading'

  async function handleSubmit(e) {
    e.preventDefault()
    setFieldErrors({})
    setGlobalError('')
    setStatus('loading')

    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          website: form.website,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (res.status === 429) {
        setGlobalError(data.message || 'Too many attempts. Please try again in a few minutes.')
        setStatus('error')
        return
      }

      if (!res.ok) {
        if (data.errors && typeof data.errors === 'object') {
          setFieldErrors(data.errors)
        }
        setGlobalError(data.message || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      if (data.ok) {
        setEmailSent(data.emailSent !== false)
        setStatus('success')
        setForm(initial)
        return
      }

      setGlobalError('Unexpected response. Please try again.')
      setStatus('error')
    } catch {
      setGlobalError('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  function onChange(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl border border-rbn-accent/35 bg-rbn-accent-soft/30 px-6 py-10 text-center sm:px-10"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-xl font-semibold text-rbn-white">Message received.</p>
        <p className="mt-3 text-sm leading-relaxed text-rbn-muted">
          Thanks for reaching out — we’ll review your note and reply shortly.
        </p>
        {!emailSent && (
          <p className="mt-4 text-xs leading-relaxed text-rbn-muted">
            Your message is saved. If inbox delivery is delayed, email{' '}
            <a href="mailto:redblacknode@gmail.com" className="text-rbn-fog underline-offset-2 hover:underline">
              redblacknode@gmail.com
            </a>{' '}
            directly.
          </p>
        )}
        <button
          type="button"
          className="mt-8 text-sm font-medium text-rbn-accent underline-offset-4 hover:underline"
          onClick={() => {
            setStatus('idle')
            setEmailSent(true)
          }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-busy={disabled}>
      {/* Honeypot — leave hidden; bots often fill “website” */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={onChange('website')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-[0.18em] text-rbn-muted">
            Name <span className="text-rbn-accent">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            disabled={disabled}
            value={form.name}
            onChange={onChange('name')}
            className="mt-2 w-full rounded-xl border border-rbn-border-strong bg-rbn-surface/80 px-4 py-3 text-sm text-rbn-fog outline-none ring-0 transition-[border,box-shadow] placeholder:text-rbn-muted/50 focus:border-rbn-accent/50 focus:shadow-[0_0_0_3px_rgba(225,29,72,0.12)] disabled:opacity-60"
            placeholder="Your name"
          />
          {fieldErrors.name && <p className="mt-1.5 text-xs text-rbn-accent">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-[0.18em] text-rbn-muted">
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            disabled={disabled}
            value={form.phone}
            onChange={onChange('phone')}
            className="mt-2 w-full rounded-xl border border-rbn-border-strong bg-rbn-surface/80 px-4 py-3 text-sm text-rbn-fog outline-none transition-[border,box-shadow] placeholder:text-rbn-muted/50 focus:border-rbn-accent/50 focus:shadow-[0_0_0_3px_rgba(225,29,72,0.12)] disabled:opacity-60"
            placeholder="Optional"
          />
          {fieldErrors.phone && <p className="mt-1.5 text-xs text-rbn-accent">{fieldErrors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-rbn-muted">
          Email <span className="text-rbn-accent">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          disabled={disabled}
          value={form.email}
          onChange={onChange('email')}
          className="mt-2 w-full rounded-xl border border-rbn-border-strong bg-rbn-surface/80 px-4 py-3 text-sm text-rbn-fog outline-none transition-[border,box-shadow] placeholder:text-rbn-muted/50 focus:border-rbn-accent/50 focus:shadow-[0_0_0_3px_rgba(225,29,72,0.12)] disabled:opacity-60"
          placeholder="you@company.com"
        />
        {fieldErrors.email && <p className="mt-1.5 text-xs text-rbn-accent">{fieldErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-[0.18em] text-rbn-muted">
          Message <span className="text-rbn-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          disabled={disabled}
          value={form.message}
          onChange={onChange('message')}
          className="mt-2 w-full resize-y rounded-xl border border-rbn-border-strong bg-rbn-surface/80 px-4 py-3 text-sm leading-relaxed text-rbn-fog outline-none transition-[border,box-shadow] placeholder:text-rbn-muted/50 focus:border-rbn-accent/50 focus:shadow-[0_0_0_3px_rgba(225,29,72,0.12)] disabled:opacity-60"
          placeholder="Tell us what you’re building, your timeline, and any links we should see."
        />
        {fieldErrors.message && <p className="mt-1.5 text-xs text-rbn-accent">{fieldErrors.message}</p>}
      </div>

      {globalError && (
        <div className="text-sm text-rbn-accent" role="alert" aria-live="assertive">
          {globalError}
        </div>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-rbn-accent py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(225,29,72,0.25)] transition-[transform,opacity] hover:bg-[#f43f5e] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
            Sending…
          </span>
        ) : (
          'Send message'
        )}
      </button>
    </form>
  )
}
