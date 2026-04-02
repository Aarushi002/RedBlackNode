import { CareerApplication } from '../models/CareerApplication.js'
import { sendCareerApplicationEmail } from '../utils/mailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ALLOWED_ROLES = new Set(['ui-ux', 'shopify', 'mern', 'wordpress'])

const ROLE_TITLES = {
  'ui-ux': 'UI/UX Designer Application',
  shopify: 'Shopify Developer Application',
  mern: 'MERN Developer Application',
  wordpress: 'WordPress Developer Application',
}

const MAX_ANSWER_LEN = 12000
const MAX_KEYS = 80

function isSpam(body) {
  const hp = body.website || body.company || body._gotcha
  if (typeof hp === 'string' && hp.trim() !== '') return true
  return false
}

function sanitizeAnswers(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const keys = Object.keys(raw)
  if (keys.length > MAX_KEYS) return null
  const out = {}
  for (const k of keys) {
    if (typeof k !== 'string' || k.length > 200) continue
    const v = raw[k]
    if (typeof v !== 'string') continue
    if (v.length > MAX_ANSWER_LEN) return null
    out[k] = v.trim()
  }
  return out
}

export async function postCareerApplication(req, res) {
  if (isSpam(req.body)) {
    return res.status(200).json({ ok: true, ignored: true })
  }

  const role = typeof req.body.role === 'string' ? req.body.role.trim() : ''
  if (!ALLOWED_ROLES.has(role)) {
    return res.status(400).json({ ok: false, message: 'Invalid role.' })
  }

  let parsed
  try {
    parsed = JSON.parse(req.body.data || '{}')
  } catch {
    return res.status(400).json({ ok: false, message: 'Invalid form data.' })
  }

  const applicantName = typeof parsed.applicantName === 'string' ? parsed.applicantName.trim() : ''
  const applicantEmail =
    typeof parsed.applicantEmail === 'string' ? parsed.applicantEmail.trim().toLowerCase() : ''

  if (applicantName.length < 2 || applicantName.length > 120) {
    return res.status(400).json({ ok: false, message: 'Please enter your full name.' })
  }
  if (!applicantEmail || !EMAIL_RE.test(applicantEmail) || applicantEmail.length > 254) {
    return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' })
  }

  const answers = sanitizeAnswers(parsed.answers)
  if (!answers || Object.keys(answers).length < 3) {
    return res.status(400).json({ ok: false, message: 'Form data was incomplete.' })
  }

  const resumeFile = req.file
  const resumeMeta =
    resumeFile && resumeFile.buffer && resumeFile.buffer.length > 0
      ? {
          filename: resumeFile.originalname || 'resume',
          mimeType: resumeFile.mimetype || 'application/octet-stream',
          buffer: resumeFile.buffer,
        }
      : null

  const doc = {
    role,
    applicantName,
    applicantEmail,
    answers,
    resumeFileName: resumeMeta?.filename || '',
  }

  if (process.env.MONGODB_URI) {
    try {
      await CareerApplication.create(doc)
    } catch (e) {
      console.error('[careers mongo]', e)
    }
  }

  const mail = await sendCareerApplicationEmail({
    roleTitle: ROLE_TITLES[role] || role,
    applicantName,
    applicantEmail,
    answers,
    resume: resumeMeta,
  })

  return res.status(201).json({
    ok: true,
    emailSent: mail.sent,
    ...(mail.sent ? {} : { notice: 'Your application was received. If email delivery is delayed, we still have your record.' }),
  })
}
