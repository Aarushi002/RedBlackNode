import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { postContact } from '../controllers/contactController.js'

const router = Router()

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: 'Too many submissions. Please try again later.' },
})

router.post('/contact', contactLimiter, postContact)

export default router
