import nodemailer from 'nodemailer'

/**
 * @returns {import('nodemailer').Transporter | null}
 */
export function createMailer() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || pass === undefined) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  })
}

/**
 * @param {{ name: string, phone: string, email: string, message: string }} payload
 * @returns {Promise<{ sent: boolean, error?: string }>}
 */
export async function sendContactEmail(payload) {
  const transporter = createMailer()
  const to = process.env.MAIL_TO || 'redblacknode@gmail.com'
  const from = process.env.MAIL_FROM || process.env.SMTP_USER || 'noreply@localhost'

  if (!transporter) {
    return { sent: false, error: 'mailer_not_configured' }
  }

  const { name, phone, email, message } = payload
  const subject = `RedBlackNode inquiry — ${name}`

  const text = [
    `Name: ${name}`,
    `Phone: ${phone || '—'}`,
    `Email: ${email}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <hr />
    <pre style="font-family: system-ui, sans-serif; white-space: pre-wrap;">${escapeHtml(message)}</pre>
  `

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    })
    return { sent: true }
  } catch (e) {
    console.error('[mailer]', e.message)
    return { sent: false, error: 'send_failed' }
  }
}

/**
 * @param {{
 *   roleTitle: string
 *   applicantName: string
 *   applicantEmail: string
 *   answers: Record<string, string>
 *   resume?: { filename: string, mimeType: string, buffer: Buffer } | null
 * }} payload
 * @returns {Promise<{ sent: boolean, error?: string }>}
 */
export async function sendCareerApplicationEmail(payload) {
  const transporter = createMailer()
  const primary = process.env.MAIL_TO || 'redblacknode@gmail.com'
  const extra = process.env.CAREERS_MAIL_CC || 'aarushikrishna5@gmail.com'
  const to = Array.from(
    new Set(
      [primary, ...extra.split(',')]
        .map((s) => s.trim())
        .filter(Boolean)
    )
  )
  const from = process.env.MAIL_FROM || process.env.SMTP_USER || 'noreply@localhost'

  if (!transporter) {
    return { sent: false, error: 'mailer_not_configured' }
  }

  const { roleTitle, applicantName, applicantEmail, answers, resume } = payload
  const subject = `Career application — ${roleTitle} — ${applicantName}`

  const lines = Object.entries(answers).map(([k, v]) => `${k}\n${v || '—'}\n`)
  const text = [
    `Role: ${roleTitle}`,
    `Applicant: ${applicantName}`,
    `Email: ${applicantEmail}`,
    '',
    ...lines,
  ].join('\n')

  const htmlRows = Object.entries(answers)
    .map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top;padding:8px 12px 8px 0;border-bottom:1px solid #eee;font-weight:600;width:36%;">${escapeHtml(k)}</td><td style="vertical-align:top;padding:8px 0;border-bottom:1px solid #eee;white-space:pre-wrap;">${escapeHtml(v || '—')}</td></tr>`
    )
    .join('')

  const html = `
    <p><strong>Role:</strong> ${escapeHtml(roleTitle)}</p>
    <p><strong>Applicant:</strong> ${escapeHtml(applicantName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(applicantEmail)}</p>
    <table style="border-collapse:collapse;width:100%;max-width:720px;margin-top:16px;font-size:14px;">${htmlRows}</table>
  `

  /** @type {import('nodemailer').SendMailOptions} */
  const mailOpts = {
    from,
    to,
    replyTo: applicantEmail,
    subject,
    text,
    html,
  }

  if (resume?.buffer?.length) {
    mailOpts.attachments = [
      {
        filename: resume.filename || 'resume',
        content: resume.buffer,
        contentType: resume.mimeType || 'application/octet-stream',
      },
    ]
  }

  try {
    await transporter.sendMail(mailOpts)
    return { sent: true }
  } catch (e) {
    console.error('[mailer careers]', e.message)
    return { sent: false, error: 'send_failed' }
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
