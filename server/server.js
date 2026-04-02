import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import contactRoutes from './routes/contactRoutes.js'
import careerRoutes from './routes/careerRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

const mongoUri = process.env.MONGODB_URI
if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err.message))
} else {
  console.warn('MONGODB_URI not set — contact submissions will fail until configured.')
}

app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }))
app.use(express.json({ limit: '128kb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'redblacknode-api',
    mongo: mongoose.connection.readyState === 1,
  })
})

app.use('/api', contactRoutes)
app.use('/api', careerRoutes)

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
