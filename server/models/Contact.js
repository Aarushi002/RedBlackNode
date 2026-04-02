import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 40, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    message: { type: String, required: true, maxlength: 10000 },
  },
  { timestamps: true }
)

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)
