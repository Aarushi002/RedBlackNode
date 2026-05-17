import { useEffect, useRef, useState } from 'react'

const CONTACT_EMAIL = 'aarushikrishna5@gmail.com'
const FORMSUBMIT_URL = `https://formsubmit.co/${CONTACT_EMAIL}`

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
  const formRef = useRef(null)
  const iframeRef = useRef(null)
  const submittedRef = useRef(false)
  const timeoutRef = useRef(null)

  const disabled = status === 'loading'

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function validate() {
    const errs = {}
    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()
    if (name.length < 2) errs.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email.'
    if (message.length < 10) errs.message = 'Please add a bit more detail (10+ characters).'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    setFieldErrors({})
    setGlobalError('')

    const errs = validate()
    if (Object.keys(errs).length) {
      setFieldErrors(errs)
      setGlobalError('Please fix the highlighted fields.')
      return
    }

    if (form.website) {
      setStatus('success')
      setForm(initial)
      return
    }

    setStatus('loading')
    submittedRef.current = true

    timeoutRef.current = window.setTimeout(() => {
      if (status === 'loading') {
        setStatus('success')
        setForm(initial)
      }
    }, 5000)

    formRef.current?.submit()
  }

  function handleIframeLoad() {
    if (!submittedRef.current) return
    submittedRef.current = false
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setStatus('success')
    setForm(initial)
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
        <p className="font-display text-xl font-semibold text-rbn-white">Message sent.</p>
        <p className="mt-3 text-sm leading-relaxed text-rbn-muted">
          Thanks for reaching out — we’ve received your message and will reply shortly.
        </p>
        <button
          type="button"
          className="mt-8 text-sm font-medium text-rbn-accent underline-offset-4 hover:underline"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        name="contact-iframe"
        title="contact submission target"
        onLoad={handleIframeLoad}
        style={{ position: 'absolute', width: 0, height: 0, border: 0, left: '-9999px' }}
        aria-hidden="true"
      />

      <form
        ref={formRef}
        action={FORMSUBMIT_URL}
        method="POST"
        target="contact-iframe"
        encType="application/x-www-form-urlencoded"
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
        aria-busy={disabled}
      >
        <input type="hidden" name="_subject" value={`RedBlackNode inquiry — ${form.name || 'Website contact'}`} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_replyto" value={form.email} />

        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="_honey"
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
              name="Name"
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
              name="Phone"
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
            name="Email"
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
            name="Message"
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
    </>
  )
}
