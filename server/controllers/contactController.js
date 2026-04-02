import { Contact } from '../models/Contact.js'
import { sendContactEmail } from '../utils/mailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s\-+().]{7,24}$/

function validateBody(body) {
  const errors = {}

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  if (name.length < 2 || name.length > 120) errors.name = 'Please enter your name (2–120 characters).'

  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  if (phone && !PHONE_RE.test(phone)) {
    errors.phone = 'Enter a valid phone number, or leave it blank.'
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || !EMAIL_RE.test(email) || email.length > 254) errors.email = 'Enter a valid email address.'

  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (message.length < 10) errors.message = 'Please add a bit more detail (at least 10 characters).'
  if (message.length > 10000) errors.message = 'Message is too long.'

  return { ok: Object.keys(errors).length === 0, errors, data: { name, phone, email, message } }
}

/** Honeypot: bots fill hidden fields */
function isSpam(body) {
  const hp = body.website || body.company || body._gotcha
  if (typeof hp === 'string' && hp.trim() !== '') return true
  return false
}

export async function postContact(req, res) {
  if (isSpam(req.body)) {
    return res.status(200).json({ ok: true, ignored: true })
  }

  const { ok, errors, data } = validateBody(req.body)
  if (!ok) {
    return res.status(400).json({ ok: false, errors })
  }

  try {
    await Contact.create(data)
  } catch (e) {
    console.error('[contact]', e)
    return res.status(500).json({ ok: false, message: 'Could not save your message. Please try again.' })
  }

  const mail = await sendContactEmail(data)

  return res.status(201).json({
    ok: true,
    emailSent: mail.sent,
    ...(mail.sent ? {} : { notice: 'Your message was received. If email delivery is delayed, we still have your record.' }),
  })
}
