import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import multer from 'multer'
import { postCareerApplication } from '../controllers/careerApplicationController.js'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file?.originalname) return cb(null, false)
    const name = file.originalname.toLowerCase()
    if (/\.(pdf|doc|docx)$/i.test(name)) return cb(null, true)
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'resume'))
  },
})

const careerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: 'Too many applications. Please try again later.' },
})

router.post('/careers/apply', careerLimiter, (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ ok: false, message: 'Resume file is too large (max 6 MB).' })
      }
      return res.status(400).json({ ok: false, message: 'Invalid resume file. Use PDF, DOC, or DOCX.' })
    }
    if (err) return next(err)
    next()
  })
}, postCareerApplication)

export default router
